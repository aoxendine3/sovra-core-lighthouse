import { run_command } from '../src/lib/utils/run_command'; // hypothetical import or directly exec
import { exec } from 'child_process';
import path from 'path';

/**
 * GLOBAL WEALTH PULSE IGNITION 🏛️⚡
 * Mandate: Execute the authorized autonomous loop for SOVRA Sovereign LLC.
 */

async function ignite() {
  console.log('--- [IGNITION_SEQUENCE_START] ---');
  console.log('[System] Identity: SOVRA Sovereign LLC');
  console.log('[System] Protocol: GLOBAL_WEALTH_PULSE');
  console.log('[System] Authorization: GRANTED BY OWNER');

  const execPath = path.resolve(process.cwd(), 'agency/MaxxExec.ts');
  
  console.log(`\n[Ignition] Spawning SOVRA Executive Node: ${execPath}`);
  
  // Using tsx to run the standalone executive
  const child = exec(`npx tsx ${execPath}`);

  child.stdout?.on('data', (data) => {
    process.stdout.write(`[APEX_EXEC] ${data}`);
  });

  child.stderr?.on('data', (data) => {
    process.stderr.write(`[APEX_ERROR] ${data}`);
  });

  child.on('close', (code) => {
    console.log(`\n[Ignition] SOVRA Node Detached. Exit Code: ${code}`);
  });
}

ignite().catch(console.error);
