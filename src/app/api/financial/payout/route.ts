import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { PaymentProcessor } from '@/lib/commerce/FinancialCore';

/**
 * Payout API Node - SOVRA Sovereign (v1.0_APEX)
 * Purpose: Secure Commercial Settlement Ingress
 * Mandate: EXE_AUTHORITY_REQUIRED
 */
export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await req.json();
    const { userId, amount, bankAccountToken, authKey } = body;

    // 1. Handshake Verification (SOVRA Master Interlock)
    // In a production scenario, we verify the temporal auth key
    // For now, we enforce a high-theta presence
    if (!userId || !amount || !bankAccountToken) {
       return NextResponse.json({ error: 'INGRESS_FAULT: Missing mandatory settlement fields.' }, { status: 400 });
    }

    // 2. Execution through Financial Core (Compliance + Stripe)
    const result = await PaymentProcessor.initiatePayout(userId, amount, bankAccountToken);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[FinancialAPI_Payout] Fault detected:', err.message);
    return NextResponse.json({ 
      error: 'SETTLEMENT_ABORTED', 
      detail: err.message,
      code: err.message.includes('KYC') ? 'COMPLIANCE_HOLD' : 'GATEWAY_ERROR'
    }, { status: 500 });
  }
}
