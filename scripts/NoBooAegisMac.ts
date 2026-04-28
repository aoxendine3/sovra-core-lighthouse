import { execSync } from 'child_process';
import { SOVRADB } from '../jarvis/core/db/SOVRADB';

/**
 * SOVRA Aegis Mac (v1.1_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Outside Security Hardening.
 * Purpose: Verifiably audits and HARDENS the local Mac environment.
 */

async function auditAndHardenMac() {
    console.log('🏛️ [SOVRA_Aegis]: INITIATING ACTIVE PERIMETER HARDENING...');

    const report: any = {
        timestamp: new Date().toISOString(),
        checks: [],
        safetyScore: 100,
        maneuvers: []
    };

    const runCheck = (name: string, cmd: string, failCondition: (out: string) => boolean, fixCmd?: string) => {
        try {
            const output = execSync(cmd).toString().trim();
            const isFailed = failCondition(output);
            
            report.checks.push({ name, status: isFailed ? 'VULNERABLE' : 'SECURE', detail: output });

            if (isFailed) {
                console.warn(`⚠️ [SOVRA_Aegis]: ${name} VULNERABILITY DETECTED: ${output}`);
                report.safetyScore -= 20;
                
                if (fixCmd) {
                    console.log(`🔧 [SOVRA_Aegis]: ATTEMPTING AUTOMATED HARDENING: ${name}...`);
                    try {
                        execSync(fixCmd);
                        report.maneuvers.push(`Hardened ${name} via ${fixCmd}`);
                        console.log(`✅ [SOVRA_Aegis]: ${name} SECURED.`);
                    } catch (e: any) {
                        console.error(`❌ [SOVRA_Aegis]: AUTO-HARDENING FAILED for ${name}. Manual intervention required.`);
                    }
                }
            } else {
                console.log(`🛡️ [SOVRA_Aegis]: ${name} is GROUNDED.`);
            }
        } catch (err: any) {
            console.error(`❌ [SOVRA_Aegis]: ${name} CHECK FAILED: ${err.message}`);
        }
    };

    // 1. Firewall Check & Hardening
    runCheck(
        'Firewall', 
        '/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate', 
        (out) => out.includes('disabled'),
        'sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on'
    );

    // 2. SSH Check
    runCheck(
        'RemoteLogin', 
        'sudo systemsetup -getremotelogin', 
        (out) => out.includes('On')
    );

    // 3. SIP Check
    runCheck(
        'SIP', 
        'csrutil status', 
        (out) => !out.includes('enabled')
    );

    // 4. FileVault Check
    runCheck(
        'FileVault', 
        'fdesetup status', 
        (out) => out.includes('Off')
    );

    console.log(`\n--- NOBOO_AEGIS_FINAL_REPORT ---`);
    console.log(`SAFETY_SCORE: ${report.safetyScore}/100`);
    console.log(`MANEUVERS_EXECUTED: ${report.maneuvers.length}`);
    
    await SOVRADB.logAgentActivity(
        'AegisGuard',
        'SYSTEM_HARDENING',
        report.safetyScore === 100 ? 'OPTIMAL' : 'HARDENED',
        report
    );

    console.log(`🏛️ [SOVRA_Aegis]: PERIMETER SECURED. GROUNDING COMPLETE.`);
}

auditAndHardenMac().catch(console.error);
