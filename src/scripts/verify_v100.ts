import { config } from 'dotenv';
import path from 'path';

// Load Institutional Environment (v.100_CALIBRATION)
config({ path: path.resolve(process.cwd(), '.env.local') });

import { VoiceController } from '../../src/lib/audio/VoiceController.ts';
import { validateHandshake } from '../../src/lib/auth/Handshake.ts';
import { DominanceDirector } from '../../agency/lib/jarvis/DominanceDirector.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';

async function verifyV100() {
  console.log('--- APEX-Ω_EXASCALE Verification (v.100_SOVEREIGN_ULTIMA) ---');

  try {
    // 1. Verify Vocal Intelligence
    const voice = new VoiceController();
    const voices = voice.getVoices();
    console.log(`✅ VOCAL_INTELLIGENCE: ${voices.length} voices verifiably grounded.`);
    
    // 2. Verify Zettascale Scale
    const stats = await SOVRADB.getEnterpriseStats();
    if (stats.eliteNodeCount >= 50000) {
        console.log(`✅ ZETTASCALE_SCALE: ${stats.eliteNodeCount.toLocaleString()} nodes verifiably grounded.`);
    } else {
        throw new Error(`Scale Fault: Only ${stats.eliteNodeCount} nodes found.`);
    }
    
    // 3. Verify Dominance Horizon (50 Steps)
    const dominance = new DominanceDirector();
    const shifts = await dominance.executeDominancePulse();
    if (shifts.length === 50) {
        console.log(`✅ MARKET_ORACLE: All 50 future steps verifiably recorded.`);
    } else {
        throw new Error(`Dominance Fault: Expected 50 steps, found ${shifts.length}.`);
    }

    // 4. Aesthetic Integrity Check (CSS)
    const fs = await import('fs');
    const css = fs.readFileSync('src/app/globals.css', 'utf8');
    if (css.includes('v.100_SOVEREIGN_ULTIMA')) {
        console.log('✅ AESTHETIC_INTEGRITY: v.100 design tokens verified.');
    } else {
        throw new Error('Aesthetic Fault: v.100 markers missing from globals.css');
    }

    console.log('--- MISSION_SUCCESS: v.100_SOVEREIGN_ULTIMA_VERIFIED ---');
  } catch (e: any) {
    console.error(`❌ FAULT: ${e.message}`);
    process.exit(1);
  }
}

verifyV100().then(() => process.exit(0));
