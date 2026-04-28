import { SOVRASingularityShield } from '../agency/lib/security/SOVRASingularityShield.ts';
import * as fs from 'fs';
import path from 'path';

/**
 * SINGULARITY_LOCK_IGNITION (v50.0)
 * Mandate: Absolute Defensive Sovereignty.
 * Task: Encrypt the Sovereign Ledger in a hardware-bound vault.
 */
async function igniteSingularity() {
  console.log('--- [APEX_SINGULARITY_LOCK_IGNITION] ---');
  console.log('[Phase 1] Capturing System Entropy for Shield Generation...');

  const ledgerPath = path.resolve(process.cwd(), 'src/data/ledger.json');
  const vaultPath = path.resolve(process.cwd(), 'src/data/ledger.vault');

  if (!fs.existsSync(ledgerPath)) {
    console.error('[Singularity] FAULT: Ledger not found. Ignition aborted.');
    process.exit(1);
  }

  const rawData = fs.readFileSync(ledgerPath, 'utf8');
  
  console.log('[Singularity] Executing Double-Blind Hardware Handshake...');
  const vaultData = await SOVRASingularityShield.pulseEncrypt(rawData);

  // 1. Write the Shielded Vault
  fs.writeFileSync(vaultPath, vaultData);
  
  // 2. Shred the Raw Evidence (In production, we delete the plaintext)
  // fs.unlinkSync(ledgerPath);

  console.log('[Singularity] SUCCESS: The Sovereign Ledger is now shielded in a hardware-bound vault.');
  console.log(`[Singularity] VAULT_LOCATION: ${vaultPath}`);
  console.log('[Singularity] DECRYPTION_MANDATE: Only this machine can open this file.');

  console.log('--- [SINGULARITY_SATURATED] ---');
}

igniteSingularity().catch(err => {
  console.error('[Singularity] IGNITION_FAULT:', err);
  process.exit(1);
});
