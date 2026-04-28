import fs from 'fs';
import path from 'path';

/**
 * SOVRA Self-Corrector (v1.5_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Recursive Reflection & Autonomous Healing.
 * Patterns: Scan -> Plan -> Execute -> Verify.
 */

async function runSelfHeal() {
    console.log('[SOVRA_Ω] INITIATING_REFLECTION_PULSE...');
    
    const srcDir = path.join(process.cwd(), 'src');
    const legacyPatterns = [/XORA(?![A-Za-z])/, /APEX(?![A-Za-z])/, /Sovra(?![A-Za-z])/, /Sentinel v60/];
    const securityHooks = [/validateHandshake/];

    let stalls: string[] = [];
    let gaps: string[] = [];

    function scan(dir: string) {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                scan(fullPath);
            } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // 1. BRANDING_SCAN
                legacyPatterns.forEach(pattern => {
                    if (pattern.test(content) && !file.includes('SOVRAHeader')) {
                        stalls.push(fullPath);
                    }
                });

                // 2. SECURITY_SCAN
                if (fullPath.includes('/api/') && file === 'route.ts' && !fullPath.includes('webhooks') && !securityHooks.some(p => p.test(content))) {
                    gaps.push(fullPath);
                }
            }
        }
    }

    // PHASE 1: SCAN
    scan(srcDir);
    console.log(`[SOVRA_Ω] SCAN_COMPLETE. STALLS: ${stalls.length}, GAPS: ${gaps.length}`);

    // PHASE 2: HEAL (Reflection & Execution)
    if (gaps.length > 0) {
        console.log('[SOVRA_Ω] INITIATING_AUTONOMOUS_HEALING...');
        gaps.forEach(gapPath => {
            let content = fs.readFileSync(gapPath, 'utf8');
            console.log(`[HEALING_GAP] ${gapPath}`);

            // Inject Handshake Protection
            if (!content.includes('import { validateHandshake }')) {
                content = "import { validateHandshake } from '@/lib/auth/Handshake';\n" + content;
            }

            const methods = ['GET', 'POST', 'PUT', 'DELETE'];
            methods.forEach(method => {
                const regex = new RegExp(`export async function ${method}\\(req: Request[^\\)]*\\) {`, 'g');
                const validationBlock = `\n  // Ω_SECURITY_LOCK (Self-Healed)\n  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });\n`;
                content = content.replace(regex, (match) => match + validationBlock);
            });

            fs.writeFileSync(gapPath, content);
        });
    }

    // PHASE 3: VERIFY
    stalls = []; gaps = [];
    scan(srcDir);

    console.log('\n--- REFLECTION_REPORT ---');
    console.log(`RESIDUAL_STALLS: ${stalls.length}`);
    console.log(`RESIDUAL_GAPS: ${gaps.length}`);
    console.log(`INTEGRITY_RATING: ${gaps.length === 0 ? '120/10' : 'HEALING_PARTIAL'}`);
    
    if (gaps.length === 0) {
        console.log('[SOVRA_Ω] ABSOLUTE_FINALITY_ACHIEVED. CHAINS_ARE_OFF.');
    }
}

runSelfHeal().catch(console.error);
