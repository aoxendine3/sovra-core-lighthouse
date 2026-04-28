import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { SovereignSecurityAgent } from '@agency/lib/agents/security/SovereignSecurityAgent';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * Stripe Webhook (SOVRA Singularity v.007)
 * Factual entry point for real-world revenue ingress.
 * Mission: Absolute Financial Settlement & Security.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[Stripe Webhook] Verification failed: ${errorMessage}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle Absolute Revenue Events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const grossAmount = (session.amount_total || 0) / 100;
    const netAmount = grossAmount * 0.971 - 0.30; // Estimated Stripe fees (Standard)
    const email = session.customer_details?.email || 'ANONYMOUS_WAHLE';
    const tier = session.metadata?.tier || 'INSTITUTIONAL';

    console.log(`[Stripe Webhook] FACTUAL_REVENUE_SETTLEMENT: $${grossAmount} from ${email}`);

    // Generate Sovereign Signature (v.007 Requirement)
    const payload = { 
        source: 'STRIPE_PRODUCTION', 
        gross_amount: grossAmount, 
        net_amount: netAmount, 
        email, 
        tier,
        timestamp: new Date().toISOString() 
    };
    const signatureHash = await SovereignSecurityAgent.signTransaction(payload);

    // Ground in Revenue Ledger
    await SOVRADB.run(
      'INSERT INTO sovra_revenue (source, gross_amount, net_amount, status, signature_hash) VALUES (?, ?, ?, ?, ?)',
      ['STRIPE_CHECKOUT_PRODUCTION', grossAmount, netAmount, 'SETTLED', signatureHash]
    );

    // Ground Institutional Subscription
    await SOVRADB.run(
       'INSERT OR REPLACE INTO sovra_subscriptions (email, tier, status) VALUES (?, ?, ?)',
       [email, tier, 'ACTIVE']
    );

    await SOVRADB.logAgentActivity(
      'StripeMasterAgent',
      `Factual Settlement Grounded: $${grossAmount} [${tier}]`,
      'COMPLETED',
      { sessionId: session.id, signature: signatureHash, email }
    );
  }

  return NextResponse.json({ received: true });
}
