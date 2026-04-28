import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { validateHandshake } from '@/lib/auth/Handshake';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * Marketing Pulse API: v1.0_SOVRA
 * ─────────────────────────────────────────────────────────────
 * MISSION: TELEMETRY_EXPLOITATION_v1.0_SOVRA
 * Goal: Extracts Encharge blast data from institutional logs.
 */
export async function GET(req: Request) {
  try {
    // 1. SECURITY: INSTITUTIONAL DEEP LOCK
    if (!await validateHandshake(req)) {
      return NextResponse.json({ status: 'UNAUTHORIZED' }, { status: 403 });
    }

    const db = await SOVRADB.getInstance();
    
    // 2. EXTRACTION: Fetch blast successes from agent logs
    const logs = await db.all('sovra_agent_logs');
    const blasts = logs.filter((l: any) => l.activity.includes('CAMPAIGN_BLAST_SUCCESS'));

    // Calc velocity and saturation
    const recentBlasts = blasts.filter((b: any) => (Date.now() - new Date(b.timestamp).getTime()) < 86400000);
    const saturationIndex = recentBlasts.length * 2010; // 2k nodes per blast

    return NextResponse.json({
      blasts: blasts.slice(-50), // last 50 pulses
      metrics: {
        totalBlasts: blasts.length,
        dailyVelocity: recentBlasts.length,
        saturationIndex,
        status: 'APEX_NOMINAL'
      }
    });

  } catch (error: any) {
    audit('error', 'MARKETING_PULSE_FAULT', { error: error.message });
    return NextResponse.json({ error: 'TELEMETRY_FAULT' }, { status: 500 });
  }
}
