const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');

// Load .env.local
if (fs.existsSync('.env.local')) {
    const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN;
const LEDGER_PATH = './src/data/ledger.json';

async function syncGumroad() {
    if (!GUMROAD_TOKEN) {
        console.error("❌ GUMROAD_TOKEN not found in .env.local");
        return;
    }

    console.log("🚀 [GUMROAD_SYNC] Starting Real-World Sales Ingestion...");

    try {
        const response = await axios.get('https://api.gumroad.com/v2/sales', {
            params: { access_token: GUMROAD_TOKEN }
        });

        const sales = response.data.sales || [];
        console.log(`✅ Retrieved ${sales.length} sales from Gumroad.`);

        if (sales.length === 0) {
            console.log("ℹ️ No sales found.");
            return;
        }

        // Update Ledger
        const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf-8'));
        
        sales.forEach(s => {
            const txId = `GUMROAD_${s.id}`;
            if (!ledger.entries.some(le => le.memo && le.memo.includes(txId))) {
                ledger.entries.push({
                    timestamp: s.created_at,
                    event: 'GUMROAD_SALE_INGRESS',
                    type: 'REVENUE_PULSE',
                    amountUSD: parseFloat(s.price) / 100, // Gumroad usually cents? Check.
                    status: 'SETTLED',
                    memo: `Real-world sale from Gumroad. ID: ${txId}`,
                    metadata: {
                        product: s.product_name,
                        email: s.email,
                        gumroad_id: s.id
                    }
                });
            }
        });

        fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
        console.log(`✅ Ledger updated with ${sales.length} real entries.`);

    } catch (e) {
        console.error(`❌ Gumroad Sync Error: ${e.message}`);
        if (e.response) console.error(e.response.data);
    }
}

syncGumroad();
