import { TheProducer } from '../../agency/lib/agents/TheProducer.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * BLITZ_SOVEREIGN_SERIES (v2.0_INSTITUTIONAL)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Monetize foundational intelligence and communication.
 * Sources: Strunk, Nuttall, Wattles.
 */
async function blitz() {
    console.log('─── [SOVEREIGN_SERIES_BLITZ_INITIATED] ───');
    
    const producer = new TheProducer();
    const db = await SOVRADB.getInstance();

    const products = [
        {
            name: 'Sovereign Syntax: The Code of Influence',
            category: 'Courses & Books',
            price: 49.00,
            seller: 'SOVRA Prime',
            url: 'https://gumroad.com/l/sovra-syntax',
            description: 'Master the elements of style to weaponize your communication. Based on the foundational Strunk principles, modernized for high-theta persuasion.'
        },
        {
            name: 'The Sovereign Compendium: Exascale Knowledge Base',
            category: 'Courses & Books',
            price: 89.00,
            seller: 'SOVRA Prime',
            url: 'https://gumroad.com/l/sovra-compendium',
            description: 'A digitized, institutional-grade encyclopedia of global intelligence. The Nuttall standard, extracted for sovereign query-response excellence.'
        },
        {
            name: 'Exascale Abundance: The Science of Wealth Autonomy',
            category: 'Courses & Books',
            price: 77.00,
            seller: 'SOVRA Prime',
            url: 'https://gumroad.com/l/exascale-abundance',
            description: 'The definitive protocol for manifesting physical capital. Wallace Wattles science of wealth, re-engineered for the autonomous elite.'
        }
    ];

    for (const product of products) {
        console.log(`[Blitz] Grounding Asset: ${product.name}...`);
        try {
            await db.run(
                'INSERT INTO sovra_products (name, category, price, seller, url, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [product.name, product.category, product.price, product.seller, product.url, 'ACTIVE', product.description]
            );
            
            console.log(`[Blitz] Executing Media Pulse for ${product.name}...`);
            await producer.directedBlast(
                product.name, 
                product.url, 
                'Entrepreneurs, high-performers, and sovereign individuals seeking foundational dominance.'
            );
        } catch (e) {
            console.log(`[Blitz] Skip or Error: ${product.name}`);
        }
    }

    console.log('\n─── SOVEREIGN SERIES BLITZ COMPLETE. ───');
    process.exit(0);
}

blitz();
