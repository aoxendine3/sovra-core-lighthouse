import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB.ts';
import { verifyHandshake as validateHandshake } from '@/lib/auth/HandshakeEdge';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * SOVRA_LEAD_GROUNDING_API (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: LEAD_SATURATION_v1.0_SOVRA
 * Protocol: INSTITUTIONAL_INGRESS
 */
export async function POST(req: Request) {
  try {
    // 1. SECURITY: INSTITUTIONAL DEEP LOCK
    if (!await validateHandshake(req)) {
      audit('warn', 'LEAD_INGRESS_SECURITY_FAULT', { type: 'UNAUTHORIZED_ATTEMPT' });
      return NextResponse.json({ status: 'UNAUTHORIZED_ACCESS_TERMINATED' }, { status: 403 });
    }

    const { firstName, lastName, email, phone, asset } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json({ error: 'CORE_IDENTITY_REQUIRED' }, { status: 400 });
    }

    // 2. GROUNDING: Record in sovra_leads (Sovereign Ledger)
    const db = await SOVRADB.getInstance();
    await db.run(
      'INSERT INTO sovra_leads (first_name, last_name, email, phone, asset, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, asset, 'VETTED', new Date().toISOString()]
    );

    audit('info', 'LEAD_VERIFIABLY_GROUNDED', { email, asset });

    return NextResponse.json({ 
      status: 'APEX_SUCCESS', 
      detail: 'Lead pulse grounded in the Sovereign Ledger.' 
    });

  } catch (error: any) {
    audit('error', 'LEAD_GROUNDING_FAULT', { error: error.message });
    return NextResponse.json({ error: 'INGRESS_FAULT' }, { status: 500 });
  }
}
