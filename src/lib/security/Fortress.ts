/**
 * AURVANT v19.2 "FORTRESS ELITE" - Unitary Security Module with Redis Replay Protection
 * Proprietary Intellectual Property of Anthony Junior Oxendine
 */

import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { Redis } from '@upstash/redis';
import { z } from 'zod';
import { fortressRateLimit } from './ratelimit';

// ──────────────────────────────────────────────────────────────
// CONFIGURATION
// ──────────────────────────────────────────────────────────────
const ALGORITHM = 'Ed25519' as const;
const MAX_DRIFT_MS = 2500;
const TOKEN_LIFETIME_SECONDS = 45;

const HANDSHAKE_HEADER = 'X-AURVANT-FORTRESS-LOCK';
const PUBKEY_HEADER = 'X-AURVANT-EPHEMERAL-PUBKEY';
const CHALLENGE_HEADER = 'X-AURVANT-CHALLENGE-NONCE';
const SERVER_TIME_HEADER = 'X-AURVANT-SERVER-TIME';

const ENABLE_CHALLENGE_MODE = true;
const DEFAULT_TO_SESSION_LEVEL = true;

const REDIS_PREFIX = process.env.AURVANT_REDIS_PREFIX || 'aurvant:fortress:jti:';

// Initialize Redis (falls back gracefully if env vars missing)
let redis: Redis | null = null;
try {
  redis = Redis.fromEnv(); // Automatically uses UPSTASH_REDIS_REST_URL + TOKEN
} catch {
  console.warn('⚠️ Upstash Redis not configured – falling back to in-memory JTI store (dev only)');
}

// In-memory fallback
const usedJTIs = new Map<string, number>();

function cleanupJTIs() {
  const now = Date.now();
  for (const [jti, exp] of usedJTIs.entries()) {
    if (exp < now) usedJTIs.delete(jti);
  }
}

// Strong fingerprint
async function getClientFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return 'server-node';
  const ua = navigator.userAgent;
  const screen = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
  let canvasHash = '';
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#f00';
      ctx.fillText('AURVANT_FORTRESS', 2, 2);
      canvasHash = btoa(canvas.toDataURL('image/png')).slice(0, 24);
    }
  } catch {}
  return btoa(`${ua}|${screen}|${canvasHash}`).slice(0, 48);
}

// ──────────────────────────────────────────────────────────────
// LONG-LIVED KEY UTILITY (Hybrid Fallback)
// ──────────────────────────────────────────────────────────────
export async function generateLongLivedKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    { name: ALGORITHM, namedCurve: 'Ed25519' } as any,
    true,
    ['sign', 'verify']
  );
  const privJwk = await crypto.subtle.exportKey('jwk', keyPair.privateKey);
  const pubJwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);
  return {
    privateKeyBase64: btoa(JSON.stringify(privJwk)),
    publicKeyBase64: btoa(JSON.stringify(pubJwk)),
  };
}

// ──────────────────────────────────────────────────────────────
// EPHEMERAL / SESSION KEY MANAGEMENT
// ──────────────────────────────────────────────────────────────
let sessionKeyPair: CryptoKeyPair | null = null;

async function getOrCreateSessionKeyPair(): Promise<CryptoKeyPair> {
  if (sessionKeyPair) return sessionKeyPair;
  sessionKeyPair = await crypto.subtle.generateKey(
    { name: ALGORITHM, namedCurve: 'Ed25519' } as any,
    true,
    ['sign', 'verify']
  );
  return sessionKeyPair;
}

async function exportPublicKeyBase64(key: CryptoKey): Promise<string> {
  const jwk = await crypto.subtle.exportKey('jwk', key);
  return btoa(JSON.stringify(jwk));
}

// ──────────────────────────────────────────────────────────────
// CLIENT: Generate Fortress Lock
// ──────────────────────────────────────────────────────────────
export interface GenerateOptions {
  useSessionLevel?: boolean;
  challengeNonce?: string;
}

export async function generateFortressLock(options: GenerateOptions = {}): Promise<{
  lock: string;
  ephemeralPubKey: string;
}> {
  const { useSessionLevel = DEFAULT_TO_SESSION_LEVEL, challengeNonce } = options;

  const keyPair = useSessionLevel
    ? await getOrCreateSessionKeyPair()
    : await crypto.subtle.generateKey(
        { name: ALGORITHM, namedCurve: 'Ed25519' } as any,
        true,
        ['sign', 'verify']
      );

  const publicKeyBase64 = await exportPublicKeyBase64(keyPair.publicKey);
  const privateKey = keyPair.privateKey;

  const fingerprint = await getClientFingerprint();
  const jti = crypto.randomUUID();

  const payload: JWTPayload = {
    jti,
    iss: 'aurvant-client',
    aud: 'aurvant-assets',
    fingerprint,
    ...(challengeNonce && { nonce: challengeNonce }),
  };

  const lock = await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(TOKEN_LIFETIME_SECONDS)
    .sign(privateKey);

  return { lock, ephemeralPubKey: publicKeyBase64 };
}

// ──────────────────────────────────────────────────────────────
// SERVER: Hardened Verification with Redis JTI Check
// ──────────────────────────────────────────────────────────────
export interface HandshakeResult {
  valid: boolean;
  payload?: JWTPayload;
  error?: string;
}

