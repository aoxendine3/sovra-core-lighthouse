import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import Stripe from 'stripe';
import axios from 'axios';
import * as fs from 'fs';
import path from 'path';
import { validateHandshake } from '@/lib/auth/Handshake';
import { InstitutionalLogger, audit } from '@/lib/logger/InstitutionalLogger';

/**
 * INSTITUTIONAL_HEALTH_NODE (v1.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * MISSION: SYSTEM_INTEGRITY_AUDIT
 */
export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  // 1. Sovereign Handshake Verification (v60.0)
  const isValid = await validateHandshake(req);
  if (!isValid) {
    audit('warn', 'HEALTH_AUDIT_BREACH', { ip });
    return NextResponse.json({ 
        status: 'UNAUTHORIZED_EXPOSURE', 
        message: 'Institutional Sovereign Handshake (v60.0_SENTINEL) Required.' 
    }, { status: 401 });
  }

  audit('info', 'HEALTH_AUDIT_START', { ip });

  const checks: any = {
    database: 'unknown',
    stripe: 'unknown',
    cjAffiliate: 'unknown',
    ledger: 'unknown',
    timestamp: new Date().toISOString(),
  };

  try {
    // 1. Audit SOVRADB
    const db = await SOVRADB.getInstance();
    await db.get('SELECT 1');
    checks.database = 'Healthy [SOVRADB Node Active]';
  } catch (err: any) {
    checks.database = `Unhealthy: ${err.message}`;
  }

  try {
    // 2. Audit Stripe Connectivity
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-04-10',
    });
    await stripeInstance.accounts.retrieve(); 
    checks.stripe = 'Healthy [Stripe Global Bridge Active]';
  } catch (err: any) {
    checks.stripe = `Unhealthy: ${err.message}`;
  }

  try {
    // 3. Audit CJ Affiliate API
    const cjApiKey = process.env.CJ_AFFILIATE_API_KEY;
    if (!cjApiKey) throw new Error('MISSING_CJ_API_KEY');
    
    await axios.get('https://api.cj.com/v2/account', {
      headers: { 'Authorization': `Bearer ${cjApiKey}` },
      timeout: 5000,
    });
    checks.cjAffiliate = 'Healthy [CJ Data Stream Active]';
  } catch (err: any) {
    checks.cjAffiliate = `Unhealthy: ${err.message}`;
  }

  try {
    // 4. Audit Ledger Integrity
    const ledgerPath = path.resolve(process.cwd(), 'src/data/ledger.json');
    const stats = fs.statSync(ledgerPath);
    const data = fs.readFileSync(ledgerPath, 'utf8');
    const ledger = JSON.parse(data);
    
    checks.ledger = {
      status: 'Healthy [Ground Truth Anchored]',
      sizeBytes: stats.size,
      totalEntries: ledger.entries?.length || 0,
      liquidTotal: ledger.liquidAssets?.total || 0,
    };
  } catch (err: any) {
    checks.ledger = `Fault: ${err.message}`;
  }

  const isHealthy = Object.values(checks).every(v => 
    typeof v === 'string' ? v.includes('Healthy') : (v as any).status?.includes('Healthy')
  );

  audit('info', 'HEALTH_AUDIT_COMPLETE', { isHealthy });

  return NextResponse.json({ 
    status: isHealthy ? 'APEX_SYSTEM_INTEGRITY_STABLE' : 'SYSTEM_FAULT_DETECTED',
    checks 
  }, { status: isHealthy ? 200 : 503 });
}
