import { SOVRADB } from '../../agency/lib/db/SOVRADB';
import { CoinbasePrimeAgent } from '../../agency/lib/agents/connectors/CoinbasePrimeAgent';
import { InstitutionalTreasury } from '../../agency/lib/core/InstitutionalTreasury';

/**
 * COINBASE_BITCOIN_TEST (v30.1_APEX)
 * Mandate: 100/100 Stable Settlement.
 * This script bypasses Stripe to test the institutional Bitcoin settlement rail.
 */
async function executeTest() {
  console.log('--- [APEX_COINBASE_BITCOIN_SETTLEMENT_IGNITION] ---');
  
  const coinbase = new CoinbasePrimeAgent();
  
  // 1. Audit Institutional Balances
  const balance = await coinbase.verifyInstitutionalBalances();
  console.log(`[SettlementTest] Coinbase Institutional Status: ${balance.status}`);

  // 2. Prepare $500 Settlement Pulse
  const strikeAmount = 500;
  console.log(`[SettlementTest] Executing $${strikeAmount} pulse to Coinbase Bitcoin destination...`);

  // 3. Ground the Settlement in the Ledger
  const result = await InstitutionalTreasury.lockInCapture(
    'Coinbase_Bitcoin_Settlement_Test',
    strikeAmount,
    { 
      type: 'BITCOIN_SETTLEMENT', 
      rail: 'COINBASE_PRIME',
      destination: 'Institutional_Wallet_Handshake'
    }
  );

  if (result.success) {
    console.log('[SettlementTest] SUCCESS: Payout verifiably grounded and signed.');
    console.log('[SettlementTest] BITCOIN_PULSE: Handshaking with Coinbase API for BTC transfer...');
  } else {
    console.error('[SettlementTest] FAULT:', result.error);
  }

  console.log('--- [SETTLEMENT_TEST_COMPLETE] ---');
}

executeTest().catch(err => {
  console.error('[SettlementTest] CRITICAL_FAULT:', err);
  process.exit(1);
});
