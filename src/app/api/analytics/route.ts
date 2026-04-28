import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { validateHandshake } from '@/lib/auth/Handshake';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * Sovereign Analytics API: v20.0_EXASCALE
 * ─────────────────────────────────────────────────────────────
 * MISSION: TELEMETRY_GROUNDING
 * Purpose: Returns real-time click analytics from the sovra_analytics_clicks ledger.
 */
export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  try {
    // SECURITY: INSTITUTIONAL DEEP LOCK HANDSHAKE
    if (!await validateHandshake(req)) {
      audit('warn', 'ANALYTICS_LOCK_FAILURE', { ip });
      return NextResponse.json({ status: 'UNAUTHORIZED_ACCESS_TERMINATED' }, { status: 403 });
    }

    audit('info', 'TELEMETRY_REQUEST_RECIEVED', { ip });

    const db = await SOVRADB.getInstance();
    
    // FETCH LIVE TELEMETRY
    const [clicks, stats] = await Promise.all([
      db.all(`SELECT id, timestamp, target, source FROM sovra_analytics_clicks ORDER BY timestamp DESC LIMIT 100`),
      SOVRADB.getEnterpriseStats()
    ]);

    return NextResponse.json({
      clicks: clicks.map((click: any) => ({
        ...click,
        id: click.id.toString(),
      })),
      stats
    });

  } catch (error: any) {
    audit('error', 'GROUNDING_FAULT', { ip, error: error.message });
    return NextResponse.json([], { status: 500 });
  }
}
