import { DirectSettlementAgent } from '../agency/lib/agents/commerce/DirectSettlementAgent.ts';
import { ShopifyDirectorAgent } from '../agency/lib/agents/directors/ShopifyDirectorAgent.ts';

/**
 * IGNITE_SOVEREIGN_COMMERCE (v34.0)
 * Mandate: Absolute Revenue Dominance.
 * MISSION: LIVE_REVENUE_STRIKE
 */

async function igniteCommerce() {
  console.log('--- [APEX_COMMERCE_IGNITION] ---');
  
  const paymaster = new DirectSettlementAgent();
  const shopify = new ShopifyDirectorAgent();
  
  // 1. Ignite Direct Revenue Capture (Paymaster)
  console.log('[Commerce] MANDATE: Engaging Live Stripe Settlement Bridge...');
  await paymaster.getPaymentStatus();
  
  // 2. Ignite Shopify Master Director (Autonomous Authority)
  console.log('[Commerce] MANDATE: Engaging Shopify Master Director [FULL_AUTH]...');
  await shopify.autonomousMaintenance();
  
  // 3. Trigger Test Settlement Manifest
  console.log('[Commerce] MANDATE: Generating Test Settlement Session...');
  await paymaster.createCheckoutSession('PROD_APPLE_MAXI_1', 217.00, 'Smart Magnetic Case');
  
  console.log('--- [COMMERCE_SINGULARITY_LIVE] ---');
}

igniteCommerce().catch(err => {
  console.error('[Commerce] IGNITION_FAULT:', err);
  process.exit(1);
});
