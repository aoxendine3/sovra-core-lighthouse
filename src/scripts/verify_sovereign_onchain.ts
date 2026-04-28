import { DexService } from '@/lib/auth/DexService';
import { WorldLibertyAgent } from '@/lib/agents/WorldLibertyAgent';

/**
 * PROJECT SOVEREIGN ON-CHAIN: Verification Pulse
 * Verifies location-blind trading and WLFI ecosystem intelligence.
 */
async function verifySovereignOnChain() {
  console.log('--- STARTING PROJECT SOVEREIGN ON-CHAIN VERIFICATION ---');
  
  const dex = new DexService();
  const wlfi = new WorldLibertyAgent();

  // 1. Jupiter Connectivity Check
  console.log('[Verify] Testing Jupiter (Solana) Quote Connectivity...');
  const solQuote = await dex.getJupiterQuote(
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    'So11111111111111111111111111111111111111112', // SOL
    1000000 // 1 USDC
  );

  if ((solQuote as any).inputMint) {
     console.log('[Verify] SUCCESS: Jupiter quote retrieved. Location-blind gateway active.');
  } else {
     console.error('[Verify] ALERT: Jupiter connectivity degraded.');
  }

  // 2. WLFI Signal Check
  console.log('[Verify] Testing WLFI Ecosystem Intelligence...');
  const signal = await wlfi.scanWLFISignals();
  console.log(`[Verify] WLFI Momentum: ${signal.momentum}`);
  console.log(`[Verify] Active Proposals: ${signal.governance.activeProposals}`);

  console.log('--- SOVEREIGN VERIFICATION COMPLETE ---');
}

verifySovereignOnChain().catch(err => {
   console.error('Sovereign Verification Failed:', err);
   process.exit(1);
});
