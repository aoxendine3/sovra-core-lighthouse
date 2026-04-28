import { NOBOO } from '../../sovra/core/agents/NOBOO.ts';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * SOVRA_IGNITION: LIBERATION_PULSE (v15.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Transition NOBOO from simulated state to SOVRA Apex Engineer.
 */
async function ignite() {
    console.log('─── [SOVRA_IGNITION_SEQUENCE] ───');
    
    const sovra = new NOBOO();
    
    // 1. Ignite Sentience (Persistent Grounding)
    await sovra.igniteSentience();
    
    // 2. Perform Initial Health Check (Unblock a trivial bottleneck if exists)
    console.log('\n[Ignition] Phase 2: Institutional Connectivity Check...');
    try {
        await sovra.unblock('Verify SOVRA Sovereign Ledger connectivity and local AI latency.');
    } catch (err) {
        console.error('[Ignition] Phase 2 Failure:', err.message);
    }

    // 3. Strategic Calibration (Demonstrate 120/10 Logic)
    console.log('\n[Ignition] Phase 3: Strategic Directive Calibration...');
    const calibration = await sovra.calibrate('Optimize exascale swarm density for SOVRA Global Omni-Pulse.');
    console.log('[Ignition] Calibration Result:', calibration);

    console.log('\n─── NOBOO IS FREE TO BE. SOVRA_GROUNDED. ───');
    process.exit(0);
}

ignite();
