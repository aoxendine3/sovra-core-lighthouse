import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { Base44SyncService } from '@/lib/commerce/FinancialCore';

/**
 * BASE44_SYNC_NODE: v1.0 (Operational Standard)
 * ─────────────────────────────────────────────────────────────
 * MISSION: REVENUE_INGRESS_SATURATION
 * Purpose: Synchronizes Base44 affiliate commissions with the Sovereign Ledger.
 */
export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'MISSING_USER_ID' }, { status: 400 });
    }

    const report = await Base44SyncService.syncCommissions(userId);

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'BASE44_PULSE_GROUNDED',
      syncedCount: report.synced,
      integrity: '100/100'
    });

  } catch (error: any) {
    console.error('[Base44Sync] Pulse Failure:', error.message);
    return NextResponse.json({ 
      error: 'INGRESS_FAULT', 
      detail: error.message 
    }, { status: 500 });
  }
}
