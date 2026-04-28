import { TonyDB } from '../db/TonyDB.ts';
import axios from 'axios';
import Stripe from 'stripe';

/**
 * ──────────────────────────────────────────────────────────────────────────────
 * APEX SOVEREIGN LLC - PROPRIETARY & CONFIDENTIAL
 * ──────────────────────────────────────────────────────────────────────────────
 * PROJECT: APEX Institutional Infrastructure
 * MODULE: Commission Sentinel (v13.0)
 * ──────────────────────────────────────────────────────────────────────────────
 */

export class CommissionSentinel {
  private static _stripe: Stripe | null = null;

  private static getStripe() {
    if (!this._stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) throw new Error('[CommissionSentinel] CRITICAL: STRIPE_SECRET_KEY missing.');
      this._stripe = new Stripe(key, { apiVersion: '2024-04-10' as any });
    }
    return this._stripe;
  }

  /**
   * CJ_PULSE: Syncs approved commissions from CJ Affiliate API.
   */
  static async syncCJCommissions() {
    const apiKey = process.env.CJ_AFFILIATE_API_KEY;
    if (!apiKey) {
      console.warn('[CommissionSentinel] MISSION_FAULT: CJ_API_KEY missing. Sync aborted.');
      return;
    }

    console.log('[CommissionSentinel] CJ_PULSE: Syncing commissions...');

    try {
      const response = await axios.get('https://api.cj.com/v2/earnings', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        params: { 'date-range': 'last-30-days', status: 'approved' },
        timeout: 10000
      });

      const db = await TonyDB.getInstance();
      let count = 0;

      for (const earning of response.data.earnings || []) {
        try {
          await db.run(
            'INSERT OR IGNORE INTO sovra_affiliate_earnings (amount, source, external_transaction_id) VALUES (?, ?, ?)',
            [earning.amount, 'CJ_AFFILIATE', earning.cj_transaction_id]
          );
          count++;
        } catch (e) {
          // Likely duplicate transaction ID - skipping
        }
      }

      await TonyDB.logAgentActivity(
        'CommissionSentinel', 
        `CJ sync successful. ${count} transactions reconciled.`,
        'COMPLETED'
      );

      return { success: true, synced: count };
    } catch (err) {
      console.error('[CommissionSentinel] CJ_SYNC_FAULT:', err);
      return { success: false, error: 'SYNC_FAILED' };
    }
  }

  /**
   * PAYOUT_STRIKE: Triggers institutional settlement from Stripe to Bank.
   */
  static async executePayoutStrike(amount: number, bankToken: string) {
    console.log(`[CommissionSentinel] PAYOUT_STRIKE: Initiating settlement for $${amount}...`);

    try {
      const stripe = this.getStripe();
      const payout = await stripe.payouts.create({
        amount: Math.floor(amount * 100),
        currency: 'usd',
        destination: bankToken,
        statement_descriptor: 'SOVRA Institutional Payout'
      });

      const db = await TonyDB.getInstance();
      await db.run(
        'INSERT INTO sovra_payouts (stripe_payout_id, amount, status) VALUES (?, ?, ?)',
        [payout.id, amount, payout.status === 'paid' ? 'SETTLED' : 'PENDING']
      );

      await TonyDB.logAgentActivity(
        'CommissionSentinel',
        `Payout strike successful: ${payout.id}`,
        'COMPLETED',
        { stripeId: payout.id, amount, status: payout.status }
      );

      return { success: true, payoutId: payout.id };
    } catch (err) {
      console.error('[CommissionSentinel] PAYOUT_FAULT:', err);
      return { success: false, error: 'PAYOUT_FAILED' };
    }
  }
}
