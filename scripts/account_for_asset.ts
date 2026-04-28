import { WealthAgent } from '../src/lib/agents/WealthAgent';
import fs from 'fs/promises';
import path from 'path';

async function accountForAsset() {
  console.log('--- [PROD_ACCOUNTING] INITIATED ---');
  const agent = new WealthAgent();

  // The $1.00 asset was generated through the Sovereign Funnel verification.
  // We must now process it through the WealthAgent for institutional allocation.
  
  console.log('[WealthAgent] Processing $1.00 Asset for allocation...');
  const result = await agent.recordEntry(1.00, 'VERIFICATION_SALE: Sovereign Prompt Engineer Institutional Funnel');

  if (result.status === 'SUCCESS') {
    console.log(`[SUCCESS] $1.00 Asset Accounted. Entry ID: ${result.entryId}`);
    
    // Verify the ledger state
    const ledgerPath = path.join(process.cwd(), 'src/data/ledger.json');
    const ledger = JSON.parse(await fs.readFile(ledgerPath, 'utf8'));
    
    console.log(`[AUDIT] Current Gross Revenue: $${ledger.grossRevenue}`);
    console.log(`[AUDIT] Growth Fund Allocation: $${ledger.growthFund}`);
  } else {
    console.error('[FAILURE] Accounting failed.');
  }

  console.log('--- [PROD_ACCOUNTING] COMPLETED ---');
}

accountForAsset().catch(console.error);
