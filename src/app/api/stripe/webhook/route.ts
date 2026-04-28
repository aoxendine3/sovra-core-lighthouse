import { NextRequest, NextResponse } from 'next/server';
import { SOVRADB } from '../../../../sovra/core/db/SOVRADB.ts';

/**
 * Sovereign Stripe Webhook (v1.0_SOVRA)
 * Mandate: Absolute Grounding of Revenue.
 * 
 * This endpoint listens for real-world transaction events from Stripe.
 * Every valid payment is signed into the Sovereign Audit Trail with SIG_SOVRA.
 */
export async function POST(req: NextRequest) {
  const payload = await req.json();
  const eventType = payload.type;

  console.log(`[StripeWebhook] INGRESS: Received event ${eventType}`);

  if (eventType === 'checkout.session.completed') {
    const session = payload.data.object;
    const amount = session.amount_total / 100;
    const currency = session.currency;
    const transactionId = session.id;

    // GROUND THE REVENUE
    await SOVRADB.trackRevenue(
      `Stripe_Checkout_${transactionId}`,
      amount,
      amount * 0.97, // Est. Net
      false // NOT SANDBOX
    );

    console.log(`[StripeWebhook] GROUNDED: $${amount} ${currency} recorded in Sovereign Ledger.`);
  }

  return NextResponse.json({ received: true });
}
