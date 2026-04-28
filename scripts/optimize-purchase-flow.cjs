const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');

if (fs.existsSync('.env.local')) {
    const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN;

async function optimizeFlow() {
    console.log("🛠️ [PURCHASE_FLOW] Optimizing Gumroad Delivery Nodes...");

    if (!GUMROAD_TOKEN) {
        console.error("❌ GUMROAD_TOKEN missing.");
        return;
    }

    try {
        // 1. Fetch all products to get IDs
        const res = await axios.get(`https://api.gumroad.com/v2/products?access_token=${GUMROAD_TOKEN}`);
        const products = res.data.products;

        const targets = [
            'AntiGravity Starter Guide',
            'AntiGravity Pro Implementation Kit',
            'AntiGravity Enterprise License'
        ];

        for (const p of products) {
            if (targets.includes(p.name)) {
                console.log(`📡 Updating [${p.name}] (${p.id})...`);
                
                // 2. Set Redirect URL and Custom Receipt
                // Note: In local dev, we point to localhost:3000, but in prod we'd point to the domain.
                const redirectUrl = `http://localhost:3000/checkout/success?product_id=${p.id}`;
                
                await axios.put(`https://api.gumroad.com/v2/products/${p.id}`, {
                    access_token: GUMROAD_TOKEN,
                    redirect_url: redirectUrl,
                    // post_purchase_text: "ACQUISITION COMPLETE. Redirecting to SOVRA Secure Ingress..."
                });
                
                console.log(`   ✅ Redirect set to: ${redirectUrl}`);
            }
        }
    } catch (error) {
        console.error("❌ Optimization failed:", error.response ? error.response.data : error.message);
    }
}

optimizeFlow();
