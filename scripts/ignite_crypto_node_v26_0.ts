import { SovereignSecurityAgent } from '../agency/lib/agents/security/SovereignSecurityAgent.ts';
import { SOVRADB } from '../agency/lib/db/SOVRADB.ts';

/**
 * IGNITE_CRYPTO_NODE (v26.0)
 * Mandate: Absolute Integrity.
 * MISSION: CRYPTOGRAPHIC_ANCHORING
 */

async function igniteCryptoNode() {
  console.log('--- [APEX_CRYPTO_IGNITION_PULSE] ---');
  
  // 1. Generate Root Key (Root of Trust)
  const publicKey = await SovereignSecurityAgent.generateRootKey();
  
  const db = await SOVRADB.getInstance();
  
  // 2. Retro-sign Revenue Ledger
  console.log('[Security] Retro-signing revenue tranches for immutability...');
  const revenue = await db.all('SELECT * FROM sovra_revenue WHERE signature_hash IS NULL');
  
  for (const row of revenue) {
    const payload = { source: row.source, gross: row.gross_amount, net: row.net_amount, timestamp: row.timestamp };
    const signature = await SovereignSecurityAgent.signTransaction(payload);
    
    await db.run('UPDATE sovra_revenue SET signature_hash = ? WHERE id = ?', [signature, row.id]);
  }
  
  // 3. Retro-sign Agent Logs
  console.log('[Security] Retro-signing agent audit logs...');
  const logs = await db.all('SELECT * FROM sovra_agent_logs WHERE signature_hash IS NULL');
  
  for (const row of logs) {
    const payload = { agent: row.agent_name, activity: row.activity, status: row.status, metadata: row.metadata, timestamp: row.timestamp };
    const signature = await SovereignSecurityAgent.signTransaction(payload);
    
    await db.run('UPDATE sovra_agent_logs SET signature_hash = ? WHERE id = ?', [signature, row.id]);
  }
  
  console.log(`[Security] SUCCESS: ${revenue.length + logs.length} tranches verifiably anchored.`);
  console.log('--- [CRYPTO_NODE_GROUNDED] ---');
}

igniteCryptoNode().catch(err => {
  console.error('[Security] IGNITION_FAULT:', err);
  process.exit(1);
});
