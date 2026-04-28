import { generateDeepLock, validateDeepLock } from '../../agency/lib/auth/DeepLock';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local manually for the script context
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

/**
 * Handshake v10.4 Test Pulse
 * Mission: Verifiably confirm the NIZKP Ed25519 Handshake logic.
 */
async function testPulse() {
  console.log('--- EXECUTING APEX SOVEREIGN HANDSHAKE PULSE (v10.4) ---');
  
  const method = 'GET';
  const url = 'https://sovra.apex/api/admin/status';
  
  console.log(`[Pulse] Scenario: ${method} ${url}`);
  
  // 1. GENERATE PROOF
  const proof = await generateDeepLock(method, url);
  if (!proof) {
    console.error('[FAILED] Proof generation collapsed. Check environment keys.');
    process.exit(1);
  }
  
  console.log(`[Pulse] Proof Generated: sig=${proof.sig.substring(0, 10)}... (t=${proof.t})`);
  
  // 2. CONSTRUCT MOCK REQUEST
  const mockRequest = {
    method,
    url,
    headers: new Map([
      ['X-APEX-PROOF', proof.sig],
      ['X-APEX-R', proof.r],
      ['X-APEX-T', proof.t]
    ]),
    // Helper to simulate the Request object properties needed by validateDeepLock
    get(name: string) {
       return this.headers.get(name);
    }
  } as any;

  // 3. VALIDATE PROOF
  const isValid = await validateDeepLock(mockRequest);
  
  if (isValid) {
    console.log('[SUCCESS] Institutional Sovereign Handshake Verified. 100/100 Grounded Truth.');
  } else {
    console.error('[FAILED] Asymmetric proof verification failed. Handshake collapsed.');
    process.exit(1);
  }
}

testPulse().catch(err => {
  console.error('[CRITICAL_FAULT] Pulse Execution Collapsed:', err);
});
