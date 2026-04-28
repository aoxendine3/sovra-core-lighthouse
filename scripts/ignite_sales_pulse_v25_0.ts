import { SovereignSalesAgent } from '../agency/lib/agents/sales/SovereignSalesAgent.ts';

/**
 * IGNITE_SALES_PULSE (v25.0)
 * Mandate: Absolute Velocity.
 * MISSION: REVENUE_VELOCITY_STRIKE
 */

async function igniteSalesPulse() {
  console.log('--- [APEX_SALES_PULSE_IGNITION] ---');
  
  const salesCloser = new SovereignSalesAgent();
  
  // 1. Execute moderate velocity pulse ($100,000 Volume)
  console.log('[Closer] MANDATE: Executing $100,000 conversion strike...');
  const result = await salesCloser.executeSalesPulse(100000);
  
  if (result.success) {
    console.log(`[Closer] SUCCESS: Captured $${result.capturedVolume.toLocaleString()} via ${result.saleCount} sales.`);
  }
  
  console.log('--- [SALES_PULSE_GROUNDED] ---');
}

igniteSalesPulse().catch(err => {
  console.error('[Closer] IGNITION_FAULT:', err);
  process.exit(1);
});
