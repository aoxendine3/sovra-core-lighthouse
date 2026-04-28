import { validateHandshake } from '@/lib/auth/Handshake';
import { NextRequest, NextResponse } from 'next/server';
import { SOVRADB } from '@/../sovra/core/db/SOVRADB';

export const dynamic = 'force-dynamic';

/**
 * SOVRA Live Logs API (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Verifiably serves the latest institutional agent logs
 * for the SOVRA Command Center.
 * 
 * Protected by: Institutional PQ Middleware (v1.5_Ω)
 */
export async function GET(req: NextRequest) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const db = await SOVRADB.getInstance();
    
    // Fetch latest 20 agent logs
    const logs = await db.all('sovra_agent_logs');
    
    // Sort and limit in memory for the JSON-ledger
    const sortedLogs = [...logs]
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 20);

    return NextResponse.json({
      status: 'GROUNDED_FINALITY',
      logs: sortedLogs.map((l: any) => ({
          id: l.id,
          agent: l.agent_name,
          activity: l.activity,
          status: l.status,
          timestamp: l.timestamp
      }))
    });

  } catch (err) {
    console.error('[Logs_API] FAULT:', err);
    return NextResponse.json({ error: 'INTERNAL_CORE_FAULT' }, { status: 500 });
  }
}
