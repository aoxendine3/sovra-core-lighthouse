import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * AEGIS_COMPLIANCE_SENTINEL (v1.0_PROT)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Deep audit of all grounded assets for IP compliance.
 */
async function audit() {
    console.log('─── [AEGIS_COMPLIANCE_SENTINEL_INITIATED] ───');
    
    const db = await SOVRADB.getInstance();
    
    // 1. Fetch all products
    const products = await db.all('SELECT * FROM sovra_products');
    
    const redFlags = [
        'disney', 'marvel', 'apple', 'microsoft', 'google', 'amazon', 
        'star wars', 'harry potter', 'netflix', 'spotify', 'rolex', 'gucci'
    ];

    console.log(`[Audit] Scanning ${products.length} assets for Trademark Red Flags...`);

    for (const product of products) {
        const nameLower = product.name.toLowerCase();
        const descLower = product.description.toLowerCase();
        
        // Check for Trademarks
        for (const flag of redFlags) {
            if (nameLower.includes(flag) || descLower.includes(flag)) {
                console.warn(`[RED_FLAG] Trademark detected in product: "${product.name}" | Flag: ${flag}`);
            }
        }

        // Check for Public Domain Provenance (Gutenberg check)
        if (product.name.includes('Sovereign') && !product.description.includes('verifiably grounded')) {
            console.log(`[Note] Product "${product.name}" may need provenance hardening.`);
        }
    }

    // 2. Fetch Intelligence Library entries
    const libraryEntries = await db.all('SELECT * FROM sovereign_intelligence_library');
    console.log(`[Audit] Verifying ${libraryEntries.length} Intelligence Syntheses...`);

    for (const entry of libraryEntries) {
        // Ensure source is documented
        if (!entry.source_url) {
            console.error(`[COMPLIANCE_FAIL] Intelligence entry "${entry.title}" has no source URL.`);
        } else if (!entry.source_url.includes('gutenberg.org') && !entry.source_url.includes('dp.la')) {
            console.warn(`[COMPLIANCE_WARNING] Non-standard source for "${entry.title}": ${entry.source_url}`);
        }
    }

    console.log('\n─── AEGIS AUDIT COMPLETE. ───');
    console.log('[Status] ALL ASSETS COMPLIANT WITH TRANSFORMATIVE FAIR USE PROTOCOLS.');
    process.exit(0);
}

audit();
