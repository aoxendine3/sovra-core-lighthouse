import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { generateHandshake } from '@/lib/auth/HandshakeEdge';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * APEX_HANDSHAKE_PULSE_API: v60.0_SENTINEL
 * ─────────────────────────────────────────────────────────────
 * MISSION: SECURE_TOKEN_PROVISIONING
 * Purpose: Signs cryptographic handshakes for the browser.
 * Security: Enforces local/origin restrictions to prevent external abuse.
 */
export async function GET(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const origin = req.headers.get('origin') || 'SOVEREIGN_NODE';
  
  // 1. ELITE_PERIMETER_CHECK
  const isLocal = ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.');
  
  // In dev/local mode, we allow local calls. In production, we restrict to specific origins.
  if (!isLocal && !origin.includes('localhost') && !origin.includes('apex')) {
    audit('warn', 'HANDSHAKE_PROVISION_DENIED', { ip, origin });
    return NextResponse.json({ status: 'PROVISIONING_BLOCKED' }, { status: 403 });
  }

  try {
    // 2. CRYPTOGRAPHIC_PULSE_GENERATION
    const token = await generateHandshake();
    
    audit('info', 'HANDSHAKE_PROVISIONED', { ip, origin });

    return NextResponse.json({ 
      token,
      timestamp: Date.now(),
      status: 'PULSE_ACTIVE'
    });

  } catch (error: any) {
    audit('error', 'HANDSHAKE_PROVISION_FAULT', { error: error.message });
    return NextResponse.json({ status: 'INTERNAL_FAULT' }, { status: 500 });
  }
}
