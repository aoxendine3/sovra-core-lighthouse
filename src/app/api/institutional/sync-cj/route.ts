import { NextResponse } from 'next/server';
import { Web3Auth } from '@/lib/auth/Web3Auth';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { validateHandshake } from '@/lib/auth/Handshake';
import { InstitutionalLogger, audit } from '@/lib/logger/InstitutionalLogger';
import axios from 'axios';
import * as fs from 'fs';
import path from 'path';

/**
 * INSTITUTIONAL_SYNC_CJ_NODE (v1.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * MISSION: REVENUE_RECONCILIATION
 */

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  // 0. SOVEREIGN_HANDSHAKE_VERIFICATION (v60.0)
  const isValidHandshake = await validateHandshake(req);
  if (!isValidHandshake) {
    audit('warn', 'CJ_SYNC_INGRESS_BREACH', { ip });
    return NextResponse.json({ error: 'Institutional Sovereign Handshake (v60.0_SENTINEL) Required.' }, { status: 401 });
  }

  audit('info', 'CJ_SYNC_STARTED', { ip });

  try {
    const { message, signature, address } = await req.json();

    // 1. IDENTITY_GATE: Web3 Signature Grounding
    const result = await Web3Auth.verifyExecutiveSignature(message, signature);
    
    if (!result.success) {
      audit('error', 'CJ_SYNC_AUTH_FAULT', { ip, address: result.address });
      return NextResponse.json({ error: 'UNAUTHORIZED_EXECUTIVE_SIGNATURE' }, { status: 401 });
    }

    audit('info', 'CJ_SYNC_IDENTITY_GROUNDED', { executive: result.address });

    // 2. DATA_BRIDGE: Fetch CJ Earnings
    const cjApiKey = process.env.CJ_AFFILIATE_API_KEY;
    if (!cjApiKey) throw new Error('MISSING_CJ_API_KEY');

    // Fetch approved commissions from the last 30 days
    const cjResponse = await axios.get('https://api.cj.com/v2/earnings', {
      headers: { 'Authorization': `Bearer ${cjApiKey}` },
      params: { 'date-range': 'last-30-days', status: 'approved' },
    });

    const earnings = cjResponse.data.earnings || [];
    let totalSynced = 0;

    // 3. SOVEREIGN_GROUNDING: Pulse into DB and Ledger
    for (const earning of earnings) {
      const amount = parseFloat(earning.amount);
      await SOVRADB.trackRevenue(
        `CJ_AFFILIATE_${earning.cj_transaction_id}`,
        amount,
        amount 
      );
      totalSynced += amount;
    }

    // 4. LEDGER_SYNCHRONIZATION: Update ledger.json
    if (totalSynced > 0) {
      const ledgerPath = path.resolve(process.cwd(), 'src/data/ledger.json');
      const ledgerData = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
      
      ledgerData.liquidAssets.total += totalSynced;
      ledgerData.lastUpdated = new Date().toISOString();
      
      ledgerData.entries.unshift({
        timestamp: new Date().toISOString(),
        event: 'INSTITUTIONAL_CJ_SYNC',
        type: 'REVENUE_RECON',
        amountUSD: totalSynced,
        status: 'SETTLED',
        memo: `Synchronized ${earnings.length} commission pulses from CJ Affiliate gateway.`
      });

      fs.writeFileSync(ledgerPath, JSON.stringify(ledgerData, null, 2));
    }

    audit('info', 'CJ_SYNC_COMPLETE', { pulses: earnings.length, totalAmount: totalSynced });

    return NextResponse.json({ 
      success: true, 
      syncedCount: earnings.length, 
      totalAmount: totalSynced,
      message: 'REVENUE_RECONCILIATION_COMPLETE' 
    });

  } catch (err: any) {
    audit('error', 'CJ_SYNC_FAULT', { error: err.message });
    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
