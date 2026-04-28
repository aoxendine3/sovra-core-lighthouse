import { NextResponse } from 'next/server';
import { Web3Auth } from '@/lib/auth/Web3Auth';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { ComplianceSentinelAgent } from '@agency/lib/agents/ComplianceSentinelAgent';
import { validateHandshake } from '@/lib/auth/Handshake';
import { getSessionFromRequest } from '@/lib/auth/JWTAuth';
import { InstitutionalLogger, audit } from '@/lib/logger/InstitutionalLogger';
import Stripe from 'stripe';
import * as fs from 'fs';
import path from 'path';

/**
 * INSTITUTIONAL_PAYOUT_GATE (v1.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * MISSION: SECURE_ASSET_OUTFLOW
 * Security Grade: v65.0_SENTINEL_ELITE
 */

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  // 0. SOVEREIGN_HANDSHAKE_VERIFICATION (v60.0)
  const isValidHandshake = await validateHandshake(req);
  if (!isValidHandshake) {
    audit('warn', 'PAYOUT_INGRESS_BREACH', { ip, type: 'HANDSHAKE_FAILURE' });
    return NextResponse.json({ error: 'Institutional Sovereign Handshake (v60.0_SENTINEL) Required.' }, { status: 401 });
  }

  // 0.1. SESSION_ANCHOR_VERIFICATION (Absolute Sovereignty Standard)
  const session = getSessionFromRequest(req);
  if (!session) {
    audit('error', 'PAYOUT_SESSION_INVALID', { ip, type: 'JWT_FAILURE' });
    return NextResponse.json({ 
      error: 'INSTITUTIONAL_SESSION_REQUIRED', 
      detail: 'A valid executive JWT session must be anchored for this tranche.' 
    }, { status: 401 });
  }

  const compliance = new ComplianceSentinelAgent();

  try {
    const { amount, bankAccountToken, message, signature } = await req.json();

    if (!amount || !bankAccountToken || !message || !signature) {
      return NextResponse.json({ error: 'MISSING_REQUIRED_PAYLOAD_DATA' }, { status: 400 });
    }

    // 1. IDENTITY_GROUNDING: Cryptographic Signature Pulse
    const authResult = await Web3Auth.verifyExecutiveSignature(message, signature);
    
    if (!authResult.success) {
      audit('error', 'PAYOUT_AUTH_FAULT', { ip, address: authResult.address });
      return NextResponse.json({ error: 'UNAUTHORIZED_EXECUTIVE_SIGNATURE' }, { status: 401 });
    }

    audit('info', 'IDENTITY_GROUNDED', { executive: authResult.address, amount });

    // 2. COMPLIANCE_SENTINEL: AML Audit & KYC Gate Pulse
    const amlResult = await compliance.performAMLScan();
    if (amlResult.status !== 'CLEAN') {
       audit('error', 'COMPLIANCE_REVIEW_REJECTED', { error: amlResult.error });
       return NextResponse.json({ error: 'COMPLIANCE_REVIEW_PENDING', detail: amlResult.error }, { status: 403 });
    }

    // High-Theta KYC Enforcement for outflows > $500
    if (amount > 500) {
      const isKYCVerified = await compliance.verifyKYCStatus(authResult.address);
      if (!isKYCVerified) {
        audit('warn', 'PAYOUT_BLOCKED_KYC_REQUIRED', { executive: authResult.address, amount });
        return NextResponse.json({ 
          error: 'INSTITUTIONAL_KYC_REQUIRED', 
          detail: 'Outflows exceeding $500 require L2_GOVT_ID verification.' 
        }, { status: 403 });
      }
    }

    // 3. INSTITUTIONAL_SHARDING: Routing based on magnitude
    const selectedNode = await compliance.routePayout(amount);
    if (!selectedNode) {
       audit('error', 'ROUTING_FAULT', { amount });
       return NextResponse.json({ error: 'CLEARING_HOUSE_ROUTING_FAULT' }, { status: 500 });
    }

    // 4. STRIPE_SETTLEMENT: Handshake with selected clearing node
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-04-10' });
    
    // In a live sovereign environment, we would use the node's specific account routing.
    // For this build, we anchor to the provided bankAccountToken but log the node shard.
    const payout = await stripe.payouts.create({
      amount: Math.floor(amount * 100), // Convert to cents
      currency: 'usd',
      destination: bankAccountToken, 
      statement_descriptor: `APEX_${selectedNode.id}`,
      metadata: {
        node_id: selectedNode.id,
        routing_protocol: selectedNode.routing,
        executive: authResult.address,
        trace: 'v65.0_SENTINEL_ELITE'
      }
    });

    // 5. LEDGER_SYNCHRONIZATION: Writing Ground Truth
    const ledgerPath = path.resolve(process.cwd(), 'src/data/ledger.json');
    const ledgerData = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    
    ledgerData.liquidAssets.total -= amount;
    ledgerData.lastUpdated = new Date().toISOString();
    
    ledgerData.entries.unshift({
      timestamp: new Date().toISOString(),
      event: 'INSTITUTIONAL_PAYOUT',
      node: selectedNode.id,
      type: 'ASSET_OUTFLOW',
      amountUSD: -amount,
      status: payout.status,
      memo: `SovereignPayout successful via ${selectedNode.id}. [IP: ${ip}]`
    });

    fs.writeFileSync(ledgerPath, JSON.stringify(ledgerData, null, 2));

    // 6. DB_LOGGING & AUDIT
    await SOVRADB.trackRevenue(`PAYOUT_EVENT_${payout.id}`, -amount, -amount);

    audit('info', 'PAYOUT_SUCCESS', { 
        payoutId: payout.id, 
        amount, 
        nodeId: selectedNode.id,
        executive: authResult.address 
    });

    return NextResponse.json({ 
      success: true, 
      payoutId: payout.id, 
      status: payout.status,
      shardedNode: selectedNode.id,
      message: 'ASSET_OUTFLOW_SETTLED_VIA_SHARD'
    });

  } catch (err: any) {
    audit('error', 'PAYOUT_CRITICAL_FAULT', { error: err.message });
    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR', detail: err.message }, { status: 500 });
  }
}
