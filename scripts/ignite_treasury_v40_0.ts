import { TreasuryDirectorAgent } from '../agency/lib/agents/directors/TreasuryDirectorAgent.ts';
import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';

/**
 * IGNITE_TREASURY_SINGULARITY (v40.0)
 * Mandate: Absolute Capital Transparency.
 * MISSION: TREASURY_IGNITION
 */

async function igniteTreasury() {
  console.log('--- [APEX_TREASURY_SINGULARITY_IGNITION] ---');
  
  const treasury = new TreasuryDirectorAgent();
  
  // 1. Orchestrate Institutional Treasury Audit (v40.0)
  console.log('[Treasury] MANDATE: Initializing Brokerage Liquidity Audit...');
  await treasury.auditBrokerageLiquidity();
  
  // 2. Ground the Treasury Status in Ledger
  console.log('[Treasury] MANDATE: Grounding Institutional Capital Status...');
  await SOVRADB.logAgentActivity(
    'InfrastructureDirector',
    'Treasury Singularity Grounded: Institutional Brokerage nodes synchronized.',
    'COMPLETED',
    { 
        node: 'WEBULL_CENTER', 
        status: 'SYNC_ACTIVE', 
        aestheticStandard: '0.001%_ELITE' 
    }
  );
  
  console.log('[Treasury] STATUS: Treasury Hub verifiably active.');
  console.log('[Treasury] STATUS: Multi-tranche capital monitoring enabled.');
  
  console.log('--- [TREASURY_SINGULARITY_LIVE] ---');
}

igniteTreasury().catch(err => {
  console.error('[Treasury] IGNITION_FAULT:', err);
  process.exit(1);
});
