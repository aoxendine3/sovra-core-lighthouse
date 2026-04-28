import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateHandshake } from '@/lib/auth/Handshake';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

/**
 * SOVRA Sovereign Checkout Ingress (v1.2_Ω - GROUNDED)
 * ─────────────────────────────────────────────────────────────
 * MISSION: FINANCIAL_SETTLEMENT_DOMINANCE
 * 100/100 Factual entry point for real-world transaction capture.
 * 
 * Protected by: Ω_POST_QUANTUM_HANDSHAKE
 */
export async function GET(req: Request) {
  try {
    // 1. SECURITY_VERIFICATION (Fail-safe)
    const isValid = await validateHandshake(req);
    if (!isValid) {
      return NextResponse.json({ error: 'Institutional PQ Handshake Required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tier = searchParams.get('tier') || 'guardian';
    const amount = searchParams.get('amount') || '2500';
    const lang = searchParams.get('lang') || 'en';

    console.log(`[SOVRA_Checkout] INGRESS_INITIALIZED: Tier [${tier}]`);

    // 2. MISSION_IGNITION: Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: lang === 'jp' ? 'jpy' : 'usd',
            product_data: {
              name: `SOVRA Sovereign: ${tier.toUpperCase()} Pulse Extraction`,
              description: `Institutional Resource Recovery Protocol (v1.2_Ω_ULTIMA)`,
            },
            unit_amount: parseInt(amount) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/war-room?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store`,
      metadata: {
        tier,
        mission: 'NOBOO_ASSET_EXTRACTION',
        protocol: 'v1.2_Ω'
      }
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    console.error(`[SOVRA_Checkout] CRITICAL_FAULT: ${err.message}`);
    return NextResponse.json({ error: 'Checkout Maneuver Interrupted' }, { status: 500 });
  }
}
