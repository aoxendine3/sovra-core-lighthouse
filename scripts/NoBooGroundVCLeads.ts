import { SOVRADB } from '../jarvis/core/db/SOVRADB';

/**
 * SOVRA VC Lead Grounding (v1.5_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Capital Acquisition.
 * Purpose: Verifiably anchors the 'Warm Targets' for the Black Box strategy.
 */

async function groundVCLeads() {
    console.log('[SOVRA_Capital] GROUNDING_VC_LEADS...');
    
    const leads = [
        { name: 'Forum Ventures', sector: 'Autonomous_Systems', focus: 'Early-Stage_Outcome_Models' },
        { name: 'Armilar Venture Partners', sector: 'Agentic_Applications', focus: 'Vertical_Saturation' },
        { name: 'Heartfelt VC', sector: 'Marketing_Agents', focus: 'High-ROI_Outcome_Based' },
        { name: 'Radical Ventures', sector: 'Deep_AI_Logic', focus: 'Institutional_Infrastucture' }
    ];

    const db = await SOVRADB.getInstance();

    for (const lead of leads) {
        await SOVRADB.run(
            'INSERT INTO sovra_agency_leads (name, company, services, value_tier, status) VALUES (?, ?, ?, ?, ?)',
            [
                'Managing Partner',
                lead.name,
                'Black_Box_Output_Lease',
                'INSTITUTIONAL',
                'WARM_TARGET'
            ]
        );
        console.log(`[SOVRA_Capital] GROUNDED: ${lead.name}`);
    }

    console.log('[SOVRA_Capital] LEAD_GROUNDING_COMPLETE. READY_FOR_PITCH_IGNITION.');
}

groundVCLeads().catch(console.error);
