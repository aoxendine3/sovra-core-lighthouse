import { LiquidityBridgeAgent } from '../agency/lib/agents/finance/LiquidityBridgeAgent.ts';

/**
 * IGNITE_BRIDGE (v20.5)
 * Mandate: Absolute Utility.
 * MISSION: LIQUIDITY_BRIDGE_IGNITION
 */

async function igniteBridge() {
  console.log('--- [APEX_BRIDGE_IGNITION_PULSE] ---');
  
  const bridgeAgent = new LiquidityBridgeAgent();
  
  console.log('[Bridge] Triggering $1,000,000,000 Institutional Grant...');
  
  const result = await bridgeAgent.executeInstitutionalGrant(1000000000);
  
  if (result.success) {
    console.log(`[Bridge] SUCCESS: $${result.amount.toLocaleString()} moved to CEO Personal Tranche.`);
  }
  
  console.log('--- [BRIDGE_PULSE_GROUNDED] ---');
}

igniteBridge().catch(err => {
  console.error('[Bridge] PULSE_FAULT:', err);
  process.exit(1);
});
