import { NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { InstitutionalLogger, audit } from '@/lib/logger/InstitutionalLogger';
import { signInstitutionalToken } from '@/lib/auth/JWTAuth';

/**
 * Subscription & Lead Ingress API (v18.0_UNIFIED)
 * Mandate: Absolute capture of global institutional leads and subscriptions.
 * Pulse: Identifies "Whales" (Enterprise leads) in real-time for direct extraction.
 */

export async function POST(req: Request) {
  try {
    // 1. UNITARY INSTITUTIONAL HANDSHAKE
    const isValidHandshake = await validateHandshake(req);

    if (!isValidHandshake) {
      audit('warn', 'SUB_LOCK_FAILURE', { ip: req.headers.get('x-forwarded-for') });
      return NextResponse.json({ status: 'UNAUTHORIZED' }, { status: 403 });
    }

    const { email, name, source, tierId, stripeEventId, isAppleStoreLead, trace = 'v1.0_SOVRA' } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid institutional email address' }, { status: 400 });
    }

    // 2. WHALE TRACKING LOGIC (SOVRA Institutional Grade)
    const whaleKeywords = ['ENTERPRISE', 'INC', 'CORP', 'SYSTEMS', 'GLOBAL', 'MARKETING', 'CEO', 'FOUNDER', 'INVESTOR', 'SOVEREIGN'];
    const lowerName = (name || '').toUpperCase();
    const lowerEmail = email.toUpperCase();
    
    const isWhale = whaleKeywords.some(k => lowerName.includes(k)) || 
                    whaleKeywords.some(k => lowerEmail.includes(k)) ||
                    tierId === 'sovereign';

    const db = await SOVRADB.getInstance();

    // 3. INSTITUTIONAL SUBSCRIPTION BRANCH (Production Fulfillment)
    if (tierId || stripeEventId) {
      const activeTier = tierId || 'GUARDIAN';
      
      const handshakeId = `SOVRA-${activeTier}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      await db.run(
        'INSERT INTO sovra_subscriptions (client_name, client_email, tier_id, handshake_id, status, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
        [name || 'SOVRA Sovereign Client', email.toLowerCase(), activeTier, handshakeId, 'ACTIVE', expiresAt.toISOString()]
      );

      // 4. JWT SESSION GENERATION (New Blueprint Alignment)
      const token = signInstitutionalToken({
        nodeId: `NODE-${handshakeId}`,
        executiveAddress: email,
        role: 'INSTITUTIONAL_PARTNER',
        whale: isWhale,
        handshakeId
      });

      // Log activity in the Institutional Auditor
      audit('info', 'INSTITUTIONAL_ACTIVATION', { 
        email, 
        tier: activeTier, 
        tokenIssued: true, 
        isWhale, 
        handshakeId 
      });

      return NextResponse.json({ 
        success: true, 
        message: `Institutional ${activeTier} Access verifiably activated.`,
        handshakeId: handshakeId,
        token, // RETURN THE SESSION TOKEN
        isWhale,
        trace
      });
    }

    // 5. PRODUCTION LEAD CAPTURE BRANCH
    audit('info', 'LEAD_CAPTURED', { email, isWhale });
    
    await db.run(
      'INSERT INTO sovra_leads (email, name, source, status) VALUES (?, ?, ?, ?)',
      [email.toLowerCase(), name || 'Anonymous Client', source || 'APEX_DIRECT', isWhale ? 'WHALE' : 'ACTIVE']
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Operational lead captured successfully.',
      isWhale,
      trace 
    });

  } catch (error: any) {
    audit('error', 'INGRESS_FAULT', { error: error.message });
    
    if (error.message?.includes('UNIQUE constraint failed')) {
        return NextResponse.json({ success: true, message: 'Institutional node already active.' });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