export async function verifyFortressLock(
  lock: string,
  pubKeyB64: string,
  challengeNonce?: string
): Promise<HandshakeResult> {
  let fingerprint = 'unknown';
  try {
    const publicJwk = JSON.parse(atob(pubKeyB64));
    const publicKey = await crypto.subtle.importKey(
      'jwk',
      publicJwk,
      { name: ALGORITHM, namedCurve: 'Ed25519' } as any,
      true,
      ['verify']
    );

    const { payload } = await jwtVerify(lock, publicKey, {
      algorithms: [ALGORITHM],
      issuer: 'aurvant-client',
      audience: 'aurvant-assets',
    });

    fingerprint = (payload.fingerprint as string) || 'unknown';

    // Drift check
    const iat = (payload.iat || 0) * 1000;
    if (Math.abs(Date.now() - iat) > MAX_DRIFT_MS) {
      await fortressRateLimit.limit(fingerprint);
      return { valid: false, error: 'CLOCK_SKEW_DETECTED' };
    }

    // Challenge check
    if (ENABLE_CHALLENGE_MODE && challengeNonce && (payload as any).nonce !== challengeNonce) {
      await fortressRateLimit.limit(fingerprint);
      return { valid: false, error: 'CHALLENGE_MISMATCH' };
    }

    const jti = payload.jti as string;
    if (!jti) {
      await fortressRateLimit.limit(fingerprint);
      return { valid: false, error: 'MISSING_JTI' };
    }

    const redisKey = `${REDIS_PREFIX}${jti}`;

    // Atomic check + set with TTL (best practice for replay protection)
    let isReplay = false;
    if (redis) {
      // Use SET with NX (set if not exists) + EX (seconds TTL)
      const setResult = await redis.set(redisKey, '1', { nx: true, ex: TOKEN_LIFETIME_SECONDS + 10 });
      isReplay = setResult === null; // null means key already existed
    } else {
      // In-memory fallback
      cleanupJTIs();
      isReplay = usedJTIs.has(jti);
      if (!isReplay) {
        usedJTIs.set(jti, Date.now() + (TOKEN_LIFETIME_SECONDS + 10) * 1000);
      }
    }

    if (isReplay) {
      await fortressRateLimit.limit(fingerprint);
      return { valid: false, error: 'REPLAY_DETECTED' };
    }

    return { valid: true, payload };
  } catch {
    await fortressRateLimit.limit(fingerprint);
    return { valid: false, error: 'VALIDATION_FAILED' };
  }
}

// ──────────────────────────────────────────────────────────────
// REVOCATION HELPERS
// ──────────────────────────────────────────────────────────────
export async function revokeJTI(jti: string): Promise<boolean> {
  if (!redis) {
    usedJTIs.set(jti, Date.now() + (TOKEN_LIFETIME_SECONDS + 10) * 1000);
    return true;
  }
  const redisKey = `${REDIS_PREFIX}${jti}`;
  return (await redis.del(redisKey)) > 0;
}

export async function revokeAllForFingerprint(fingerprint: string): Promise<number> {
  console.warn('Full fingerprint revocation requires additional Redis Sets. Proceeding with stub.');
  return 0; // Placeholder – extend with Redis Set per user/session in the future
}

// ──────────────────────────────────────────────────────────────
// CLIENT: fortressFetch Wrapper (Silent UX)
// ──────────────────────────────────────────────────────────────
let globalClockOffset = 0;

export async function fortressFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);

  let challengeNonce: string | undefined;
  if (ENABLE_CHALLENGE_MODE) {
    challengeNonce = crypto.randomUUID(); // In production: fetch from /api/challenge first if needed
  }

  const { lock, ephemeralPubKey } = await generateFortressLock({
    useSessionLevel: DEFAULT_TO_SESSION_LEVEL,
    challengeNonce,
  });

  headers.set(HANDSHAKE_HEADER, lock);
  headers.set(PUBKEY_HEADER, ephemeralPubKey);
  if (challengeNonce) headers.set(CHALLENGE_HEADER, challengeNonce);

  // mTLS Injection for Node.js environments (the Swarm)
  if (typeof process !== 'undefined' && process.env.MTLS_CERT && process.env.MTLS_KEY) {
    try {
      const fs = require('fs');
      const https = require('https');
      const agent = new https.Agent({
        cert: fs.readFileSync(process.env.MTLS_CERT),
        key: fs.readFileSync(process.env.MTLS_KEY),
        ca: process.env.MTLS_CA ? fs.readFileSync(process.env.MTLS_CA) : undefined,
      });
      // @ts-ignore - Next.js fetch polyfill supports agent
      options.agent = agent;
    } catch (err) {
      console.warn('[mTLS] Failed to inject client certificates into fetch agent.', err);
    }
  }

  let response = await fetch(url, { ...options, headers });

  // Silent auto-calibration retry
  if (response.status === 403) {
    const serverTimeStr = response.headers.get(SERVER_TIME_HEADER);
    if (serverTimeStr) {
      globalClockOffset = parseInt(serverTimeStr) - Date.now();
      const retryData = await generateFortressLock({
        useSessionLevel: DEFAULT_TO_SESSION_LEVEL,
        challengeNonce,
      });
      headers.set(HANDSHAKE_HEADER, retryData.lock);
      headers.set(PUBKEY_HEADER, retryData.ephemeralPubKey);
      response = await fetch(url, { ...options, headers });
    }
  }

  return response;
}

export {
  generateFortressLock,
  verifyFortressLock,
  fortressFetch,
  generateLongLivedKeyPair,
  revokeJTI,
  revokeAllForFingerprint
};
