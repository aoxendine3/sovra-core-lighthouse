import { LegalAgent } from '@/lib/agents/LegalAgent';
import fs from 'fs/promises';
import path from 'path';

/**
 * PROJECT ENTERPRISE AEGIS: Pitch Generation
 * Harnessing local AI to engineer high-stakes security proposals.
 */
async function generateBinancePitch() {
  console.log('--- STARTING ENTERPRISE PROPOSAL GENERATION ---');
  
  const legal = new LegalAgent();
  const target = 'Binance (CTO Office)';
  
  const proposal = await legal.generateEnterpriseProposal(target, 'SOVRA Titan Vault + Predictive Shield');

  const outputPath = path.join(process.cwd(), 'src/data/proposals/binance_aegis_pitch.md');
  const dirPath = path.dirname(outputPath);

  try {
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(outputPath, proposal);
    console.log(`[AegisEngine] PROPOSAL DEPLOYED: ${outputPath}`);
  } catch (err) {
    console.error('Failed to save proposal:', err);
  }

  console.log('--- GENERATION COMPLETE ---');
}

generateBinancePitch().catch(err => {
  console.error('Pitch Generation Failed:', err);
  process.exit(1);
});
