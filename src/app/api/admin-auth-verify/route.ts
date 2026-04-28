import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { Web3Auth } from '@/lib/auth/Web3Auth';
import { ThreatLedgerEdge } from '@agency/lib/auth/ThreatLedgerEdge';

/**
 * INSTITUTIONAL_AUTH_VERIFIER (v2.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * MISSION: SIGNATURE_GROUNDING
 * Security Grade: v60.0_SENTINEL_CLOUD
 */

// HONEYPOT: Identify hostile reconnaissance via GET
export async function GET(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  ThreatLedgerEdge.flagHostile(ip, 'Honeypot /admin-auth-verify Breach');
  return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
}

// REAL_AUTH: Verify Executive Signature via POST
export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  
  try {
    const { message, signature, address } = await req.json();

    if (!message || !signature) {
      ThreatLedgerEdge.flagHostile(ip, 'Incomplete Auth Payload');
      return NextResponse.json({ error: 'INVALID_PAYLOAD' }, { status: 400 });
    }

    console.log(`[AdminAuth] Verifying signature for address: ${address}...`);

    const result = await Web3Auth.verifyExecutiveSignature(message, signature);

    if (result.success) {
      console.log(`[AdminAuth] SUCCESS: Identity Grounded for ${result.address}`);
      
      // Return authorization payload
      const sign = (addr: string) => `ZEN_AUTH_${Buffer.from(`${addr}:${Date.now()}`).toString('base64').substring(0, 32)}`;
      
      return NextResponse.json({ 
        success: true, 
        message: 'IDENTITY_GROUNDED',
        token: sign(result.address), 
        address: result.address
      });
    }

    return NextResponse.json({ success: false, error: result.error }, { status: 401 });

  } catch (err: any) {
    console.error('[AdminAuth] SERVER_ERROR:', err.message);
    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
