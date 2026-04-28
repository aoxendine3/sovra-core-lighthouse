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

const CJ_KEY = process.env.CJ_AFFILIATE_API_KEY;
const LEDGER_PATH = './src/data/ledger.json';

async function syncCJ() {
    if (!CJ_KEY) {
        console.error("❌ CJ_AFFILIATE_API_KEY not found in .env.local");
        return;
    }

    console.log("🚀 [CJ_SYNC] Starting 90-day Real-World History Ingestion...");

    try {
        // Query CJ GraphQL or REST?
        // The FinancialCore.ts used REST: https://api.cj.com/v2/earnings
        const response = await axios.get('https://api.cj.com/v2/earnings', {
            headers: { 'Authorization': `Bearer ${CJ_KEY}` },
            params: { 
                'date-range': 'last-90-days',
                'status': 'approved'
            }
        });

        const earnings = response.data.earnings || [];
        console.log(`✅ Retrieved ${earnings.length} approved commissions from CJ.`);

        if (earnings.length === 0) {
            console.log("ℹ️ No approved commissions found in the last 90 days.");
            return;
        }

        // Update Ledger
        const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf-8'));
        
        earnings.forEach(e => {
            const txId = `CJ_${e.cj_transaction_id}`;
            // Check if already exists
            if (!ledger.entries.some(le => le.memo && le.memo.includes(txId))) {
                ledger.entries.push({
                    timestamp: new Date().toISOString(),
                    event: 'CJ_COMMISSION_INGRESS',
                    type: 'REVENUE_PULSE',
                    amountUSD: parseFloat(e.amount),
                    status: 'SETTLED',
                    memo: `Real-world commission from CJ Affiliate. ID: ${txId}`,
                    metadata: {
                        source: 'CJ_AFFILIATE',
                        cj_id: e.cj_transaction_id,
                        original_date: e.date
                    }
                });
            }
        });

        fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
        console.log(`✅ Ledger updated with ${earnings.length} real entries.`);

    } catch (e) {
        console.error(`❌ CJ Sync Error: ${e.message}`);
        if (e.response) console.error(e.response.data);
    }
}

syncCJ();
