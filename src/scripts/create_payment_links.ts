import * as dotenv from 'dotenv';
import path from 'path';
import Stripe from 'stripe';
import { SOVRADB } from '../../sovra/core/db/SOVRADB.ts';
import { audit } from '../lib/logger/InstitutionalLogger.ts';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

/**
 * SOVRA Sovereign Treasury Ignition: v14.4_Ω
 * ─────────────────────────────────────────────────────────────
 * MISSION: FINANCIAL_SETTLEMENT_DOMINANCE (v14.4_Ω)
 * Goal: Generate live anchored + loss-aversion optimized payment links.
 */
async function createAnchoredPaymentLinks() {
  audit('info', 'TREASURY_IGNITION_INITIATED');

  try {
    const tiers = [
      { 
        id: 'single', 
        name: 'SOVRA Single Mandate (Launch Offer)', 
        price: 7900, 
        desc: 'Don’t buy this mandate and you keep drowning in data. Buy it and you get one clear, on-chain verified executive mandate. Regular $149.',
        metadata: { anchor: '$149', scarcity: 'first 10 only' }
      },
      { 
        id: 'pack', 
        name: 'SOVRA 3-Mandate Pack (Launch Offer)', 
        price: 19900, 
        desc: 'Institutional 3-pack for sustained decision dominance. Most founders waste 20h/mo on bad decisions. Regular $447.',
        metadata: { anchor: '$447', best_value: 'TRUE' }
      },
      { 
        id: 'unlimited', 
        name: 'SOVRA Monthly Unlimited (Launch Offer)', 
        price: 39900, 
        desc: 'Uncapped access to the 24/12/7/3/1 Distillation Engine for 30 days. Regular $599.',
        metadata: { anchor: '$599', type: 'subscription' }
      }
    ];

    for (const tier of tiers) {
      const product = await stripe.products.create({
        name: tier.name,
        description: tier.desc,
        metadata: { ...tier.metadata, protocol: 'v14.4_Ω_SINGULARITY' }
      });

      const priceData: any = {
        product: product.id,
        unit_amount: tier.price,
        currency: 'usd',
      };

      if (tier.metadata.type === 'subscription') {
        priceData.recurring = { interval: 'month' };
      }

      const price = await stripe.prices.create(priceData);

      const link = await stripe.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }],
        metadata: { tier: tier.id, service: 'SOVRA_MANDATE' }
      });

      // Log in SOVRADB (Audit)
      await SOVRADB.logAgentActivity(
        'StripeMasterAgent',
        `Treasury Node Deployed: ${tier.name}`,
        'COMPLETED',
        { url: link.url, price: tier.price / 100 }
      );

      audit('info', 'TREASURY_NODE_DEPLOYED', { tier: tier.id, url: link.url });
    }

    audit('info', 'TREASURY_IGNITION_SUCCESS');
    
  } catch (error: any) {
    audit('error', 'TREASURY_IGNITION_FAULT', { error: error.message });
  }
}

createAnchoredPaymentLinks().then(() => {
    process.exit(0);
});
