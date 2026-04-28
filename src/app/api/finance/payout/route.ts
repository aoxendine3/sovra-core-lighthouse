import { NextResponse } from 'next/server';
import { ComplianceSentinelAgent } from '@agency/lib/agents/ComplianceSentinelAgent';
import { validateHandshake } from '@/lib/auth/Handshake';

/**
 * POST /api/finance/payout
 * Institutional Payout Gateway.
 * Mandate: v18.0_UNIFIED
 * Requires: Institutional Sovereign Handshake + L2 KYC Verification.
 */
export async function POST(req: Request) {
  // 1. UNITARY INSTITUTIONAL HANDSHAKE
  const isValidHandshake = await validateHandshake(req);

  if (!isValidHandshake) {
    return NextResponse.json({ 
      status: 'SOVEREIGN_BLOCK', 
      message: 'Proprietary SOVRA v18.0 Unified Handshake Required.' 
    }, { status: 401 });
  }

  try {
    const { amount, bankAccountToken, userId } = await req.json();

    if (!amount || !bankAccountToken || !userId) {
      return NextResponse.json({ status: 'FAULT', message: 'Missing Required Fields' }, { status: 400 });
    }

    const compliance = new ComplianceSentinelAgent();

    // 2. Institutional KYC Gate
    const isKyced = await compliance.verifyKYCStatus(userId);
    if (!isKyced) {
      return NextResponse.json({ 
        status: 'COMPLIANCE_BLOCK', 
        message: 'Institutional L2_GOVT_ID Identity Required.',
        instruction: 'Please verify your identity in the SOVRA Sovereign Identity Portal to ground this ledger pulse.'
      }, { status: 403 });
    }

    // 3. AML Risk Scan
    const amlStatus = await compliance.performAMLScan();
    if (amlStatus.status !== 'CLEAN') {
      return NextResponse.json({ 
        status: 'RISK_BLOCK', 
        message: 'Institutional Compliance Review Pending (AML Signal Detected).' 
      }, { status: 403 });
    }

    // 4. Institutional Sharded Routing (v18.0_UNIFIED)
    const node = await compliance.routePayout(amount);
    if (!node) {
      return NextResponse.json({ status: 'ROUTING_FAULT', message: 'Institutional Clearing Node Identification Failed.' }, { status: 500 });
    }

    // Success Signal (Institutional Ledger Pulse)
    console.log(`[PayoutGate] SUCCESS: Sharding $${amount} to ${node.id} via ${node.routing}`);
    
    return NextResponse.json({
      status: 'AUTHORIZED',
      sharding: {
        node: node.id,
        routing: node.routing,
        node_type: node.id === 'NODE_APEX' ? 'INSTITUTIONAL_CORE' : 'PERSONAL_LIQUIDITY',
        limit_high: node.threshold_max || 'UNLIMITED'
      },
      transactionId: `apex_pulse_${Date.now()}_${Math.random().toString(36).substring(7).toUpperCase()}`,
      mandate: 'v18.0_UNIFIED'
    });

  } catch (err) {
    return NextResponse.json({ 
      status: 'GATEWAY_FAULT', 
      message: (err as Error).message 
    }, { status: 500 });
  }
}
