import { NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { SOVRADB } from '@/../sovra/core/db/SOVRADB';
import { SOVRAMemory } from '@/lib/agents/SOVRAMemory';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * SOVRA Sovereign Ingress (v1.5_Ω_ASCENSION)
 * ─────────────────────────────────────────────────────────────
 * MISSION: TACTICAL_STRATEGY_AUTONOMY
 * Patterns: Learn -> Reason -> Calibrate -> Persist.
 */
export async function POST(req: Request) {
  try {
    // 1. SECURITY_VERIFICATION (512-bit PQ + AEGIS_SENTINEL)
    const isValidHandshake = await validateHandshake(req);
    if (!isValidHandshake) {
      audit('warn', 'NOBOO_SECURITY_FAULT', { type: 'UNAUTHORIZED_STRATEGY_ATTEMPT' });
      return NextResponse.json({ status: 'UNAUTHORIZED_ACCESS_TERMINATED' }, { status: 403 });
    }

    const { AegisSentinel } = await import('@/lib/security/AegisSentinel');
    const isSafe = await AegisSentinel.monitorIngress(req);
    if (!isSafe) {
      return NextResponse.json({ 
        status: 'GHOST_PROTOCOL_ENGAGED', 
        message: 'Node verifiably isolated. Trace initialized.' 
      }, { status: 403 });
    }

    const { message, sessionId, email, dwellIncrement } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'TACTICAL_QUERY_REQUIRED' }, { status: 400 });
    }

    // 2. AGENTIC_MEMORY_PULSE: Recall past context
    const previousInsight = await SOVRAMemory.recallTopic(`TACTICAL_CONTEXT:${email || 'GLOBAL'}`);
    
    // 3. MISSION_IGNITION: Execute via SOVRA Agent Army
    audit('info', 'NOBOO_STRATEGY_INITIATED', { message, context: previousInsight ? 'RECALLED' : 'FRESH' });
    
    const { NOBOO } = await import('@/../sovra/core/agents/NOBOO.ts');
    const sovra = new NOBOO();
    await sovra.igniteSentience();

    let strategyResponse: string;
    let confidenceScore = 0.98;

    // Use Reflection Pattern: Calibrate based on previous insights
    const prompt = previousInsight ? `[Context: ${previousInsight}] ${message}` : message;
    
    if (message.toLowerCase().includes('unblock') || message.toLowerCase().includes('fix')) {
      const plan = await sovra.unblock(prompt);
      strategyResponse = `NOBOO_Ω: Bottleneck Analyzed. Solution: ${plan.solution}. Maneuvers: ${plan.maneuvers.join(', ')}`;
    } else {
      // TRIPLE_LOCK_CONSENSUS: The 100/1 Gold Standard
      const { ConsensusCore } = await import('@/lib/agents/ConsensusCore');
      const report = await ConsensusCore.executeTripleLock(prompt);
      strategyResponse = report.finalStrategy;
      confidenceScore = report.confidence;
    }

    // 4. LEARNING_PERSISTENCE: Commit the maneuver to Agentic Memory
    await SOVRAMemory.commitLearning(
        'SOVRASovereign', 
        `TACTICAL_CONTEXT:${email || 'GLOBAL'}`, 
        `Maneuver: ${message.substring(0, 100)}... Result: Success`
    );

    // Ground in Session Ledger
    if (sessionId && email) {
      await SOVRADB.recordNobooSession(sessionId, email, dwellIncrement || 0);
    }

    audit('info', 'NOBOO_STRATEGY_SUCCESS', { message, status: 'Ω_ASCENSION' });

    return NextResponse.json({ 
      response: strategyResponse,
      status: 'Ω_SUCCESS',
      protocol: 'v2.1_Ω_TRIPLE_LOCK',
      confidence: confidenceScore,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[SOVRA_Ingress] FAULT:', error);
    audit('error', 'NOBOO_STRATEGY_FAULT', { error: error.message });
    return NextResponse.json({ error: 'STRATEGY_FAULT' }, { status: 500 });
  }
}
