import { SovereignMarketplaceAgent } from '../agency/lib/agents/commerce/SovereignMarketplaceAgent.ts';

/**
 * IGNITE_MERCHANT_HUB (v23.0)
 * Mandate: Revenue Sovereignty.
 * MISSION: MERCHANT_IGNITION
 */

async function igniteMerchantHub() {
  console.log('--- [APEX_MERCHANT_HUB_IGNITION_PULSE] ---');
  
  const marketplace = new SovereignMarketplaceAgent();
  
  // 1. Deploy the first proprietary product
  console.log('[Marketplace] Deploying proprietary asset: SOVRA Singularity AI - Access Key...');
  const deployment = await marketplace.deployProprietaryProduct(
    'SOVRA Singularity AI - Access Key',
    'Full institutional access to the Sovereign Hive v22.0. Quantum-resistant fulfillment.',
    999.00,
    'AI_SOFTWARE'
  );
  
  if (deployment.success) {
    // 2. Record an Initial Merchant Sale (Proof of Concept)
    console.log(`[Marketplace] Success. Recording initial 100% margin sale...`);
    const saleResult = await marketplace.recordMerchantSale('SOVRA Singularity AI - Access Key', 999.00);
    
    if (saleResult.success) {
      console.log(`[Marketplace] MERCHANT_PULSE_ESTABLISHED: GMR verifiably ignited.`);
    }
  }
  
  console.log('--- [MERCHANT_HUB_GROUNDED] ---');
}

igniteMerchantHub().catch(err => {
  console.error('[Marketplace] IGNITION_FAULT:', err);
  process.exit(1);
});
