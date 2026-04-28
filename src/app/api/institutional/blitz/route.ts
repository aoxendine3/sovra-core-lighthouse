import { NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { executeOmniPulse } from '@/scripts/global_blitz_orchestrator';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * APEX-X: WEB COMMAND BRIDGE (v61.2)
 * Mandate: Universal Cloud Autonomy.
 * 
 * This endpoint allows the Sovereign Commander to trigger the Global Omni-Pulse
 * from any web-connected device, verifiably driven from the web.
 */

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Handshake Verification (Deep Lock v60.0)
    const isValid = await validateHandshake(req);
    
    if (!isValid) {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      await audit('warn', 'COMMAND_BRIDGE_UNAUTHORIZED', { ip, type: 'SECURITY_FAULT' });
      return NextResponse.json({ 
        status: 'SOVEREIGN_BLOCK', 
        message: 'Invalid SOVRA-X Deep Lock Handshake.' 
      }, { status: 401 });
    }

    // 2. Mission Ignition
    console.log('[WebCommand] MISSION_IGNITION: Triggering Global Omni-Pulse via API...');
    
    // We launch the orchestrator in the background to avoid Vercel timeouts (30s-60s)
    // and return a tracking ID immediately.
    const pulseID = `API_BLITZ_${Date.now()}`;
    
    // Non-blocking execution
    executeOmniPulse().catch(err => {
        console.error(`[WebCommand] BACK_GROUND_PULSE_FAIL: ${pulseID}`, err);
    });

    await audit('info', 'COMMAND_BRIDGE_EXECUTION', { pulseID, mode: 'WEB_REMOTED' });

    return NextResponse.json({
      status: 'MISSION_IGNITED',
      pulseID,
      message: 'SOVRA Global Omni-Pulse verifiably launched from the Web Dashboard.',
      integrity: '100/100'
    });

  } catch (err) {
    console.error('[WebCommand] FATAL_BRIDGE_FAULT:', err);
    return NextResponse.json({ 
      status: 'BRIDGE_FAULT', 
      message: 'Internal Institutional Bridge Error.' 
    }, { status: 500 });
  }
}
