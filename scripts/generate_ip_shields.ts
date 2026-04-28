import { LegalAgent } from '../src/lib/agents/LegalAgent';
import fs from 'fs/promises';
import path from 'path';

async function generateIPShielding() {
  console.log('--- [PHASE 1: IP_SHIELDING] INITIATED ---');
  const legal = new LegalAgent();
  
  const products = [
    { name: 'Sovereign Prompt Engineer', category: 'Instructional Intellectual Property' },
    { name: 'SOVRA_APEX Framework', category: 'Operational Infrastructure Architecture' },
    { name: 'SOVRA Sovereign Command Layer', category: 'Artificial Intelligence Orchestration' }
  ];

  let shieldContent = '# SOVRA_APEX Institutional IP Shielding Report\n\n';
  shieldContent += `**Date**: ${new Date().toISOString()}\n`;
  shieldContent += '**Status**: SHIELDED / SOVEREIGN_PROTECTED\n\n';

  for (const product of products) {
    console.log(`[LegalAgent] Auditing: ${product.name}...`);
    
    // 1. Trademark Sweep
    const sweep = await legal.performTrademarkSweep(product.name);
    shieldContent += `## Asset: ${product.name}\n`;
    shieldContent += `- **Category**: ${product.category}\n`;
    shieldContent += `- **Trademark Status**: ${sweep.cleared ? 'CLEARED' : 'PENDING_REVIEW'} (${sweep.riskLevel})\n`;
    shieldContent += `- **Recommendation**: ${sweep.recommendation}\n\n`;

    // 2. Institutional Audit / Patent Draft
    const audit = await legal.generateInstitutionalAudit(product.name);
    shieldContent += `### Institutional Audit & Patent Draft\n\n${audit}\n\n---\n\n`;
  }

  const outDir = path.join(process.cwd(), 'src/data/proposals');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'product_ip_shields.md'), shieldContent);

  console.log(`[SUCCESS] IP Shields generated at src/data/proposals/product_ip_shields.md`);
  console.log('--- [PHASE 1: IP_SHIELDING] COMPLETED ---');
}

generateIPShielding().catch(console.error);
