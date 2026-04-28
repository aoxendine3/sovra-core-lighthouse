import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { validateHandshake } from '@/lib/auth/Handshake';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * INSTITUTIONAL_DEPLOYMENT_INGRESS (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: INFRASTRUCTURE_SOVEREIGNTY_LOGGING
 * Purpose: Verifiably records system deployments and asset launches.
 */

export async function GET(req: Request) {
  try {
    const db = await SOVRADB.getInstance();
    const deployments = await db.all('SELECT * FROM sovra_deployments ORDER BY timestamp DESC LIMIT 100');
    return NextResponse.json(deployments);
  } catch (error: any) {
    audit('error', 'DEPLOYMENT_QUERY_FAULT', { error: error.message });
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. SECURE_INGRESS: Handshake Verification
    const isValid = await validateHandshake(req);
    if (!isValid) {
      audit('warn', 'DEPLOYMENT_LOG_BREACH', { ip: req.headers.get('x-forwarded-for') });
      return NextResponse.json({ error: 'UNAUTHORIZED_INFRASTRUCTURE_ACCESS' }, { status: 401 });
    }

    const { target, asset, status, trace = 'v2026.11_SOVRA' } = await req.json();

    if (!target || !asset) {
      return NextResponse.json({ error: 'MISSING_DEPLOYMENT_METADATA' }, { status: 400 });
    }

    // 2. SOVEREIGN_GROUNDING: Pulse into DB
    const db = await SOVRADB.getInstance();
    const result = await db.run(`
      INSERT INTO sovra_deployments (target, asset, status, trace)
      VALUES (?, ?, ?, ?)
    `, [target, asset, status || 'SUCCESS', trace]);

    // 3. INSTITUTIONAL_AUDIT: Verifiable logging
    audit('info', 'INFRASTRUCTURE_DEPLOYMENT_RECORDER', { 
        id: result.lastID, 
        target, 
        asset, 
        status 
    });

    return NextResponse.json({ 
        success: true, 
        deploymentId: result.lastID,
        message: 'DEPLOYMENT_VERIFIABLY_GROUNDED' 
    });

  } catch (err: any) {
    audit('error', 'DEPLOYMENT_INGRESS_FAULT', { error: err.message });
    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
