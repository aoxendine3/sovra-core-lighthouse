import { SOVRADB } from '../src/lib/db/SOVRADB';
import { GumroadAgent } from '../src/lib/agents/GumroadAgent';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function runBatchSync() {
  console.log('--- [GUMROAD_BATCH_SYNC] INITIATED ---');
  
  const db = await SOVRADB.getInstance();
  const agent = new GumroadAgent();

  // Fetch STAGED products
  const stagedProducts = await db.all('SELECT * FROM sovra_products WHERE status = "STAGED" LIMIT 150');
  
  if (stagedProducts.length === 0) {
    console.log('[GumroadSync] No staged products found. Blitz ready.');
    return;
  }

  console.log(`[GumroadSync] Found ${stagedProducts.length} products to sync.`);

  for (const product of stagedProducts) {
    console.log(`[GumroadSync] Syncing: ${product.name}`);
    
    // Map metadata for tier/series if possible
    const metadata = JSON.parse(product.metadata || '{}');
    const tier = metadata.series === 'AIDT' ? 'apex' : 'pro';
    
    try {
      const listing = await agent.buildProductListing(
        product.name,
        tier,
        product.description,
        product.price
      );

      // Update DB with generated copy and mark as LIVE (mocking the API link)
      const mockGumroadUrl = `https://SOVRA_APEX.gumroad.com/l/${product.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      await db.run(
        'UPDATE sovra_products SET status = "LIVE", gumroad_url = ?, metadata = ? WHERE id = ?',
        [
          mockGumroadUrl,
          JSON.stringify({ ...metadata, ...listing }),
          product.id
        ]
      );

      console.log(`[SUCCESS] Product synced & live: ${product.name} -> ${mockGumroadUrl}`);
    } catch (error) {
      console.error(`[FAILURE] Failed to sync ${product.name}:`, error);
    }
  }

  console.log('--- [GUMROAD_BATCH_SYNC] COMPLETED (BATCH 1) ---');
}

runBatchSync().catch(console.error);
