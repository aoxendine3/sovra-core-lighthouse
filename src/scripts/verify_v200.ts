import { DominanceDirector } from '../../agency/lib/jarvis/DominanceDirector.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as fs from 'fs';
import path from 'path';

async function verifyv200() {
  console.log('--- Ω_EXASCALE v.200 INSTITUTIONAL AUDIT ---');

  // 1. Oracle Audit (200 Steps)
  const director = new DominanceDirector();
  const shifts = await director.executeDominancePulse();
  const stepCount = shifts.length;
  console.log(`[ORACLE] Forecasting Depth: ${stepCount} Steps.`);
  
  if (stepCount !== 200) {
    console.error(`[FAIL] Forecasting depth is ${stepCount}, expected 200.`);
  } else {
    console.log(`[PASS] 200-Step Mandate Verifiably Grounded.`);
  }

  // 2. Infrastructure Audit (200k Nodes)
  const stats = await SOVRADB.getEnterpriseStats();
  console.log(`[INFRA] Grounded Nodes: ${stats.eliteNodeCount.toLocaleString()}`);
  
  if (stats.eliteNodeCount !== 200000) {
    console.error(`[FAIL] Node count is ${stats.eliteNodeCount}, expected 200,000.`);
  } else {
    console.log(`[PASS] 200,000-Node Scaling verifiably settled.`);
  }

  // 3. Nomenclature Audit (v.200)
  const sidebarContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/dashboard/Sidebar.tsx'), 'utf-8');
  const isV200 = sidebarContent.includes('SOVEREIGN_v.200') || sidebarContent.includes('v.200_SOVEREIGN_ULTIMA');
  console.log(`[AESTHETIC] Sidebar v.200 Marker: ${isV200 ? 'DETECTED' : 'MISSING'}`);

  if (!isV200) {
     console.error('[FAIL] Sidebar rebranding missing v.200 nomenclature.');
  }

  console.log('--- AUDIT COMPLETE ---');
  if (stepCount === 200 && stats.eliteNodeCount === 200000 && isV200) {
    console.log('MISSION_SUCCESS: Ω_EXASCALE_v.200_Grounded.');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

verifyv200().catch(e => {
  console.error('[FATAL] Audit Interrupted:', e);
  process.exit(1);
});
