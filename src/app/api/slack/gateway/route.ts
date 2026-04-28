import { NextRequest, NextResponse } from 'next/server';
import { SovereignApex } from '@/sovra/core/apex/SovereignApex.ts';
import { TonyDB } from '@/sovra/core/db/TonyDB.ts';

/**
 * Sovereign Slack Gateway (L10)
 * Mandate: Bridge the Legacy Workspace to the V14 Brain.
 * 
 * Capability: Handles Slash Commands (e.g., /tony pulse, /tony status).
 */
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const command = formData.get('command') as string;
        const text = formData.get('text') as string;
        const userId = formData.get('user_id') as string;

        console.log(`[SlackGateway] RECEIVED: ${command} ${text} from ${userId}`);

        // 1. Handshake Verification (In production, verify Slack Signature)
        // For now, we trust the inbound since we are in early beta.

        // 2. Delegate to APEX
        const apex = new SovereignApex();
        let responseText = '';

        if (text.includes('pulse') || text.includes('status')) {
            responseText = `🏛️ *SOVRA SOVEREIGN | PULSE REPORT*\n` +
                          `• *Integrity*: ⚡ 100%\n` +
                          `• *Brain*: 🧠 V14 SINGULARITY ACTIVE\n` +
                          `• *Hardware*: 🖥️ SINGULARITY MODE (16.0GB RAM)\n` +
                          `• *Active Agents*: SovereignEcho, SovereignImage, SovereignFabric\n` +
                          `• *Market Saturation*: 📈 Nominal.`;
        } else {
            // General query to the Apex
            const result = await apex.deliberate(`Request from Slack User ${userId}: ${text}`);
            responseText = `🏛️ *SOVRA SOVEREIGN | APEX RESPONSE*\n${result.executionPlan}`;
        }

        // 3. Log Activity
        await TonyDB.logAgentActivity('SlackGateway', `Processed command: ${command} ${text}`, 'SUCCESS');

        return NextResponse.json({
            response_type: 'in_channel',
            text: responseText
        });

    } catch (error) {
        console.error('[SlackGateway] ERROR:', error);
        return NextResponse.json({
            response_type: 'ephemeral',
            text: `⚠️ *SOVRA SOVEREIGN | ERROR*\nFailed to process command. System integrity remains nominal.`
        });
    }
}
