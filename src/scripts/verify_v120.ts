import { DominanceDirector } from '../../agency/lib/jarvis/DominanceDirector.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as fs from 'fs';
import path from 'path';

async function verifyv120() {
  console.log('--- Ω_EXASCALE v.120 INSTITUTIONAL AUDIT ---');

  // 1. Oracle Audit
  const director = new DominanceDirector();
  const shifts = await director.executeDominancePulse();
  const stepCount = shifts.length;
  console.log(`[ORACLE] Forecasting Depth: ${stepCount} Steps.`);
  
  if (stepCount !== 120) {
    console.error(`[FAIL] Forecasting depth is ${stepCount}, expected 120.`);
  } else {
    console.log(`[PASS] 120-Step Mandate Verifiably Grounded.`);
  }

  // 2. Infrastructure Audit
  const stats = await SOVRADB.getEnterpriseStats();
  console.log(`[INFRA] Grounded Nodes: ${stats.eliteNodeCount.toLocaleString()}`);
  
  if (stats.eliteNodeCount !== 120000) {
    console.error(`[FAIL] Node count is ${stats.eliteNodeCount}, expected 120,000.`);
  } else {
    console.log(`[PASS] 120,000-Node Scaling verifiably settled.`);
  }

  // 3. Nomenclature Audit
  const sidebarContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/dashboard/Sidebar.tsx'), 'utf-8');
  const isV120 = sidebarContent.includes('SOVEREIGN_v.120') || sidebarContent.includes('v.120_SOVEREIGN_ULTIMA');
  console.log(`[AESTHETIC] Sidebar v.120 Marker: ${isV120 ? 'DETECTED' : 'MISSING'}`);

  if (!isV120) {
     console.error('[FAIL] Sidebar rebranding missing v.120 nomenclature.');
  }

  console.log('--- AUDIT COMPLETE ---');
  if (stepCount === 120 && stats.eliteNodeCount === 120000 && isV120) {
    console.log('MISSION_SUCCESS: Ω_EXASCALE_v.120_Grounded.');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

verifyv120().catch(e => {
  console.error('[FATAL] Audit Interrupted:', e);
  process.exit(1);
});
