import { SingularityAssetForgeAgent } from '../agency/lib/agents/commerce/SingularityAssetForgeAgent.ts';
import { SovereignMarketplaceAgent } from '../agency/lib/agents/commerce/SovereignMarketplaceAgent.ts';

/**
 * IGNITE_ASSET_FORGE (v24.0)
 * Mandate: Absolute Saturation.
 * MISSION: GLOBAL_PRODUCTION_STRIKE
 */

async function igniteAssetForge() {
  console.log('--- [APEX_ASSET_FORGE_IGNITION_PULSE] ---');
  
  const forge = new SingularityAssetForgeAgent();
  const marketplace = new SovereignMarketplaceAgent();
  
  // 1. Purge Legacy Affiliate Inventory (Verifiable Sovereignty)
  console.log('[Forge] MANDATE: Clearing legacy affiliate tranches...');
  const purge = await marketplace.purgeLegacyInventory();
  
  if (purge.success) {
    console.log(`[Forge] Ground cleared. ${purge.count} items purged.`);
    
    // 2. Ignite Production Forge from Research
    console.log('[Forge] IGNITING: Forging products from 100M Depth Hive Research...');
    const production = await forge.forgeProductsFromResearch();
    
    if (production.success) {
      console.log(`[Forge] Local production grounded: ${production.forgedCount} primary assets live.`);
      
      // 3. Global Saturation Strike (Scaling to 10k+)
      console.log('[Forge] SATURATING: Executing Global Saturation Strike (10k+ assets)...');
      const saturation = await forge.executeGlobalSaturate();
      
      if (saturation.success) {
        console.log(`[Forge] SUCCESS: Marketplace saturated with ${saturation.targetCount} proprietary assets.`);
      }
    }
  }
  
  console.log('--- [ASSET_FORGE_GROUNDED] ---');
}

igniteAssetForge().catch(err => {
  console.error('[Forge] IGNITION_FAULT:', err);
  process.exit(1);
});
