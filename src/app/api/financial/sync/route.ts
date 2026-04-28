import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { CJAffiliateSyncService } from '@/lib/commerce/FinancialCore';

/**
 * Commercial Sync Node - SOVRA Sovereign (v1.0_APEX)
 * Purpose: CJ Affiliate Commission Ingestion
 */
export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const { userId } = await req.json();
    
    if (!userId) {
       return NextResponse.json({ error: 'SYNC_FAULT: Missing institutional userId.' }, { status: 400 });
    }

    const result = await CJAffiliateSyncService.syncCommissions(userId);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[FinancialAPI_Sync] Pulse fault:', err.message);
    return NextResponse.json({ 
      error: 'SYNCHRONIZATION_FAILED', 
      detail: err.message,
      code: 'API_NODE_UNREACHABLE'
    }, { status: 500 });
  }
}
