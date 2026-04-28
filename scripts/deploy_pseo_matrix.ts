import { PSEOAgent } from '../src/lib/agents/PSEOAgent';

async function deployPSEOMatrix() {
  console.log('--- [PSEO_MATRIX_DEPLOYMENT] INITIATED ---');
  const agent = new PSEOAgent();

  try {
    const targets = await agent.getCompetitiveTargets();
    console.log(`[PSEO] Found ${targets.length} targets in index.`);

    for (const target of targets) {
      console.log(`[PSEO] Processing: ${target.competitor} vs ${target.target}...`);
      await agent.generateComparisonNode(target);
    }

    console.log('--- [PSEO_MATRIX_DEPLOYMENT] COMPLETED ---');
  } catch (error) {
    console.error('[PSEO_FAIL] Deployment aborted:', error);
    process.exit(1);
  }
}

deployPSEOMatrix();
