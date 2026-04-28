import { Worker } from 'worker_threads';
import { InstitutionalTreasury } from '../../agency/lib/core/InstitutionalTreasury';
import { SOVRADB } from '../../agency/lib/db/SOVRADB';
import path from 'path';
import os from 'os';

/**
 * SOVEREIGN_HIVE (v40.4_REALITY)
 * Mandate: Physical Execution of the Hive Swarm.
 * PURGE: Removed the 100,000 worker simulation multiplier.
 * REALITY: Spawns real worker threads based on CPU capacity.
 */
async function igniteHive() {
  console.log('--- [APEX_SOVEREIGN_HIVE_IGNITION_REALITY] ---');
  
  const workerCount = os.cpus().length; // Scale to physical hardware limit
  const mastery = 10;
  
  console.log(`[Hive] REIFICATION: Spawning ${workerCount} physical worker threads...`);
  console.log(`[Hive] REALITY_PURGE: Simulation multiplier (100,000) verifiably destroyed.`);

  const workers: Worker[] = [];

  for (let i = 0; i < workerCount; i++) {
    const worker = new Worker(path.resolve(__dirname, '../../agency/lib/core/HiveWorker.ts'), {
      workerData: { workerId: i, mastery }
    });

    worker.on('message', async (msg) => {
      if (msg.type === 'STRIKE_IDENTIFIED') {
        console.log(`[Hive] STRIKE_SIGNAL: Worker_${msg.workerId} identified $${msg.amount.toFixed(4)}`);
        
        // Ground the finding in the signed ledger
        await InstitutionalTreasury.lockInCapture(
          `Hive_Strike_Worker_${msg.workerId}`,
          msg.amount,
          { 
            type: 'HIVE_STRIKE', 
            reality: 'PHYSICAL_THREAD_IGNITION',
            signature_v: '26.0' 
          }
        );
      }
    });

    worker.on('error', (err) => console.error(`[Hive] WORKER_FAULT_${i}:`, err));
    workers.push(worker);
  }

  // Monitor total output
  setInterval(async () => {
    const stats = await SOVRADB.getEnterpriseStats();
    console.log(`[Hive] HEARTBEAT: Total Scured: $${stats.grossRevenue.toFixed(2)} | Threads: ${workerCount}`);
  }, 10000);
}

igniteHive().catch(err => {
  console.error('[Hive] CRITICAL_FAULT:', err);
  process.exit(1);
});
