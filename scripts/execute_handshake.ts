import { SovereignCreditAgent } from '../src/lib/agents/SovereignCreditAgent';

async function executeHandshake() {
  console.log('--- [SOVEREIGN_HANDSHAKE_EXECUTION] INITIATED ---');
  
  const seeker = new SovereignCreditAgent();
  const platforms = [
    'Aave V3 (Arbitrum)',
    'SBA 7(a) Growth Loan',
    'NVIDIA Inception',
    'Dolomite (Apex Sync)',
    'BlueVine Venture Credit'
  ];

  try {
    await seeker.executeSovereignHandshake(platforms);
    console.log('--- [SOVEREIGN_HANDSHAKE_EXECUTION] COMPLETED ---');
  } catch (error) {
    console.error('[FAILURE] Handshake execution failed:', error);
    process.exit(1);
  }
}

executeHandshake();
