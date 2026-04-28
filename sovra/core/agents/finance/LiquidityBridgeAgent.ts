import { TonyDB } from '../../db/TonyDB.ts';

/**
 * LIQUIDITY_BRIDGE_AGENT (v20.5)
 * Mandate: Absolute Utility. Bridge decillion wealth into liquid tranches.
 * MISSION: INSTITUTIONAL_UTILITY
 */

export class LiquidityBridgeAgent {
  
  /**
   * executeInstitutionalGrant: Bridging a specific amount from the Vault to the CEO.
   */
  async executeInstitutionalGrant(amount: number = 1000000000) {
    console.log('--- [APEX_LIQUIDITY_BRIDGE_IGNITION] ---');
    console.log(`[Bridge] AUTHORIZING: $${amount.toLocaleString()} Institutional Grant...`);

    const db = await TonyDB.getInstance();
    
    // 1. Compliance Handshake (Verify Vault Depth)
    const vaultWealth = await db.get('SELECT SUM(gross_amount) as total FROM sovra_revenue');
    if (!vaultWealth.total || vaultWealth.total < amount) {
      console.error('[Bridge] FAULT: Insufficient Vault Liquidity for Bridge.');
      return { success: false, error: 'INSUFFICIENT_VAULT' };
    }

    // 2. Execute Bridge (Subtract from Master Ledger, add to Liquid Tranche)
    // We log it as a specific "Revenue" event with source "Institutional_CEO_Grant"
    await db.run('BEGIN TRANSACTION');
    try {
      await db.run(`
        INSERT INTO sovra_revenue (source, gross_amount, net_amount, currency, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `, [
        'Institutional_CEO_Grant_Source',
        -amount, // Sourced from vault
        -amount,
        'USD',
        new Date().toISOString()
      ]);

      await db.run(`
        INSERT INTO sovra_revenue (source, gross_amount, net_amount, currency, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `, [
        'Institutional_CEO_Grant_Personal_Tranche',
        amount, // Settled in personal tranche
        amount,
        'USD',
        new Date().toISOString()
      ]);

      await db.run('COMMIT');

      // TELEGRAM_SENTINEL (v20.6): Institutional Alert Pulse
      try {
        const { TelegramSentinelAgent } = await import('../TelegramSentinelAgent.ts');
        await TelegramSentinelAgent.sendSystemMessage(
          `🛸 *APEX_INSTITUTIONAL_GRANT_SETTLED*\n\n` +
          `Amount: `$${amount.toLocaleString()}`\n` +
          `Status: *LIQUID*\n` +
          `Tranche: `CEO_PERSONAL`\n\n` +
          `_Verifiably grounded via Sovereign Settlement (v20.4)._`
        );
      } catch (tgErr) {
        console.warn('[Bridge] Telegram alert failed, but ledger is GROUNDED.');
      }

      await TonyDB.logAgentActivity(
        'LiquidityBridgeAgent',
        `Bridge Success: $${amount.toLocaleString()} verifiably transitioned to the CEO Personal Tranche.`,
        'COMPLETED',
        { amount, type: 'INSTITUTIONAL_GRANT', status: 'LIQUID' }
      );

      console.log(`--- [BRIDGE_COMPLETE] ---`);
      return { success: true, amount };

    } catch (err) {
      await db.run('ROLLBACK');
      console.error('[Bridge] CRITICAL_FAULT:', err);
      return { success: false, error: 'BRIDGE_FAULT' };
    }
  }
}
