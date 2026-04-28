import 'dotenv/config';
import { jwtVerify, type JWTPayload } from 'jose';
import { timingSafeEqual, createHash } from 'node:crypto';
import { SOVRADB } from '../../../sovra/core/db/SOVRADB';

/**
 * SOVRA_APEX: HYPER-SOVEREIGN PROTOCOL (v15.0_Ω)
 * Standard: Ultra-Secure (0.01% Institutional Implementation)
 */

// 1. Immutable Sovereign Constants
const IDENTITY_RAW = 'SOVRA_APEX';
const IDENTITY_HASH = createHash('sha512').update(IDENTITY_RAW).digest();
const ALGORITHM = 'HS256' as const;

// 2. Entropy Enforcement
const RAW_SECRET = process.env.HANDSHAKE_SECRET || process.env.JWT_SECRET || process.env.INTERNAL_API_SECRET || process.env.NEXT_PUBLIC_INTERNAL_API_SECRET || 'Ω_SOVRA_QUANTUM_FINALITY';
if (!RAW_SECRET || RAW_SECRET.length < 32) {
  throw new Error('[SOVRA_APEX] FATAL: HANDSHAKE_SECRET lacks sufficient entropy for institutional deployment.');
}
const K_PRIME = new TextEncoder().encode(RAW_SECRET);

interface SOVRAPayload extends JWTPayload {
  sovereign: string;
  jti: string; // Atomic Identifier
  iat: number; // Issued At
}

/**
 * validateHandshake: Convenience helper for API request validation.
 */
export async function validateHandshake(req: Request | { headers: { get: (n: string) => string | null } }): Promise<boolean> {
  const token = req.headers.get('X-SOVRA-DEEP-LOCK') || '';
  const origin = req.headers.get('origin') || 'SOVEREIGN_NODE';
  
  // v15.0: Direct Deep Lock JWT Verification
  return await verifyDeepLockHash(token, origin);
}

/**
 * verifyDeepLockHash: The Final Guardian (SOVRA_APEX Implementation)
 */
export async function verifyDeepLockHash(token: string, _origin?: string): Promise<boolean> {
  if (!token || typeof token !== 'string' || token.length > 2048) return false;

  try {
    // A. Cryptographic Verification
    const { payload } = await jwtVerify<SOVRAPayload>(token, K_PRIME, {
      algorithms: [ALGORITHM],
      requiredClaims: ['exp', 'jti', 'sovereign', 'iat'],
      clockTolerance: 0,
    });

    // B. Cloud Replay Defense: The Ledger Check
    const isReplayed = await SOVRADB.isJTIProcessed(payload.jti);
    if (isReplayed) {
      console.error(`[SOVRA_APEX] CRITICAL: Replay attack detected on JTI: ${payload.jti}`);
      return false;
    }
    
    // Anchor the JTI in the ledger
    await SOVRADB.registerJTI(payload.jti, payload.exp!);

    // C. Double-Blind Identity Validation
    const incomingHash = createHash('sha512').update(payload.sovereign).digest();
    return timingSafeEqual(incomingHash, IDENTITY_HASH);

  } catch (err: any) {
    console.error(`[SOVRA_APEX] SECURITY_EVENT: ${err?.code || 'CRYPTOGRAPHIC_FAULT'}`);
    return false;
  }
}
