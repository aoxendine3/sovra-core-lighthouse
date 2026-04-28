import jwt from 'jsonwebtoken';

/**
 * INSTITUTIONAL_JWT_CORE (v15.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * MISSION: SECURE_SESSION_PERSISTENCE
 * Purpose: Anchors executive sessions to the Sovereign Node.
 */

const SECRET = process.env.SOVRA_JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('[SECURITY] SOVRA_JWT_SECRET is missing or too short. Set a 64+ char secret in .env.local');
  } else {
    console.warn('[SECURITY] WARNING: SOVRA_JWT_SECRET not set. Using dev fallback — NEVER in production.');
  }
}
const RESOLVED_SECRET = SECRET || 'dev_only_fallback_not_for_production_use_12345678';

export interface InstitutionalSession {
  nodeId: string;
  executiveAddress: string;
  role: 'EXECUTIVE' | 'INSTITUTIONAL_PARTNER';
  whale: boolean;
  handshakeId: string;
}

/**
 * signInstitutionalToken: Generates a JWT for a verified institutional node.
 */
export function signInstitutionalToken(payload: InstitutionalSession): string {
  return jwt.sign(payload, RESOLVED_SECRET, { 
    expiresIn: '7d',
    issuer: 'SOVRA_SOVEREIGN_APEX',
    algorithm: 'HS256'
  });
}

/**
 * verifyInstitutionalToken: Verifies the integrity of an institutional session.
 */
export function verifyInstitutionalToken(token: string): InstitutionalSession | null {
  try {
    return jwt.verify(token, RESOLVED_SECRET, { 
       issuer: 'SOVRA_SOVEREIGN_APEX',
       algorithms: ['HS256']
    }) as InstitutionalSession;
  } catch {
    return null;
  }
}

/**
 * getSessionFromHeader: Utility to extract session from Authorization header.
 */
export function getSessionFromRequest(req: Request): InstitutionalSession | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  return verifyInstitutionalToken(token);
}
