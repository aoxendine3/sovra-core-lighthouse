import { GumroadAgent } from '../agency/lib/agents/GumroadAgent.ts';
import fs from 'fs/promises';
import path from 'path';

/**
 * GUMROAD_SOVEREIGN_SYNC (v15.2)
 * Mandate: Market Saturation for existing assets.
 * Links Gumroad products to the Sovereign Ledger for scaling.
 */

async function runGumroadSync() {
  console.log('--- [APEX_GUMROAD_SYNC_IGNITION] ---');
  
  const agent = new GumroadAgent();
  
  // 1. Generate optimized listing for "All Things AI Encyclopedia (Vol 2)"
  const vol2 = await agent.buildProductListing(
    'All Things AI Encyclopedia (Vol 2)',
    'apex',
    'The definitive institutional blueprint for sovereign AI deployment (v2026). 200+ agents, 1000+ pSEO targets, full Singularity logic.',
    49.00
  );

  // 2. Generate Flash Coupons
  const flashDeal = await agent.generateFlashDealCoupon(50);
  
  // 3. Grounding Assets
  const assetDir = path.join(process.cwd(), '.gemini/sovra_sovereign/assets/gumroad');
  await fs.mkdir(assetDir, { recursive: true });
  
  const manifest = {
    product: vol2,
    coupon: flashDeal,
    timestamp: new Date().toISOString(),
    status: 'READY_FOR_DEPLOYMENT'
  };

  await fs.writeFile(
    path.join(assetDir, 'all_things_ai_vol2_manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('[GumroadSync] ASSET_GROUNDED: manifest.json created.');
  console.log(`[GumroadSync] FLASH_DEAL: Code [${flashDeal.code}] | Message: [${flashDeal.message}]`);
  
  console.log('--- [SYNC_COMPLETE] ---');
}

runGumroadSync().catch(console.error);
