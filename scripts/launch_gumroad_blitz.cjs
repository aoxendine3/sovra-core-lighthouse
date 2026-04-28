const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
if (fs.existsSync('.env.local')) {
    const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const GUMROAD_TOKEN = process.env.GUMROAD_TOKEN;
const FUNNELS_PATH = './src/data/ready_funnels.json';
const LEDGER_PATH = './src/data/ledger.json';

async function launchBlitz() {
    console.log("🚀 [APEX_BLITZ] Initiating Live Fire Deployment to Gumroad...\n");

    if (!GUMROAD_TOKEN) {
        console.error("❌ FATAL: GUMROAD_TOKEN not found in .env.local. Cannot launch.");
        return;
    }

    if (!fs.existsSync(FUNNELS_PATH)) {
        console.error("❌ FATAL: Ready funnels data not found.");
        return;
    }

    const funnelsData = JSON.parse(fs.readFileSync(FUNNELS_PATH, 'utf-8'));
    const products = [funnelsData.freeProduct, funnelsData.proProduct, funnelsData.apexProduct];

    const deployedProducts = [];

    for (const product of products) {
        if (!product) continue;

        console.log(`📡 Pushing [${product.name}] to Gumroad Network...`);

        try {
            // Gumroad API Create Product
            // https://app.gumroad.com/api/v2/products
            const payload = {
                access_token: GUMROAD_TOKEN,
                name: product.name,
                price: product.price * 100, // Gumroad expects cents
                description: `${product.tagline}\n\n${product.description}\n\n${product.bulletPoints.join('\n')}`,
                // We need a dummy file URL or it might require one. 
                // We will just use the description for now.
            };

            const response = await axios.post('https://api.gumroad.com/v2/products', payload);
            
            if (response.data && response.data.product) {
                const liveUrl = response.data.product.short_url;
                console.log(`   ✅ LIVE: ${liveUrl}`);
                deployedProducts.push({ name: product.name, url: liveUrl });
            }
        } catch (error) {
            console.error(`   ❌ Failed to push ${product.name}:`);
            if (error.response) {
                console.error(`      ${JSON.stringify(error.response.data)}`);
            } else {
                console.error(`      ${error.message}`);
            }
        }
        
        // Small delay to prevent rate limits
        await new Promise(r => setTimeout(r, 1000));
    }

    // Update Ledger if successful
    if (deployedProducts.length > 0) {
        try {
            const ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf-8'));
            ledger.entries.push({
                timestamp: new Date().toISOString(),
                event: 'GUMROAD_DEPLOYMENT_BLITZ',
                type: 'MARKET_SATURATION',
                amountUSD: 0,
                status: 'SETTLED',
                memo: `Live Fire deployed ${deployedProducts.length} products to Gumroad.`,
                metadata: {
                    products: deployedProducts
                }
            });
            fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
            console.log("\n🏦 [LEDGER] Grounded Blitz pulse in sovereign ledger.");
        } catch (e) {
            console.error("Failed to update ledger", e.message);
        }
    }

    console.log("\n🏆 [APEX_BLITZ] Operation complete.");
}

launchBlitz();
