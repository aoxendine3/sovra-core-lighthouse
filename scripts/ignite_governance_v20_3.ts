import { SpecialistTaskAgent } from '../agency/lib/agents/SpecialistTaskAgent';

/**
 * IGNITE_GOVERNANCE (v20.3)
 * Mandate: Absolute Tasking Saturation.
 * MISSION: GALACTIC_GOVERNANCE_IGNITION
 */

async function igniteGovernance() {
  console.log('--- [APEX_GOVERNANCE_IGNITION_PULSE] ---');
  
  const taskAgent = new SpecialistTaskAgent();
  
  console.log('[Governance] Triggering recursive mandates for 1,000+ grounded specialists...');
  
  await taskAgent.assignRecursiveMandates();
  
  console.log('--- [GOVERNANCE_PULSE_GROUNDED] ---');
}

igniteGovernance().catch(err => {
  console.error('[Governance] PULSE_FAULT:', err);
  process.exit(1);
});
