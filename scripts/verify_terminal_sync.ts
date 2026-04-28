import { CryptoAgent } from '../src/lib/agents/CryptoAgent';

async function verifyTerminalSync() {
  console.log('--- NEURAL TERMINAL (ANT v1) SYNC VERIFICATION ---');
  const crypto = new CryptoAgent();
  
  try {
    const data = await crypto.streamNeuralTerminalData();
    console.log('[SUCCESS] Data Pipe Operational.');
    console.log(`[DATA] Timestamp: ${data.timestamp}`);
    console.log(`[DATA] Primary Asset: ${data.principal.symbol} @ $${data.principal.price}`);
    console.log(`[DATA] Confidence Matrix Size: ${data.matrix.length} nodes`);
    console.log(`[DATA] Institutional Balance: $${data.vault.balance.toLocaleString()}`);
    
    if (data.confidence >= 90) {
      console.log('[AUDIT] High-Confidence Signal captured. Verification: APEX.');
    } else {
      console.warn('[AUDIT] Signal confidence degraded. Adjusting heuristic weights...');
    }
  } catch (error) {
    console.error('[FAILURE] Data Pipe Collapsed:', error);
    process.exit(1);
  }
}

verifyTerminalSync();
