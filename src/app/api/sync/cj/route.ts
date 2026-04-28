import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { AegisSecurityService } from '@/lib/security/AegisSecurityService';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { audit } from '@/lib/logger/InstitutionalLogger';
import axios from 'axios';

const CJ_API_KEY = process.env.CJ_AFFILIATE_API_KEY;

/**
 * CJ Affiliate Sync Node (v1.1_RAW_REALITY)
 * ─────────────────────────────────────────────────────────────
 * MISSION: COMMISSION_RECONCILIATION_APEX
 * Mandate: Absolute Precision in Affiliate Earnings.
 */
export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    // 1. AUTH: Executive Verification & Zero-Point Handshake
    const user = await AegisSecurityService.authenticate(req);
    const temporalKey = req.headers.get('x-spectral-jitter');
    
    if (!user || !AegisSecurityService.verifyTemporalAuthKey(temporalKey || '')) {
      audit('warn', 'ZERO_POINT_VIOLATION', { userId: user?.id, ip: req.headers.get('x-forwarded-for') });
      return NextResponse.json({ error: 'UNAUTHORIZED_ACCESS', detail: 'SECURE_HANDSHAKE_REQUIRED' }, { status: 401 });
    }

    // 2. SYNC: Execute Grounded Sync via SecureRealityService
    audit('info', 'CJ_SYNC_INITIATED', { userId: user.id });
    
    const result = await CJAffiliateSyncService.syncCommissions(user.id);

    return NextResponse.json({ 
      success: true, 
      synced: result.synced,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    audit('error', 'CJ_SYNC_FAILURE', { error: error.message });
    return NextResponse.json({ error: 'SYNC_FAULT', detail: error.message }, { status: 500 });
  }
}
