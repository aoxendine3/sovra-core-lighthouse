import { NextResponse } from 'next/server';
import { Director_Institutional_Equity } from '@agency/lib/agents/directors/Director_Institutional_Equity';
import { validateHandshake } from '@/lib/auth/Handshake';

/**
 * POST /api/treasury/sync
 * Synchronizes the physical asset manifest with the sovereign dashboard.
 * Mandate: v18.0_UNIFIED
 * Requires: Institutional Sovereign Handshake
 */
export async function POST(req: Request) {
  try {
    // SECURITY: UNITARY INSTITUTIONAL HANDSHAKE
    const isValidHandshake = await validateHandshake(req);

    if (!isValidHandshake) {
      console.warn('[SECURITY] TREASURY_SYNC_LOCK_FAILURE: Unauthorized sync attempt destroyed.');
      return NextResponse.json({ status: 'UNAUTHORIZED_ACCESS_TERMINATED' }, { status: 403 });
    }

    const director = new Director_Institutional_Equity();
    const manifest = await director.executeGlobalEquitySync();

    // Calibration: Ensure results align with dashboard expectations
    return NextResponse.json({
      ...manifest,
      protocol: 'v18.0_JWT_UNIFIED',
      syncStatus: 'SUCCESS_ANCHORED'
    });
  } catch (err) {
    console.error('[Treasury Sync API] Fault:', err);
    return NextResponse.json({ 
      status: 'GROUNDING_FAULT', 
      message: (err as Error).message 
    }, { status: 500 });
  }
}
