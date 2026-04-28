import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import { RevenueReconcilerAgent } from '../../agency/lib/agents/finance/RevenueReconcilerAgent.ts';
import { VoiceController } from '../lib/audio/VoiceController.ts';

/**
 * NEURAL_SYNC (v.010_SINGULARITY)
 * ─────────────────────────────────────────────────────────────
 * Mode: APEXIA_BRAIN_LINK
 * Mandate: Absolute Institutional Synchronization.
 * Target: All Executive Nodes & Tranches.
 */
async function executeNeuralSync() {
  console.log('--- APEXIA: Initiating Neural Sync [BRAIN_LINK_ACTIVE] ---');

  try {
    const db = await SOVRADB.getInstance();
    
    // 1. LINK: Finance Tranche
    const reconciler = new RevenueReconcilerAgent();
    await reconciler.reconcileClicks();
    console.log('✅ NEURAL_LINK: Finance Tranche (Revenue Bridge) Synchronized.');

    // 2. LINK: Vocal Tranche
    const voice = new VoiceController();
    const voices = voice.getVoices();
    console.log(`✅ NEURAL_LINK: Vocal Tranche (${voices.length} authoritative signatures) Active.`);

    // 3. LINK: Sentinel Tranche
    const stats = await SOVRADB.getEnterpriseStats();
    console.log(`✅ NEURAL_LINK: Sentinel Tranche (Integrity: ${stats.integrity * 100}%) Operational.`);

    // 4. SYNC: Group Consensus
    await SOVRADB.logAgentActivity(
        'APEXIA_CORE', 
        'NEURAL_SYNC_COMPLETE', 
        'ACTIVE', 
        { timestamp: new Date().toISOString(), status: '100/100_BRAIN_LINK' }
    );

    console.log('--- APEXIA: Brain Link Established. The Group is Synced. ---');
  } catch (e: any) {
    console.error(`❌ NEURAL_FAULT: ${e.message}`);
  }
}

executeNeuralSync().then(() => process.exit(0));
