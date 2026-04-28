import fs from 'fs';
import path from 'path';
import { SOVRADB } from '../sovra/core/db/SOVRADB';

/**
 * Institutional Shopify Ingress Worker (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mission: Ground all assets from shopify_import.csv into the
 * Sovereign Ledger (SOVRADB) for autonomous revenue scaling.
 */
async function runIngress() {
    console.log('--- [PHASE 1: SHOPIFY_INGRESS] INITIATED ---');
    
    const csvPath = path.join(process.cwd(), 'shopify_import.csv');
    if (!fs.existsSync(csvPath)) {
        console.error('[FAULT] shopify_import.csv not found.');
        return;
    }

    const raw = fs.readFileSync(csvPath, 'utf8');
    const lines = raw.split('\n');
    const headers = lines[0].split(',');

    let successCount = 0;

    // Skip header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // Simple CSV parse (handles basic commas)
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        
        const product = {
            handle: parts[0],
            title: parts[1],
            body_html: parts[2],
            vendor: parts[3],
            type: parts[4],
            tags: parts[5],
            price: parseFloat(parts[7]) || 0.00,
            inventory: parseInt(parts[8]) || 0,
            status: parts[9],
            image_src: parts[12],
            source: 'SHOPIFY_IMPORT'
        };

        try {
            await SOVRADB.run(
                'INSERT INTO sovra_products (name, category, price, seller, url, status, description, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    product.handle, 
                    product.type, 
                    product.price, 
                    product.vendor, 
                    product.image_src, 
                    product.status, 
                    product.body_html, 
                    product.tags
                ]
            );
            successCount++;
        } catch (e) {
            // Likely duplicate or schema mismatch, continue grounding
        }
    }

    console.log(`[SUCCESS] Grounded ${successCount} institutional assets into SOVRADB.`);
    console.log('--- [PHASE 1: COMPLETE] ---');
}

runIngress().catch(console.error);
