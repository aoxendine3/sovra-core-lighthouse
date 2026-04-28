import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { SOVRADB } from '@/../agency/lib/db/SOVRADB';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * MAXX_AGENCY_LEAD_INGRESS (v10.4)
 * ───────────────────────────────────────
 * MISSION: Institutional Lead Grounding
 * Mode: DEPTH_LOCK_ACTIVE
 */
export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await req.json();
    const { name, email, company, services, value_tier = 'HIGH_THETA' } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ error: 'INSULT_DATA_FAULT: Missing institutional identifiers.' }, { status: 400 });
    }

    const db = await SOVRADB.getInstance();
    
    // Ω_GROUNDING: Anchor the lead into the Sovereign Ledger
    await SOVRADB.run('INSERT INTO sovra_agency_leads', [
      name,
      email,
      company,
      services,
      value_tier
    ]);

    // APEX_PULSE: Log the ingress for the Executive Dashboard
    await SOVRADB.logAgentActivity(
      'InstitutionalLeadAgent',
      `Lead Grounded: ${company.toUpperCase()} (${name})`,
      'COMPLETED',
      { company, services, value_tier }
    );

    audit('info', 'INSTITUTIONAL_LEAD_GROUNDED', { company, email });

    return NextResponse.json({
      status: 'GROUNDED',
      trace_id: `APEX_${Date.now()}`,
      mandate: 'The Maxx Agency has received your request. An institutional specialist will initiate the audit pulse shortly.',
      handshake: SOVRADB.getTemporalAuthKey()
    });

  } catch (error: any) {
    console.error('[AgencyLeadAPI] INGRESS_FAULT:', error);
    return NextResponse.json({ 
      status: 'FAULT',
      error: 'INGRESS_DEGRADED',
      message: error.message 
    }, { status: 500 });
  }
}
