import { TheProducer } from '../../agency/lib/agents/TheProducer.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

/**
 * BLITZ_GARDENING (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Monetize survivalist autonomy and self-sufficiency.
 * Source: The Field and Garden Vegetables of America (1911)
 */
async function blitz() {
    console.log('─── [APEX_GARDENING_BLITZ_INITIATED] ───');
    
    const producer = new TheProducer();
    const db = await SOVRADB.getInstance();

    const product = {
        name: 'The Sovereign Harvest: Exascale Gardening for Total Autonomy',
        category: 'Survival & Self-Sufficiency',
        price: 67.00,
        seller: 'SOVRA Prime',
        url: 'https://gumroad.com/l/sovra-harvest',
        description: 'Transform your physical perimeter into a high-theta survival node. A masterclass in autonomous food production for the sovereign elite.'
    };

    console.log(`[Blitz] Grounding New Asset: ${product.name}...`);
    
    // 1. Ground in DB
    try {
        await db.run(
            'INSERT INTO sovra_products (name, category, price, seller, url, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [product.name, product.category, product.price, product.seller, product.url, 'ACTIVE', product.description]
        );
        console.log('[Blitz] Product Grounded in Sovereign Ledger.');
    } catch (e) {
        console.log('[Blitz] Product already exists or DB conflict.');
    }

    // 2. Produce Media Content
    console.log(`[Blitz] Executing Global Omni-Pulse for ${product.name}...`);
    const assets = await producer.directedBlast(
        product.name, 
        product.url, 
        'Sovereign individuals, survivalists, and preppers looking for scientific, high-yield autonomy.'
    );

    console.log(`[Blitz] Successfully produced ${assets.length} marketing assets.`);
    
    // 3. Generate a sample "Ad Landing Page" specifically for the Gardening theme
    // (TheProducer already does this in produce() for ad_copy format)
    
    console.log('\n─── GARDENING BLITZ COMPLETE. ───');
    process.exit(0);
}

blitz();
