import { SovereignCreditAgent } from '../src/lib/agents/SovereignCreditAgent';

async function verifyCreditSeeker() {
  console.log('--- [SOVEREIGN_CREDIT_VERIFICATION] INITIATED ---');
  
  const seeker = new SovereignCreditAgent();
  
  try {
    const sources = await seeker.seekNonManualCapital();
    console.log(`[SUCCESS] Identified ${sources.length} No-MME capital gates.`);
    
    for (const source of sources) {
       console.log(`[GATE] ${source.platform} | ${source.type} | Max: ${source.maxAmount}`);
       const memo = await seeker.compileLoanMemo(source.platform);
       console.log(`[MEMO] Generated ${memo.memoId} for ${source.platform}.`);
       
       const proposal = await seeker.generateAutomatedProposal(source.platform, 'src/data/sovra_institutional_detailing.md');
       console.log(`[PROPOSAL_DRAFTED] Autonomous application engineered for ${source.platform}.`);
       console.log('--- PROPOSAL START ---');
       console.log(proposal);
       console.log('--- PROPOSAL END ---');
    }

    console.log('--- [SOVEREIGN_CREDIT_VERIFICATION] COMPLETED ---');
  } catch (error) {
    console.error('[FAILURE] Credit search failed:', error);
    process.exit(1);
  }
}

verifyCreditSeeker();
