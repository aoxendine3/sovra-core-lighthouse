import https from 'https';
/**
 * MaxxTelegramBridge
 * Mandate: Direct Command Link between Maxx Executive and Anthony's Telegram.
 * Bot: @openlad_bot (CoTrendZoneBot)
 */
export class MaxxTelegramBridge {
    token;
    ownerId;
    constructor() {
        this.token = process.env.TELEGRAM_BOT_TOKEN || '';
        this.ownerId = process.env.TELEGRAM_OWNER_ID || '';
    }
    /**
     * SEND_ALERT: Pushes a secure message to the owner's Telegram.
     */
    async sendAlert(message) {
        if (!this.token || !this.ownerId) {
            console.warn('[TelegramBridge] NOT_CONFIGURED: Bot token or owner ID missing.');
            return;
        }
        const payload = JSON.stringify({
            chat_id: this.ownerId,
            text: message,
            parse_mode: 'Markdown'
        });
        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${this.token}/sendMessage`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                res.on('data', () => { });
                res.on('end', () => {
                    console.log(`[TelegramBridge] ALERT_SENT: Message dispatched to owner.`);
                    resolve();
                });
            });
            req.on('error', (e) => {
                console.error(`[TelegramBridge] SEND_FAILURE: ${e.message}`);
                reject(e);
            });
            req.write(payload);
            req.end();
        });
    }
    /**
     * SEND_PULSE: Sends the hourly Ghost Executive pulse report.
     */
    async sendPulseReport(status, agentsActive, worth, targets) {
        const msg = [
            `🏛 *SOVRA_APEX MANNIX — SOVEREIGN PULSE*`,
            ``,
            `⚡ *Status*: ${status}`,
            `🤖 *Active Agents*: ${agentsActive}`,
            `💎 *Enterprise Worth*: $${worth.toLocaleString()}`,
            `🎯 *Resources Found*: ${targets}`,
            `⏰ *Time*: ${new Date().toUTCString()}`,
            ``,
            `🔒 _Passport: SOVRA_APEX-SVR-2026 | Integrity: 100%_`
        ].join('\n');
        await this.sendAlert(msg);
    }
    /**
     * SEND_WINDOW_ALERT: Notifies the owner when a WLFI/Chain Window is detected.
     */
    async sendWindowAlert(contract, pool) {
        const msg = [
            `🚨 *MANNIX WINDOW DETECTED*`,
            ``,
            `📊 *Contract*: \`${contract}\``,
            `🏊 *Pool*: \`${pool}\``,
            ``,
            `*Maxx has identified an institutional opportunity.*`,
            `Login to your dashboard to review: http://localhost:3000/jarvis`
        ].join('\n');
        await this.sendAlert(msg);
    }
}
