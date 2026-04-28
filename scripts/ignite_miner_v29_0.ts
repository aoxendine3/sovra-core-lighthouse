import { MasterMiningRegiment } from '../agency/lib/agents/extraction/MasterMiningRegiment.ts';

/**
 * IGNITE_MILLION_MINER (v29.0)
 * Mandate: Absolute Extraction Velocity.
 * MISSION: DEEP_THETA_EXTRACTION_STRIKE
 */

async function igniteMiner() {
  console.log('--- [APEX_MINER_IGNITION] ---');
  
  const regiment = new MasterMiningRegiment();
  
  // 1. Audit Regiment Status
  const status = await regiment.getRegimentStatus();
  console.log(`[Regiment] Status: ${status.power} at ${status.depth} Depth [${status.status}]`);
  
  // 2. Execute Million-Miner Deep-Theta Strike (Target: Arbitrage Gaps)
  console.log('[Regiment] MANDATE: Executing 1,000,000 Master Miner Strike into [ARBITRAGE_GAPS]...');
  const result = await regiment.deepThetaStrike('ARBITRAGE_GAPS');
  
  if (result.success) {
    console.log(`[Regiment] SUCCESS: ${result.workerCount.toLocaleString()} workers reached ${result.depth.toLocaleString()} nodes.`);
    console.log(`[Regiment] EXTRACTION_PULSE: ${result.discoveries} high-theta high-yield tranches captured.`);
  }
  
  console.log('--- [MINER_GROUNDED] ---');
}

igniteMiner().catch(err => {
  console.error('[Regiment] IGNITION_FAULT:', err);
  process.exit(1);
});
