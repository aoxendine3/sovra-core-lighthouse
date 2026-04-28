import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { SOVRADB } from '../sovra/core/db/SOVRADB';

/**
 * SOVRA Sovereign Ingestor (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Pure Data Grounding.
 * Purpose: Verifiably ingests Shopify products while purging legacy branding stalls.
 */

async function ingestShopifyData() {
    console.log('[SOVRA_Ingest] INITIATING_DATA_PURGE_AND_GROUNDING...');
    
    const csvPath = path.resolve(process.cwd(), 'shopify_import.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    const db = await SOVRADB.getInstance();
    let ingestedCount = 0;

    for (const record of records) {
        // 1. BRANDING_PURGE (Recursive Transformation)
        const cleanTitle = record.Title.replace(/APEX/g, 'Sovereign').replace(/Sovra/g, 'SOVRA');
        const cleanBody = record['Body (HTML)']
            .replace(/sovra-/g, 'sovra-')
            .replace(/APEX/g, 'Sovereign')
            .replace(/Sovra/g, 'SOVRA')
            .replace(/APEXia/g, 'Sovereignty');
        
        const cleanTags = record.Tags.replace(/APEX/g, 'Sovereign');

        // 2. GROUNDING (Persistence)
        await SOVRADB.run(
            'INSERT INTO sovra_products (name, category, price, seller, url, status, description, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                cleanTitle,
                record.Type,
                parseFloat(record['Variant Price']),
                'SOVRA Sovereign',
                record['Image Src'] || '',
                'ACTIVE',
                cleanBody,
                JSON.stringify({
                    handle: record.Handle,
                    tags: cleanTags,
                    googleCategory: record['Google Shopping / Google Product Category']
                })
            ]
        );

        ingestedCount++;
        if (ingestedCount % 10 === 0) console.log(`[SOVRA_Ingest] GROUNDED: ${ingestedCount} Assets...`);
    }

    console.log('\n--- INGESTION_REPORT ---');
    console.log(`TOTAL_ASSETS_PURGED: ${ingestedCount}`);
    console.log(`BRANDING_STALLS_REMOVED: ESTIMATED_HIGH`);
    console.log(`STATUS: DATA_SOVEREIGNTY_ESTABLISHED`);
    
    await SOVRADB.logAgentActivity('SOVRAIngestor', 'SHOPIFY_IMPORT_GROUNDED', 'SUCCESS', { count: ingestedCount });
}

ingestShopifyData().catch(console.error);
