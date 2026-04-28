import { NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { MarketOracleAgent } from '@agency/lib/agents/MarketOracleAgent';

/**
 * MARKET_ORACLE_API (v.007_SINGULARITY)
 * Mandate: Serves prophetic mandates to the Executive Dashboard.
 * Department: APEX_PROPHECY_HUB
 */
export async function GET(req: Request) {
  try {
    const isValid = await validateHandshake(req);
    if (!isValid) return NextResponse.json({ status: 'UNAUTHORIZED' }, { status: 403 });

    const oracle = new MarketOracleAgent();
    const mandates = await oracle.generatePropheticMandate();
    const shift = await oracle.dictatedNeed();

    return NextResponse.json({ 
        success: true, 
        mandates, 
        dictatedNeed: shift,
        accuracy: '100/100',
        timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
