import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { validateHandshake, generateHandshake } from '../auth/Handshake';
import { SOVRADB } from '../../../sovra/core/db/SOVRADB';
import { ComplianceSentinelAgent } from '../../../sovra/core/agents/ComplianceSentinelAgent';
import { audit } from '@/lib/logger/InstitutionalLogger';

const complianceAgent = new ComplianceSentinelAgent();
const JWT_SECRET = process.env.JWT_SECRET || 'SOVRA_Ω_APEX_777';

/**
 * AegisSecurityService (v1.3_Ω_SPECTRAL)
 * ─────────────────────────────────────────────────────────────
 * Mode: Ω_POST_QUANTUM_SECURITY + SPECTRAL_JITTER
 * Mandate: Absolute Handshake Integrity & 512-bit Entropy.
 * 
 * Purpose: Bridges the Institutional Secure Backend (v1.3_NOBOO)
 * with the Sovereign Enterprise hub.
 */
export class AegisSecurityService {

  /**
   * authenticate: Verifies the JWT token and Handshake Pulse.
   */
  static async authenticate(req: Request | NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        audit('warn', 'UNAUTHORIZED_ACCESS_ATTEMPT', { ip: req.headers.get('x-forwarded-for') });
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        return decoded;
    } catch (err) {
        audit('warn', 'INVALID_TOKEN_ATTEMPT', { error: (err as Error).message });
        return null;
    }
  }

  /**
   * verifyCompliance: Performs KYC/AML check via ComplianceSentinelAgent.
   */
  static async verifyCompliance(userId: string) {
    // 1. KYC Check
    const kycVerified = await complianceAgent.verifyKYCStatus(userId);
    if (!kycVerified) return { status: 'KYC_REQUIRED', error: 'L2_GOVT_ID_MISSING' };

    // 2. AML Scan
    const amlScan = await complianceAgent.performAMLScan();
    if (amlScan.status !== 'CLEAN') return { status: 'AML_RISK', error: 'COMPLIANCE_REVIEW_PENDING' };

    return { status: 'VERIFIED' };
  }

  /**
   * verifyTemporalAuthKey: Verifiably checks the Spectral PQ temporal handshake.
   */
  static verifyTemporalAuthKey(keyOrReq: string | Request): boolean {
    if (typeof keyOrReq === 'string') {
        const dummyReq = new Request('http://localhost', { headers: { 'x-aegis-auth': keyOrReq } });
        return validateHandshake(dummyReq);
    }
    return validateHandshake(keyOrReq);
  }

  /**
   * getTemporalAuthKey: Generates a new Spectral PQ Handshake for internal tranches.
   */
  static getTemporalAuthKey(): string {
    return generateHandshake();
  }

  /**
   * routeFinancialTranche: Routes payout volume to the appropriate node.
   */
  static async routeFinancialTranche(amountUSD: number) {
    return await complianceAgent.routePayout(amountUSD);
  }
}
