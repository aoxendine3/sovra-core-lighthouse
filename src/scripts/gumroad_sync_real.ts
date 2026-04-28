import axios from 'axios';
import { TonyDB } from '../../sovra/core/db/TonyDB';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'node:fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function syncGumroad() {
    console.log('--- [GUMROAD_REAL_SYNC_IGNITION] ---');
    const token = process.env.GUMROAD_TOKEN;

    if (!token) {
        console.error('[GumroadSync] FATAL: GUMROAD_TOKEN is missing.');
        return;
    }

    try {
        console.log('[GumroadSync] Fetching real products from trendsetter445...');
        const response = await axios.get('https://api.gumroad.com/v2/products', {
            params: { access_token: token }
        });

        const products = response.data.products || [];
        console.log(`[GumroadSync] Found ${products.length} live products.`);

        const inst = await TonyDB.getInstance();
        // Ground the ledger by replacing products
        const dbPath = path.resolve(process.cwd(), '.gemini/sovra_sovereign/sovra_sovereign.json');
        const sovereignData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        
        sovereignData.sovra_products = products.map((p: any) => ({
            name: p.name,
            category: p.tags?.join(', ') || 'Sovereign Asset',
            price: p.price / 100, 
            seller: 'trendsetter445',
            url: p.short_url, 
            status: p.published ? 'ACTIVE' : 'DRAFT',
            description: p.description,
            metadata: {
                id: p.id,
                custom_url: p.custom_url,
                sales_count: p.sales_count,
                formatted_price: p.formatted_price
            },
            conversion_score: 100
        }));

        fs.writeFileSync(dbPath, JSON.stringify(sovereignData, null, 2));
        
        console.log('[GumroadSync] GROUNDING_COMPLETE: Ledger is now anchored in real Gumroad assets.');
        
        await TonyDB.logAgentActivity(
            'GumroadSync',
            `Real Product Sync Complete: Grounded ${products.length} assets.`,
            'SUCCESS',
            { count: products.length, timestamp: new Date().toISOString() }
        );

    } catch (err: any) {
        console.error('[GumroadSync] SYNC_FAULT:', err.response?.data || err.message);
    }
}

syncGumroad();
