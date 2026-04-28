import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import fs from 'fs/promises';
import path from 'path';
import { validateHandshake } from '@/lib/auth/Handshake';

/**
 * Admin Status API (SOVRA V13.0 - Singularity Apex)
 * MISSION: QUANTUM_RESTORATION (v2026.11_APEX)
 * 
 * Mandate: Absolute institutional sovereignty via Deep Lock.
 */
export async function GET(req: Request) {
  try {
    // 1. SOVEREIGN_HANDSHAKE_VERIFICATION (v60.0)
    const isValid = await validateHandshake(req);
    
    if (!isValid) {
      console.warn(`[Shield] STATUS_BREACH: Unauthorized access attempt to /api/admin/status.`);
      return NextResponse.json({ 
        status: 'UNAUTHORIZED_EXPOSURE', 
        message: 'Institutional Sovereign Handshake (v60.0_SENTINEL) Required.' 
      }, { status: 401 });
    }

    const db = await SOVRADB.getInstance();
    const ledgerPath = path.join(process.cwd(), 'src/data/ledger.json');
    const ledger = JSON.parse(await fs.readFile(ledgerPath, 'utf8'));
    
    // Financial Node Grounding
    const dbRevenue = await db.get('SELECT SUM(gross_amount) as total FROM sovra_revenue');
    const affYield = await db.get('SELECT SUM(amount) as total FROM sovra_affiliate_earnings');
    const pendingPayouts = await db.get('SELECT SUM(amount) as total FROM sovra_payouts WHERE status = "PENDING"');
    
    const totalGross = (ledger.totalRevenue || 0) + (dbRevenue?.total || 0);

    return NextResponse.json({
      grossRevenue: totalGross,
      growthFund: ledger.growthFund || (totalGross * 0.15),
      affiliateYield: affYield?.total || 0,
      pendingPayouts: pendingPayouts?.total || 0,
      cashappLiquidity: ledger.liquidAssets?.cashapp_liquidity || 0,
      fulfillmentStatus: ledger.fulfillment_matrix?.status || 'UNKNOWN',
      stripeStatus: process.env.STRIPE_SECRET_KEY ? 'ONLINE' : 'OFFLINE',
      institutionalVersion: 'v13.0 (Singularity Apex)',
      recentActivity: await db.all('SELECT * FROM sovra_agent_logs ORDER BY timestamp DESC LIMIT 25'),
      status: 'OPERATIONAL',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[AdminStatusAPI] GROUNDING_FAULT:', error);
    return NextResponse.json({ status: 'ERROR', message: (error as Error).message }, { status: 500 });
  }
}
