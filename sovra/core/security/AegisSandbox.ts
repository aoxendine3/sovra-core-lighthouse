import { TonyDB } from '../db/TonyDB.ts';

/**
 * AEGIS_SANDBOX (v1.0_PROT)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Absolute safety for autonomous agent execution.
 * 
 * Purpose: Intercepts and audits all terminal/filesystem commands 
 * before they are allowed to touch the host system.
 */
export class AegisSandbox {
    private static dangerousPatterns = [
        /rm -rf \//,
        /chmod -R 777/,
        /: \(\)\{ :\|:& \};:/, // Fork bomb
        /mv .* \/dev\/null/,
        /> \/dev\/sda/,
        /curl .* \| bash/,
        /wget .* \| sh/,
        /sudo /,
        /cat \/etc\/shadow/,
        /cat \/etc\/passwd/
    ];

    private static allowedPaths = [
        process.cwd(),
        '/Users/ajoxendine68/.gemini/sovra_sovereign'
    ];

    /**
     * Audit: Returns true if the command is safe to execute.
     */
    public static async auditCommand(command: string): Promise<{ safe: boolean; reason?: string }> {
        // 1. Pattern Matching
        for (const pattern of this.dangerousPatterns) {
            if (pattern.test(command)) {
                await this.logViolation(command, `Dangerous pattern detected: ${pattern}`);
                return { safe: false, reason: `DANGEROUS_PATTERN_DETECTED: ${pattern}` };
            }
        }

        // 2. Destructive Command Check
        const destructive = ['rm', 'mv', 'chmod', 'chown', 'dd'];
        const parts = command.trim().split(/\s+/);
        if (destructive.includes(parts[0])) {
            // Check if it's within allowed paths
            const target = parts[parts.length - 1];
            const isAllowed = this.allowedPaths.some(p => target.startsWith(p) || target === '.' || target === './');
            
            if (!isAllowed && !command.includes('--help')) {
                await this.logViolation(command, `Attempted destructive operation outside of allowed perimeters: ${target}`);
                return { safe: false, reason: 'OUT_OF_BOUNDS_DESTRUCTION' };
            }
        }

        return { safe: true };
    }

    private static async logViolation(command: string, detail: string) {
        const db = await TonyDB.getInstance();
        await db.logAgentActivity('AEGIS_SANDBOX', 'COMMAND_VIOLATION_INTERCEPTED', 'BLOCKED', { command, detail });
        console.warn(`[AEGIS_SANDBOX] VIOLATION_BLOCKED: ${detail} | Command: ${command}`);
    }
}
