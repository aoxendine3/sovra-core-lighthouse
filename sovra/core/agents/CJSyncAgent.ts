import axios from 'axios';
import { TonyDB } from '../db/TonyDB';

/**
 * CJSyncAgent (The Institutional Harbinger)
 * Mandate: Real-world payout reconciliation.
 * Pulls approved commissions from CJ Affiliate and anchors them in the Physical Ledger.
 * MISSION: CAPITAL_GROUNDING (v2026.11_APEX)
 */
export class CJSyncAgent {
  private cjApiKey = process.env.CJ_AFFILIATE_API_KEY;

  /**
   * Synchronizes commissions for a specific user.
   */
  async syncCommissions(userId: string) {
    console.log(`[CJSyncAgent] SYNC_INITIATED: Fetching approved commissions for ${userId}...`);
    
    if (!this.cjApiKey) {
      console.error('[CJSyncAgent] AUTH_FAULT: CJ_AFFILIATE_API_KEY is missing from environment.');
      return { success: false, error: 'API_KEY_REQUIRED' };
    }

    try {
      // Fetching from CJ Affiliate API (Legitimate Integration)
      // Note: Endpoint derived from institutional secure blueprint v41.3
      const response = await axios.get('https://api.cj.com/v2/earnings', {
        headers: {
          'Authorization': `Bearer ${this.cjApiKey}`,
        },
        params: {
          'date-range': 'last-30-days',
          status: 'approved',
        },
        timeout: 10000,
      });

      const earnings = response.data?.earnings || [];
      
      for (const earning of earnings) {
        await this.recordEarning(userId, earning);
      }

      console.log(`[CJSyncAgent] SYNC_COMPLETE: Grounded ${earnings.length} commission pulses.`);
      return { success: true, count: earnings.length };
    } catch (err) {
      console.error('[CJSyncAgent] SYNC_FAULT:', (err as Error).message);
      return { success: false, error: (err as Error).message };
    }
  }

  private async recordEarning(userId: string, earning: any) {
    const db = await TonyDB.getInstance();
    await db.run(`
      INSERT INTO sovra_agent_logs (agent_name, activity, status, metadata)
      VALUES (?, ?, ?, ?)
    `, [
      'CJSyncAgent',
      'EARNING_RECORDED',
      'SUCCESS',
      JSON.stringify({
        userId,
        amount: earning.amount,
        transactionId: earning.cj_transaction_id,
        timestamp: Date.now()
      })
    ]);
  }
}
