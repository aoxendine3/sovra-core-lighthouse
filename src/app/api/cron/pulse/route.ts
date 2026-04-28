import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { executeOmniPulse } from '@/scripts/global_blitz_orchestrator';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * INSTITUTIONAL_PULSE_API: v1.0_SOVRA
 * ─────────────────────────────────────────────────────────────
 * MISSION: AUTONOMOUS_MARKET_SATURATION
 * This endpoint is triggered by Vercel Cron (CRON_SECRET verification).
 */
export async function GET(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const authHeader = req.headers.get('authorization');
  
  // VERIFY: Institutional Vercel Cron Secret
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    audit('warn', 'CRON_SECURITY_FAULT', { type: 'UNAUTHORIZED_PULSE_ATTEMPT' });
    return new Response('Unauthorized Access Terminated.', { status: 401 });
  }

  try {
    console.log('[InstitutionalPulse] Triggering Global Swarm Pulse...');
    
    // Execute the OmniPulse in the background (Edge compatible)
    // Note: Vercel Functions have a timeout, but executeOmniPulse is designed for async settlement.
    await executeOmniPulse();

    audit('info', 'INSTITUTIONAL_PULSE_SUCCESS', { trigger: 'VERCEL_CRON' });

    return NextResponse.json({ 
      status: 'PULSE_SETTLED', 
      timestamp: new Date().toISOString() 
    });

  } catch (error: any) {
    audit('error', 'INSTITUTIONAL_PULSE_FAULT', { error: error.message });
    return NextResponse.json({ error: 'PULSE_FAULT' }, { status: 500 });
  }
}
