const Stripe = require('stripe');
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

async function audit() {
    console.log("--- [REALITY_AUDIT] INITIATED ---");
    const report = {
        stripe: { balance: 0, status: 'OFFLINE' },
        gumroad: { balance: 0, status: 'OFFLINE' },
        cj: { earnings: 0, status: 'OFFLINE' }
    };

    // 1. Stripe Audit
    if (process.env.STRIPE_SECRET_KEY) {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const balance = await stripe.balance.retrieve();
            report.stripe.balance = balance.available[0].amount / 100;
            report.stripe.status = 'ONLINE';
            console.log(`✅ Stripe: $${report.stripe.balance}`);
        } catch (e) {
            report.stripe.status = `ERROR: ${e.message}`;
            console.error(`❌ Stripe Error: ${e.message}`);
        }
    }

    // 2. Gumroad Audit
    if (process.env.GUMROAD_TOKEN) {
        try {
            const response = await axios.get('https://api.gumroad.com/v2/user', {
                params: { access_token: process.env.GUMROAD_TOKEN }
            });
            // Note: User API doesn't show balance easily without deeper calls, 
            // but we can check if it's alive.
            report.gumroad.status = 'ONLINE';
            console.log(`✅ Gumroad: CONNECTED`);
        } catch (e) {
            report.gumroad.status = `ERROR: ${e.message}`;
            console.error(`❌ Gumroad Error: ${e.message}`);
        }
    }

    // 3. CJ Audit
    if (process.env.CJ_AFFILIATE_API_KEY) {
        try {
            // Check commissions for last 30 days
            const response = await axios.get('https://api.cj.com/v2/earnings', {
                headers: { 'Authorization': `Bearer ${process.env.CJ_AFFILIATE_API_KEY}` },
                params: { 'date-range': 'last-30-days' }
            });
            report.cj.status = 'ONLINE';
            console.log(`✅ CJ Affiliate: CONNECTED`);
        } catch (e) {
            report.cj.status = `ERROR: ${e.message}`;
            console.error(`❌ CJ Error: ${e.message}`);
        }
    }

    console.log("\n--- [FINAL_REPORT] ---");
    console.log(JSON.stringify(report, null, 2));
}

audit();
