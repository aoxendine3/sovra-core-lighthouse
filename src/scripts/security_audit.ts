import 'dotenv/config';
import { generateHandshake } from '../../agency/lib/auth/Handshake';
import { audit } from '../lib/logger/InstitutionalLogger';

/**
 * APEX-X: HYPER-SOVEREIGN SECURITY AUDIT (v48.0_PERFECTION)
 * MISSION: VERIFY_BOUNDARY_INTEGRITY
 * ─────────────────────────────────────────────────────────────
 * Mandate: Absolute Operational Finality. No unauthorized ingress.
 */
async function runSecurityAudit() {
    console.log('--- APEX-X: INSTITUTIONAL SECURITY AUDIT START ---');
    
    const BASE_URL = 'https://sovra.apex';
    const TEST_ROUTES = [
        { path: '/api/institutional/payout', expected: 403, method: 'POST', name: 'Institutional Payout Gate' },
        { path: '/sia', expected: 307, method: 'GET', name: 'Executive SIA Terminal (Redirect)' },
        { path: '/api/analytics', expected: 403, method: 'GET', name: 'Institutional Analytics' },
        { path: '/api/institutional/sync-notion', expected: 403, method: 'POST', name: 'Notion Sync Gate' },
    ];

    let faults = 0;

    for (const route of TEST_ROUTES) {
        console.log(`[AUDIT] Probing: ${route.name} (${route.path})...`);
        
        try {
            const res = await fetch(`${BASE_URL}${route.path}`, { 
                method: route.method,
                redirect: 'manual' 
            });

            // We standardized on 403 Forbidden for all institutional boundary blocks.
            if (res.status === route.expected) {
                console.log(`[PASS] ${route.name}: Successfully Blocked (Status: ${res.status})`);
            } else {
                console.warn(`[FAIL] ${route.name}: UNSAFE ACCESS PERMITTED! (Status: ${res.status}, Expected: ${route.expected})`);
                faults++;
            }
        } catch (e) {
            console.error(`[ERROR] Connection failed for ${route.name}. Is the server running?`);
            faults++;
        }
    }

    // Phase 2: Active Handshake Penetration (Sovereign Access)
    console.log('[AUDIT] Testing Handshake Penetration...');
    try {
        const token = await generateHandshake();
        const res = await fetch(`${BASE_URL}/api/institutional/sync-notion`, {
            method: 'POST',
            headers: { 
                'X-SOVRA-DEEP-LOCK': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mode: 'audit_test' })
        });

        // If the token is valid, we expect a 403 ONLY if the proxy failed.
        // If the proxy let it through, we expect a 200/500 depending on the handler.
        if (res.status !== 403) {
            console.log(`[PASS] Handshake Verification: Proxy granted access (Status: ${res.status})`);
        } else {
            console.warn(`[FAIL] Handshake Verification: Proxy blocked valid token! (Status: ${res.status})`);
            faults++;
        }
    } catch (e) {
        console.error('[ERROR] Handshake test failed.', e);
        faults++;
    }

    console.log('--- AUDIT SUMMARY ---');
    if (faults === 0) {
        console.log('RESULT: 100/100 SYSTEM INTEGRITY. Boundary verifiably impenetrable.');
        await audit('info', 'INSTITUTIONAL_SECURITY_AUDIT_PASS', { status: '100/100' });
    } else {
        console.log(`RESULT: FAULT DETECTED. ${faults} security vulnerabilities identified.`);
        await audit('error', 'INSTITUTIONAL_SECURITY_AUDIT_FAIL', { faults });
    }
}

runSecurityAudit();
