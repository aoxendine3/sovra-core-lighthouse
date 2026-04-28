import { CoreKernel } from '../maxx/kernel.ts';
import { TonyDB } from '../db/TonyDB.ts';
import axios from 'axios';

/**
 * SovereignEchoAgent (THE HERALD)
 * Mandate: Absolute Communication Transparency.
 * 
 * Logic: Manages internal and external communication channels (Slack, Matrix, Mattermost).
 * Capabilities: Status Notifications, Ledger Reporting, Trinity Deliberation Broadcasts.
 */
export class SovereignEchoAgent extends CoreKernel {
    private slackWebhook = ''; // User to provide or stored in DB

    constructor() {
        super();
    }

    /**
     * BROADCAST: Sends a message across all active channels.
     */
    async broadcast(message: string, priority: 'LOW' | 'HIGH' | 'CRITICAL' = 'LOW') {
        console.log(`[SovereignEcho] BROADCASTING: "${message.substring(0, 50)}..." [${priority}]`);
        
        // 1. Log to Internal Ledger
        await TonyDB.logAgentActivity('SovereignEcho', message, 'SUCCESS');

        // 2. Post to Legacy Channel (Slack) - If configured
        if (this.slackWebhook) {
            await this.postToSlack(message, priority);
        }

        // 3. Post to Sovereign Channel (Mattermost/Matrix) - Future L9 Integration
        // TODO: Implement Mattermost/Matrix Handshake
    }

    /**
     * POST_TO_SLACK: Sends a message to the provided Slack workspace.
     */
    private async postToSlack(message: string, priority: string) {
        try {
            const icon = priority === 'CRITICAL' ? '🚨' : priority === 'HIGH' ? '⚠️' : 'ℹ️';
            await axios.post(this.slackWebhook, {
                text: `${icon} *SOVRA SOVEREIGN | ${priority}*\n${message}`
            });
        } catch (error) {
            console.error('[SovereignEcho] SLACK_FAILURE: Check webhook configuration.');
        }
    }

    /**
     * CONFIGURE: Updates communication channel credentials.
     */
    async configure(channels: { slackWebhook?: string }) {
        if (channels.slackWebhook) {
            this.slackWebhook = channels.slackWebhook;
            console.log('[SovereignEcho] SLACK_CHANNEL_CONFIGURED');
        }
    }
}
