import { CryptoAgent } from '../agency/lib/agents/CryptoAgent.ts';
import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';
import * as fs from 'fs';
import path from 'path';

/**
 * SEND_BTC_TO_COINBASE (v1.0_APEX)
 * Mandate: Immediate settlement of BTC reserves to the Coinbase Prime node.
 * Pulse: BTC_BRIDGE_IGNITION
 */
async function executeBTCSendPulse() {
  console.log('--- [APEX_BTC_SETTLEMENT_IGNITION] ---');
  console.log('[Phase 1] Probing Institutional BTC Reserve...');

  const cryptoAgent = new CryptoAgent();
  const ledgerPath = path.resolve(process.cwd(), 'src/data/ledger.json');
  
  // 1. Initial State Audit
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  const currentReserve = ledger.liquidAssets.cryptoHoldings;
  
  console.log(`[Reserve] Institutional BTC Balance: $${currentReserve.toLocaleString()}`);

  if (currentReserve <= 0) {
    console.error('[Settlement] ERROR: Null reserve detected. Extraction strike required.');
    process.exit(1);
  }

  // 2. Execute High-Theta Settlement Pulse ($1,000 default)
  const pulseAmount = 1000;
  console.log(`[Settlement] Triggering $${pulseAmount.toLocaleString()} pulse to Coinbase Prime [NODE_LIQUID]...`);

  const result = await cryptoAgent.executeLiquidationStrike(pulseAmount);

  if (result.status === 'LIQUIDATION_SETTLED') {
    console.log('[Settlement] SUCCESS: BTC Bridge verifiably grounded.');

    // 3. Ground in Institutional Ledger (Local Persistence)
    await SOVRADB.logAgentActivity(
      'CryptoAgent',
      `BTC Payout Triggered: $${pulseAmount} to COINBASE_PRIME`,
      'SUCCESS',
      { amount: pulseAmount, node: 'NODE_LIQUID', status: 'SENT_PENDING_CONFIRMATION' }
    );

    // 4. Update Global Truth Ledger
    ledger.entries.unshift({
      timestamp: new Date().toISOString(),
      event: "COINBASE_BTC_SETTLEMENT_STRIKE",
      type: "FULFILLMENT_BRIDGE",
      amountUSD: -pulseAmount,
      status: "SENT",
      memo: "Institutional BTC pulse sent to Coinbase Prime settlement node (NODE_LIQUID)."
    });
    
    // Adjust liquid assets (moving from institutional crypto to "sent" status)
    ledger.liquidAssets.cryptoHoldings -= pulseAmount;
    ledger.lastUpdated = new Date().toISOString();

    fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));
    console.log(`[Ledger] Updated. Remaining Crypto Reserve: $${ledger.liquidAssets.cryptoHoldings.toLocaleString()}`);
  }

  console.log('--- [SETTLEMENT_PULSE_GROUNDED] ---');
}

executeBTCSendPulse().catch(err => {
  console.error('[Settlement] PULSE_FAULT:', err);
  process.exit(1);
});
