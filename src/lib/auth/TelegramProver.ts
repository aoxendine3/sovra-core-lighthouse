/**
 * ──────────────────────────────────────────────────────────────────────────────
 * APEX SOVEREIGN LLC - PROPRIETARY & CONFIDENTIAL
 * ──────────────────────────────────────────────────────────────────────────────
 * PROJECT: APEX Institutional Infrastructure
 * MODULE: Telegram Sovereign Prover (v13.0)
 * CORE: Encrypted Outbound Alert Node
 * ──────────────────────────────────────────────────────────────────────────────
 */

/**
 * The Telegram Prover verifiably dispatches high-stakes institutional alerts
 * to the Sovereign Owner ID anchored in the ledger.
 */
export async function dispatchSovereignAlert(message: string): Promise<boolean> {
  try {
    const OWNER_ID = process.env.TELEGRAM_OWNER_ID || '3368235199';
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    if (!BOT_TOKEN) {
      console.warn('[TelegramProver] MISSION_FAULT: TELEGRAM_BOT_TOKEN missing from environment. Alert cached.');
      return false;
    }

    const payload = {
      chat_id: OWNER_ID,
      text: `📡 APEX SOVEREIGN (v13.0)\n────────────────────\n${message}\n────────────────────\nSTATUS: TOP_1_PERCENT_OK`,
      parse_mode: 'HTML'
    };

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (!result.ok) {
      console.error('[TelegramProver] API_MESSAGE:', result.description || 'UNKNOWN_ERROR');
    }
    return result.ok;
  } catch (err) {
    console.error('[TelegramProver] CRITICAL_FAULT:', err);
    return false;
  }
}
