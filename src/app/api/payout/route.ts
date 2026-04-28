import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { AegisSecurityService } from '@/lib/security/AegisSecurityService';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { audit } from '@/lib/logger/InstitutionalLogger';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === 'sk_test_mock') {
  audit('error', 'STRIPE_SECRET_MISSING', { detail: 'Absolute Reality requires a live Stripe Secret Key.' });
}

const stripe = new Stripe(STRIPE_SECRET_KEY || '', { 
  apiVersion: '2024-04-10' 
});

/**
 * Institutional Payout Node (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: FINANCIAL_SETTLEMENT_APEX
 * Mandate: Absolute Compliance & Verified Payouts.
 */
export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    // 1. AUTH: Executive Verification
    const user = await AegisSecurityService.authenticate(req);
    if (!user) {
      return NextResponse.json({ error: 'UNAUTHORIZED_ACCESS' }, { status: 401 });
    }

    const { amount, bankAccountToken } = await req.json();
    if (!amount || !bankAccountToken) {
      return NextResponse.json({ error: 'MISSING_SETTLEMENT_PARAMETERS' }, { status: 400 });
    }

    // 2. COMPLIANCE: KYC/AML Sentinel Audit
    const complianceStatus = await AegisSecurityService.verifyCompliance(user.id);
    if (complianceStatus.status !== 'VERIFIED') {
      audit('warn', 'PAYOUT_BLOCKED_COMPLIANCE', { userId: user.id, status: complianceStatus });
      return NextResponse.json({ 
        error: 'INSTITUTIONAL_COMPLIANCE_REQUIRED', 
        detail: complianceStatus.error 
      }, { status: 403 });
    }

    // 3. SHARDING: Route to optimal node
    const node = await AegisSecurityService.routeFinancialTranche(amount);
    if (!node) {
      return NextResponse.json({ error: 'ROUTING_FAULT' }, { status: 500 });
    }

    // 4. SETTLEMENT: Stripe Payout Tranche
    const payout = await stripe.payouts.create({
      amount: Math.floor(amount * 100), // cents
      currency: 'usd',
      destination: bankAccountToken,
      statement_descriptor: 'SOVRA Affiliate Payout',
    });

    // 5. GROUNDING: Record in Sovereign Ledger
    await SOVRADB.run('INSERT INTO sovra_payouts', [user.id, payout.id, amount, payout.status]);
    
    audit('info', 'PAYOUT_SETTLED', { 
      userId: user.id, 
      amount, 
      stripeId: payout.id, 
      node: node.id 
    });

    return NextResponse.json({ 
      success: true, 
      payoutId: payout.id, 
      status: payout.status,
      node: node.id 
    });

  } catch (error: any) {
    audit('error', 'PAYOUT_FAILURE', { error: error.message });
    return NextResponse.json({ error: 'SETTLEMENT_FAULT', detail: error.message }, { status: 500 });
  }
}
