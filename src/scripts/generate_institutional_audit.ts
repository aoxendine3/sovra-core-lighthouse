import { LegalAgent } from '@/lib/agents/LegalAgent';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * MISSION 10M: INSTITUTIONAL_AUDIT_GENERATION
 * Produces the first high-stakes technical audit for the Billion Dollar Handshake.
 */
async function generateAudit() {
  console.log('--- MISSION 10M: INSTITUTIONAL AUDIT INITIATION ---');
  
  const legal = new LegalAgent();
  const target = 'Binance.us';
  
  const audit = await legal.generateInstitutionalAudit(target);
  
  const outputPath = path.resolve(process.cwd(), 'src/data/proposals/institutional_aegis_audit.md');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, audit);
  
  console.log(`[Audit] SUCCESS: Institutional whitepaper generated for ${target}.`);
  console.log(`[Audit] Path: ${outputPath}`);
  console.log('--- AUDIT COMPLETE ---');
}

generateAudit().catch(err => {
   console.error('Audit Generation Failed:', err);
   process.exit(1);
});
