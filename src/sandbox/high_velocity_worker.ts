import { SOVRADB } from '../../sovra/core/db/SOVRADB.ts';
import { SovereignKernel } from '../lib/kernel/SovereignKernel.ts';
import fs from 'fs';
import path from 'path';

/**
 * HIGH-VELOCITY SANDBOX WORKER (v1.0_SOVRA_APEX)
 * Mandate: 10x Operational Speed.
 * 
 * This worker executes marketing, lead generation, and asset 
 * saturation in a rapid-fire loop to achieve maximum results 
 * in minimum time.
 */
async function runHighVelocityLoop() {
  console.log('--- SOVRA APEX: HIGH-VELOCITY SANDBOX INITIATED ---');
  const kernel = new SovereignKernel();
  
  const csvPath = path.resolve(process.cwd(), 'shopify_import.csv');
  const rawData = fs.readFileSync(csvPath, 'utf8');
  const products = rawData.split('\n').slice(1).filter(l => l.trim() !== '');

  // 10x SPEED LOOP: Executing multiple tranches per cycle
  for (let i = 0; i < 10; i++) {
    console.log(`[HighVelocity] CYCLE_${i+1}: Executing Parallel Ingress...`);
    
    // Select 3 products for rapid-fire saturation
    const selection = products.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    await Promise.all(selection.map(async (p) => {
      const handle = p.split(',')[0];
      await kernel.runCampaign(`RAPID_SATURATION_${handle}`, {
        priority: 'ULTIMA',
        velocity: '10X',
        mode: 'SANDBOX_LIVE_FIRE',
        signature: 'SIG_sovra_high_velocity'
      });
    }));

    // Reduced sleep for "10x speed"
    await new Promise(r => setTimeout(r, 500)); 
  }

  console.log('--- HIGH-VELOCITY SANDBOX PULSE COMPLETE ---');
}

runHighVelocityLoop().catch(e => console.error('[HighVelocity] FATAL_FAULT:', e));
