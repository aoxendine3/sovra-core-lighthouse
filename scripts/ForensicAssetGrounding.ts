import fs from 'fs';
import path from 'path';
import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';

/**
 * ForensicAssetGrounding (v61.0_APEX)
 * Mandate: Stream 6,644 assets into the physically grounded SOVRADB.
 */
async function ignite() {
  console.log('🚀 INITIALIZING FORENSIC ASSET GROUNDING...');

  const assetsPath = path.resolve(process.cwd(), 'src/data/assets.json');
  if (!fs.existsSync(assetsPath)) {
    console.error('❌ ASSET LEDGER NOT FOUND AT:', assetsPath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(assetsPath, 'utf8');
  const assets = JSON.parse(rawData);
  const total = assets.length;

  console.log(`📌 LOADED ${total} ASSETS FROM JSON. TARGET: SOVRADB (sovra_products)`);

  let count = 0;
  for (const asset of assets) {
    try {
      // Map JSON to Product Schema
      const name = asset.name || 'Unknown Asset';
      const description = `${asset.type} - Valued at $${asset.currentValuation}`;
      const price = asset.currentValuation || 0;
      const category = asset.type || 'GENERAL';
      
      const metadata = {
        legacy_id: asset.id,
        acquired_price: asset.acquiredPrice,
        status: asset.status,
        purchased_at: asset.purchasedAt
      };

      await SOVRADB.stageProduct(name, description, price, category, metadata);
      
      count++;
      if (count % 500 === 0) {
        console.log(`✅ PROGRESS: ${count}/${total} assets grounded.`);
      }
    } catch (e) {
      console.error(`❌ FAULT AT ASSET ${asset.id}:`, e);
    }
  }

  console.log(`\n🏆 MISSION COMPLETE: ${count} assets verifiably grounded to the Sovereign Ledger.`);
  
  // Final verification pulse
  const stats = await SOVRADB.getEnterpriseStats();
  console.log('📊 SOVEREIGN STATUS PULSE:');
  console.log(`   - Staged Products: ${stats.stagedProducts}`);
  console.log(`   - Grounded Accuracy: ${(stats.stagedProducts / total * 100).toFixed(2)}%`);
}

ignite().catch(console.error);
