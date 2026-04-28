import { TonyDB } from '../../sovra/core/db/TonyDB';
import { MasterSkillsmanAgent } from '../../sovra/core/agents/MasterSkillsmanAgent';
import { GrowthAgent } from '../../sovra/core/agents/GrowthAgent';
import { LegalAgent } from '../../sovra/core/agents/LegalAgent';
import { ComplianceSentinelAgent } from '../../sovra/core/agents/ComplianceSentinelAgent';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * 🔒 SOVRA SECURE AUTONOMOUS WORKER (v1.0_Ω)
 * Mandate: No secrets in logs, strict sanitization, least privilege execution.
 */

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

class SecureWorker {
    private isRunning = false;
    private agents = {
        skillsman: new MasterSkillsmanAgent(),
        growth: new GrowthAgent(),
        legal: new LegalAgent(),
        compliance: new ComplianceSentinelAgent()
    };

    /**
     * Sanitizes strings to prevent credential leaking in logs.
     */
    private sanitize(input: string): string {
        const secrets = [
            process.env.GUMROAD_TOKEN,
            process.env.CJ_AFFILIATE_API_KEY,
            process.env.STRIPE_SECRET_KEY,
            process.env.HANDSHAKE_SECRET
        ].filter(Boolean) as string[];

        let sanitized = input;
        for (const secret of secrets) {
            sanitized = sanitized.split(secret).join('[REDACTED_SOVEREIGN_KEY]');
        }
        return sanitized;
    }

    private async log(agent: string, message: string, status: 'SUCCESS' | 'FAULT', metadata: any = {}) {
        const db = await TonyDB.getInstance();
        const sanitizedMessage = this.sanitize(message);
        const sanitizedMetadata = JSON.parse(this.sanitize(JSON.stringify(metadata)));

        console.log(`[${agent}] [${status}] ${sanitizedMessage}`);
        
        await db.logAgentActivity(agent, sanitizedMessage, status, sanitizedMetadata);
    }

    public async executePulse() {
        if (this.isRunning) return;
        this.isRunning = true;

        try {
            await this.log('SecureWorker', 'Initiating Sovereign Pulse...', 'SUCCESS');

            // 1. Compliance Sweep
            await this.log('ComplianceSentinel', 'Performing real-time IP audit...', 'SUCCESS');
            const audit = await this.agents.compliance.auditSystemIntegrity();
            if (audit.status !== 'GROUNDED') {
                throw new Error('Compliance Drift Detected: System Freeze Initiated.');
            }

            // 2. Growth Blitz (with Sticky Link Protocol)
            await this.log('GrowthAgent', 'Executing multi-channel saturation pulse...', 'SUCCESS');
            await this.agents.growth.executeAdBlast({
                productName: 'SOVRA Pro Mastery',
                platforms: ['X', 'Pinterest', 'LinkedIn'],
                copy: { hook: 'Institutional Sovereignty at Scale' },
                targetAudience: 'Elite Nodes',
                status: 'ACTIVE'
            });

            // 3. Mastery Finality
            await this.agents.skillsman.executeMasteryPulse();

            await this.log('SecureWorker', 'Pulse Cycle Complete.', 'SUCCESS', { timestamp: new Date().toISOString() });

        } catch (error: any) {
            await this.log('SecureWorker', `FATAL_FAULT: ${error.message}`, 'FAULT');
        } finally {
            this.isRunning = false;
        }
    }

    public start(intervalMinutes: number = 60) {
        console.log('⚡️ SOVRA SECURE WORKER STARTED');
        this.executePulse();
        setInterval(() => this.executePulse(), intervalMinutes * 60 * 1000);
    }
}

const worker = new SecureWorker();
worker.start(30);
