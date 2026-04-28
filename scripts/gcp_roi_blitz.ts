import { SOVRAAICore } from '../agency/lib/ai/Ollama.ts';
import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';
import { PSEOAgent } from '../agency/lib/agents/PSEOAgent.ts';
import fs from 'fs/promises';
import path from 'path';

/**
 * GCP ROI Blitz (v120.25)
 * MISSION: EXASCALE_YIELD_GENERATION
 * 
 * Directs the GCP Credit Reserve into high-throughput content generation.
 */

async function executeROIBlitz() {
  console.log('🚀 [GCP_ROI_BLITZ] Igniting Exascale Generation Pulse...');
  
  // 1. Set AI Provider to High-Fidelity GCP Gemini
  process.env.AI_PROVIDER = 'GCP_GEMINI';
  
  const pseo = new PSEOAgent();
  const targets = await pseo.getCompetitiveTargets();
  
  console.log(`📡 [GCP_ROI_BLITZ] Targets Captured: ${targets.length}. Initiating SERIAL generation...`);

  const results = [];
  const batchSize = 1; // Serial execution to stay under 15 RPM quota

  for (let i = 0; i < targets.length; i += batchSize) {
    const batch = targets.slice(i, i + batchSize);
    const batchPromises = batch.map(async (target: any) => {
      const targetName = target.target || 'SOVRA Sovereign';
      const competitorName = target.competitor || 'Standard Platform';
      const keywords = target.keywords || ['luxury', 'ROI', 'exascale', 'security'];

      console.log(`💎 [GCP_ROI_BLITZ] Crafting node: ${target.slug}`);
      
      const prompt = `Generate a high-conversion affiliate comparison article between "${targetName}" and "${competitorName}". 
      Focus on ROI, Security (SOVRA_APEX), and Exascale scaling. 
      Keywords: ${keywords.join(', ')}.
      Format: Markdown with H1, H2, and CTA.`;

      const content = await SOVRAAICore.generate(prompt);
      
      const nodePath = path.join(process.cwd(), `src/content/pseo/${target.slug}.md`);
      await fs.mkdir(path.dirname(nodePath), { recursive: true });
      await fs.writeFile(nodePath, content);

      await SOVRADB.logAgentActivity(
        'GCP_ROI_Blitz',
        `Generated pSEO Node: ${target.slug}`,
        'SUCCESS',
        { target: targetName, provider: 'GCP_GEMINI', creditsApplied: true }
      );

      return { slug: target.slug, status: 'GENERATED' };
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    console.log(`✅ [GCP_ROI_BLITZ] Batch ${i / batchSize + 1} complete. (${results.length}/${targets.length})`);
    
    if (i + batchSize < targets.length) {
      console.log('⏳ [GCP_ROI_BLITZ] Coolant pulse: Waiting 20000ms for quota protection...');
      await new Promise(resolve => setTimeout(resolve, 20000));
    }
  }

  console.log(`🏆 [GCP_ROI_BLITZ] Mission Successful. ${results.length} nodes grounded.`);
}

executeROIBlitz().catch(err => {
  console.error('❌ [GCP_ROI_BLITZ] STRIKE_FAULT:', err);
  process.exit(1);
});
