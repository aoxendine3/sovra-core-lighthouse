import { SOVRADB } from '../../agency/lib/db/SOVRADB.js';

async function testAgencyPulse() {
    console.log('--- STARTING MAXX AGENCY PULSE TEST ---');
    
    // 1. Initial Stats
    const initialStats = await SOVRADB.getEnterpriseStats();
    console.log('[Test] Initial Institutional Leads:', initialStats.institutionalLeads);
    console.log('[Test] Initial Agency Leads:', initialStats.agencyLeads);

    // 2. Mock Lead Ingress
    console.log('[Test] Triggering Mock Lead Ingress...');
    await SOVRADB.run('INSERT INTO sovra_agency_leads', [
        'Anthony Stark',
        'tony@starkindustries.com',
        'Stark Industries',
        'AI WORKFLOW AUTOMATION',
        'ULTIMATE_THETA'
    ]);

    // 3. Mock Contract Ingress
    console.log('[Test] Triggering Mock Contract Ingress...');
    await SOVRADB.run('INSERT INTO sovra_contracts', [
        1, // lead_id
        'OPEN',
        150000,
        'SIG_STARK_INDUSTRIAL'
    ]);

    // 4. Update Stats
    const finalStats = await SOVRADB.getEnterpriseStats();
    console.log('[Test] Final Institutional Leads:', finalStats.institutionalLeads);
    console.log('[Test] Final Agency Leads:', finalStats.agencyLeads);
    console.log('[Test] Final Pipeline Value:', finalStats.pipelineValue);

    if (finalStats.agencyLeads > initialStats.agencyLeads && finalStats.pipelineValue > 0) {
        console.log('[Test] MAXX_AGENCY_PULSE: 100/100 SUCCESS.');
    } else {
        console.error('[Test] MAXX_AGENCY_PULSE: FAILED (Stats Mismatch).');
    }
}

testAgencyPulse();
