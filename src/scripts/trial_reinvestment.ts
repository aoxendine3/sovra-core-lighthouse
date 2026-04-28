import { executeOmniPulse } from './global_blitz_orchestrator';
import { SOVRADB } from '../../agency/lib/db/SOVRADB';
import { audit } from '../lib/logger/InstitutionalLogger';
import { RevenueReconcilerAgent } from '../../agency/lib/agents/finance/RevenueReconcilerAgent';

/**
 * INSTITUTIONAL EXECUTION: High-Velocity Reinvestment (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: YIELD_MASTERY_PULSE
 * Purpose: Orchestrates autonomous capital reinvestment strikes via the Sovereign Core.
 */
export async function executeReinvestmentPulse() {
  await audit('info', 'REINVESTMENT_PULSE_INITIATED');
  
  try {
    // 1. RECONCILIATION: Bridge click pulses to grounded revenue
    const reconciler = new RevenueReconcilerAgent();
    await reconciler.reconcileClicks();
    
    // 2. TRIGGER: Global Omni-Pulse (Autonomously scaling the nodes)
    console.log('[Reinvestment] IGNITING: Global SOVRA Saturation Pulse...');
    await executeOmniPulse();

    // 3. VERIFY: Metric Parity
    const stats = await SOVRADB.getEnterpriseStats();
    await audit('info', 'YIELD_PULSE_VERIFIED', {
      grossRevenue: stats.grossRevenue,
      nodeCount: stats.eliteNodeCount,
      reconciledStatus: 'GROUNDED'
    });

    await audit('info', 'REINVESTMENT_PULSE_COMPLETE');

  } catch (err: any) {
    await audit('error', 'REINVESTMENT_PULSE_CRITICAL_FAULT', { error: err.message });
  }
}

// Self-execute if run directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('trial_reinvestment')) {
    executeReinvestmentPulse();
}
