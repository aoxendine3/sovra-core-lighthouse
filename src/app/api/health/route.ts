import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import axios from 'axios';
import { SOVRADB } from '@/lib/db/SOVRADB';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10' as any,
});

/**
 * Health API Node - SOVRA Sovereign (v1.0_APEX)
 * Purpose: Global System Integrity Pulse
 */
export async function GET(req: Request, ) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const health: any = {
    database: 'unknown',
    stripe: 'unknown',
    cjAffiliate: 'unknown',
    timestamp: new Date().toISOString(),
    status: 'OPTIMAL'
  };

  try {
    // 1. Ghost-Ledger Scan
    await SOVRADB.getInstance();
    health.database = 'GHOST_SYNCHRONIZED';
  } catch (e) {
    health.database = 'FAULT';
    health.status = 'DEGRADED';
  }

  try {
    // 2. Stripe Handshake
    await stripe.balance.retrieve();
    health.stripe = 'CONNECTED';
  } catch (e) {
    health.stripe = 'HANDSHAKE_FAULT';
    health.status = 'DEGRADED';
  }

  try {
    // 3. CJ Ingress Audit
    const cjApiKey = process.env.CJ_AFFILIATE_API_KEY;
    if (cjApiKey) {
        await axios.get('https://api.cj.com/v2/account', {
            headers: { 'Authorization': `Bearer ${cjApiKey}` },
            timeout: 5000,
        });
        health.cjAffiliate = 'CONNECTED';
    } else {
        health.cjAffiliate = 'KEY_MISSING';
        health.status = 'DEGRADED';
    }
  } catch (e) {
    health.cjAffiliate = 'INGRESS_FAULT';
    health.status = 'DEGRADED';
  }

  return NextResponse.json(health, { status: health.status === 'OPTIMAL' ? 200 : 503 });
}
