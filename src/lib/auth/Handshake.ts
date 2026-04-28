import { SignJWT, jwtVerify } from 'jose';

/**
 * SOVRA ZERO-POINT DEEP LOCK (v18.0)
 * ─────────────────────────────────────────────────────────────
 * Proprietary Handshake Protocol - APEX Sovereign LLC
 * ─────────────────────────────────────────────────────────────
 */

const SECRET = new TextEncoder().encode(
  process.env.HANDSHAKE_SECRET || 'SOVRA_DEFAULT_DEEP_LOCK_2026_APEX_SINGULARITY'
);

export async function generateHandshake() {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60; // 60-second window for high-theta execution

  return await new SignJWT({ 
    origin: 'XORAS_CORE', 
    identity: 'APEX_SENTINEL' 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(SECRET);
}

export async function validateHandshake(req: Request) {
  const token = req.headers.get('X-SOVRA-DEEP-LOCK');
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, SECRET);
    
    // Strict origin and identity verification
    if (payload.origin !== 'XORAS_CORE' || payload.identity !== 'APEX_SENTINEL') {
      return false;
    }
    
    return true;
  } catch (err) {
    return false; // Request destroyed
  }
}
