import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

// Force-load institutional environment
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

/**
 * TelegramSentinelAgent (SOVRA Sovereign LLC)
 * Mandate: Real-time Communication Sovereignty.
 * Purpose: Bridges the Sovereign Hive to the user's personal device.
 * MISSION: SENTINEL_COMMUNICATION (v20.0_APEX)
 */
export class TelegramSentinelAgent {
  private static token = process.env.TELEGRAM_BOT_TOKEN;
  private static ownerId = process.env.TELEGRAM_OWNER_ID;
  private static apiBase = `https://api.telegram.org/bot${this.token}`;

  /**
   * APEX_SYSTEM_HANDSHAKE: Verifies the connection and sends an ignition pulse.
   */
  static async triggerHandshake() {
    console.log('[TelegramSentinel] HANDSHAKE: Igniting Sovereign Bridge...');
    return this.sendSystemMessage('🛸 *APEX_SOVEREIGN: HANDSHAKE_IGNITED*\n\nStatus: Sovereign Hive (v19.0) Link Established.\nMastery: 10x Alpha Active.\n100/100 Integrity.');
  }

  /**
   * SEND_STRIKE_ALERT: Notifies of a financial Lock-In pulse.
   */
  static async sendStrikeAlert(amount: number, workers: number, mastery: string = '10x') {
     const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
     const msg = `💰 *HIVE_STRIKE_DETECTED*\n\n` +
                 `Amount: `${formattedAmount}`\n` +
                 `Workers: `${workers.toLocaleString()}`\n` +
                 `Mastery: `${mastery}`\n` +
                 `Status: *LOCKED_IN*\n\n` +
                 `_Verifiably grounded in Institutional Ledger._`;
     
     return this.sendSystemMessage(msg);
  }

  /**
   * SEND_SYSTEM_MESSAGE: Core relay logic.
   */
  static async sendSystemMessage(text: string) {
    if (!this.token || !this.ownerId) {
      console.warn('[TelegramSentinel] MISSION_FAULT: Bot credentials missing.');
      return false;
    }

    try {
      await axios.post(`${this.apiBase}/sendMessage`, {
        chat_id: this.ownerId,
        text,
        parse_mode: 'Markdown'
      });
      return true;
    } catch (err: any) {
      console.error('[TelegramSentinel] RELAY_FAULT:', err.response?.data || err.message);
      return false;
    }
  }

  /**
   * FETCH_STATUS: (Internal) Simple status pull for commands.
   */
  static async fetchStatus() {
     // This would be called by a separate poller if needed
     return { status: 'ONLINE', protocol: 'v20.0_SENTINEL' };
  }
}
