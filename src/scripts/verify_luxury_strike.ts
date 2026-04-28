import { CRMAgent, Lead } from '@/lib/agents/CRMAgent';
import { WealthAgent } from '@/lib/agents/WealthAgent';
import { promises as fs } from 'fs';
import path from 'path';

async function verifyLuxuryStrike() {
  console.log('--- STARTING LUXURY STRIKE VERIFICATION ---');
  const crm = new CRMAgent();
  const wealth = new WealthAgent();
  const audiencePath = path.resolve(process.cwd(), 'src/data/audience.json');

  // 1. Simulate VHNW Lead
  console.log('[Verify] Testing VHNW Lead Detection...');
  const testLead: Lead = {
    id: 'TEST-LEAD-001',
    email: 'wealthy_client@vault.com',
    name: 'Sovereign Security Inquiry',
    timestamp: Date.now(),
    status: 'active'
  };

  await fs.writeFile(audiencePath, JSON.stringify([testLead], null, 2));
  await crm.processLeads();
  
  const audience = JSON.parse(await fs.readFile(audiencePath, 'utf8'));
  if (audience[0].status === 'vhnw') {
    console.log('[Verify] SUCCESS: VHNW Lead correctly tagged.');
  } else {
    console.error('[Verify] FAILED: VHNW tagging failed.');
  }

  // 2. Test Wealth Reconciliation
  console.log('[Verify] Testing Luxury Revenue Reconciliation...');
  const result = await wealth.recordEntry(5000, 'LUXURY_AFFILIATE: Keystone Premium Batch');
  
  const ledger = JSON.parse(await fs.readFile(path.resolve(process.cwd(), 'src/data/ledger.json'), 'utf8'));
  if (ledger.luxuryRevenue > 0) {
    console.log(`[Verify] SUCCESS: Luxury Revenue recorded: $${ledger.luxuryRevenue}`);
  } else {
    console.error('[Verify] FAILED: Luxury revenue tracking failed.');
  }

  console.log('--- LUXURY STRIKE VERIFICATION COMPLETE ---');
}

verifyLuxuryStrike().catch(console.error);
