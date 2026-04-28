export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { RentalAgent } from '@agency/lib/agents/RentalAgent';
import { SOVRADB } from '@agency/lib/db/SOVRADB';

const rental = new RentalAgent();

/**
 * AaaS (Agent-as-a-Service) EXECUTION GATEWAY: v18.0_APEX
 * Proves the viability of the Handshake framework as a revenue source.
 */
export async function POST(req: Request) {
  try {
    // SECURITY: UNITARY INSTITUTIONAL HANDSHAKE (v18.0)
    const isValidHandshake = await validateHandshake(req);

    if (!isValidHandshake) {
      console.warn('[SECURITY] RENTAL_LOCK_FAILURE: Unauthorized lease attempt destroyed.');
      return NextResponse.json({ status: 'UNAUTHORIZED_ACCESS_TERMINATED' }, { status: 403 });
    }

    const { agentType, query, paymentStatus } = await req.json();

    if (!agentType || !query) {
      return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 });
    }

    // 1. Execute the rented agent session
    const result = await rental.deployRentedAgent(agentType, query, paymentStatus || 'CLEARED');

    // 2. Log Revenue in Ledger (Real-Time Monetization)
    if (result.status === 200 || result.status === 'SUCCESS') {
      const amount = result.invoiceDeducted || 50.00;
      await SOVRADB.trackRevenue(`Rental_Session_${agentType}`, amount, amount);
      
      await SOVRADB.logAgentActivity(
        'RentalExecutionProxy',
        `Agent Lease Executed: ${agentType}`,
        'COMPLETED',
        { 
          agentType, 
          query, 
          amount,
          protocol: 'v18.0_JWT_UNIFIED',
          timestamp: new Date().toISOString()
        }
      );
    }

    return NextResponse.json({
      ...result,
      protocol: 'v18.0_JWT_UNIFIED',
      executionChain: 'APEX_PRIME'
    });
  } catch (error) {
    console.error('[RentalAPI] Fail:', error);
    return NextResponse.json({ error: 'EXECUTION_FAIL' }, { status: 500 });
  }
}
