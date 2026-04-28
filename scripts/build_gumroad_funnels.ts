import { GumroadAgent } from '../sovra/core/agents/GumroadAgent';
import fs from 'fs/promises';
import path from 'path';

async function buildGrumroadFunnels() {
  console.log('--- [PHASE 2: FUNNEL_ENGINEERING] INITIATED ---');
  const agent = new GumroadAgent();

  console.log('[GumroadAgent] Engineering full 3-tier funnel for SOVRA_APEX Enterprise...');
  const funnel = await agent.buildFullFunnel();

  const outDir = path.join(process.cwd(), 'src/data');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'ready_funnels.json'), JSON.stringify(funnel, null, 2));

  console.log(`[SUCCESS] Full funnel generated and saved to src/data/ready_funnels.json`);
  console.log('--- [PHASE 2: FUNNEL_ENGINEERING] COMPLETED ---');
}

buildGrumroadFunnels().catch(console.error);
