import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * SOVRA_FEEDBACK_INGRESS (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: DATA_SOVEREIGNTY_ENFORCEMENT
 * Purpose: Grounding operational sentiment into the Sovereign Ledger.
 */

export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const data = await req.json();
    const db = await SOVRADB.getInstance();
    
    // 1. SOVEREIGN_GROUNDING: Writing pulse to DB (Aligning with EBOD v35.0)
    const result = await db.run(
      'INSERT INTO sovra_feedback (score, comment, url, status) VALUES (?, ?, ?, ?)',
      [data.score || 0, data.comment || '', data.url || 'UNKNOWN_ORIGIN', 'PENDING']
    );

    // 2. INSTITUTIONAL_AUDIT: Verifiable logging
    audit('info', 'FEEDBACK_CAPTURED', { 
        id: result.lastID, 
        score: data.score, 
        url: data.url 
    });

    return NextResponse.json({ 
        success: true, 
        entryId: result.lastID,
        message: 'SENTIMENT_VERIFIABLY_GROUNDED' 
    });

  } catch (err: any) {
    audit('error', 'FEEDBACK_INGRESS_FAULT', { error: err.message });
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
