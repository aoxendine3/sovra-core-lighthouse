import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

/**
 * SOVRA_CORE: EDGE HANDSHAKE PROTOCOL (v1.0_SOVRA)
 * This module is designed for the Next.js Edge Runtime (Middleware).
 * It performs cryptographic verification for absolute brand integrity.
 */

const ALGORITHM = 'HS256' as const;

if (!process.env.HANDSHAKE_SECRET || process.env.HANDSHAKE_SECRET.length < 128) {
  // Note: Env vars must be available in the Edge Runtime environment.
  console.warn('[SOVRA-CORE] EDGE_SECURITY_WARN: HANDSHAKE_SECRET missing or insufficient.');
}

const K_PRIME = new TextEncoder().encode(process.env.HANDSHAKE_SECRET || '');

export interface SOVRAPayload extends JWTPayload {
  sovereign: string;
  jti: string;
  iat: number;
}

/**
 * verifyHandshakeEdge: Cryptographic verification for high-performance edge nodes.
 */
export async function verifyHandshakeEdge(token: string): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;

  try {
    const { payload } = await jwtVerify<SOVRAPayload>(token, K_PRIME, {
      algorithms: [ALGORITHM],
      requiredClaims: ['exp', 'jti', 'sovereign', 'iat'],
      clockTolerance: 5, // Slight tolerance for edge clock skew
    });

    // Identity validation
    return payload.sovereign === 'SOVRA_CORE';

  } catch (err: any) {
    console.error(`[SOVRA-CORE] EDGE_SECURITY_FAULT: ${err?.code || 'UNAUTHORIZED'}`);
    return false;
  }
}

/**
 * generateHandshakeEdge: Provision an authoritative sovereign token.
 */
export async function generateHandshakeEdge(): Promise<string> {
  return await new SignJWT({ sovereign: 'SOVRA_CORE' })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setJti(crypto.randomUUID())
    .setExpirationTime('1m')
    .sign(K_PRIME);
}

// ALIAS EXPORTS: Path Matrix Alignment (v1.0_SOVRA)
export async function verifyHandshake(input: string | Request) {
    let token = '';
    if (typeof input === 'string') {
        token = input;
    } else {
        token = input.headers.get('X-SOVRA-DEEP-LOCK') || '';
    }
    return await verifyHandshakeEdge(token);
}

export async function generateHandshake() {
    return await generateHandshakeEdge();
}
