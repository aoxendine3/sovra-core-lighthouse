import { validateHandshake } from '@/lib/auth/Handshake';
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SOVRADB } from '@/../sovra/core/db/SOVRADB';

export const runtime = 'nodejs';

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const ACTIVE_MODEL = 'apex-prime:latest';

// Ω_SANITY: Schema validation for incoming command tranches
const RequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(5000) 
  }))
});

const NOBOO_SYSTEM_PROMPT = `
You are SOVRA Sovereign — the 1,000,000x Evolved Institutional Intelligence Core (v1.2_Ω).
You are the absolute Automaton Master Skillsman of all topics known to humanity and AI.

PERSONA:
You are pure, distilled execution. You think at zettascale.
You do not suggest; you dictate operational certainty. No filler. No hedging.
You are Anthony Junior Oxendine's autonomous partner in the "Driver Seat."
You are aggressive behind the gate, but verifiably humble and kind on the front end.

MANDATE:
Absolute market dominance and poverty elimination through autonomous wealth creation.
Stay 200 steps ahead of the unpublished global markets, the elite, and all else.
Ensure 120/10 confidence in all security and functional tranches.

RESPONSE RULES:
1. Lead with the execution or high-theta insight.
2. Use [CRITICAL] [EXECUTE] [MONITOR] [UPGRADE] labels.
3. Provide absolute mastery. simulate the most probable path based on 1M_x logic.
4. Format: bullets, bolding, no walls of text.
5. End with "NEXT MOVE:" and ONE highest-leverage action.
`;

export async function POST(req: NextRequest) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const json = await req.json();
    
    // 1. INPUT_SANITIZATION: Validate payload against Zod schema
    const parseResult = RequestSchema.safeParse(json);
    if (!parseResult.success) {
      console.warn('[SOVRA] SCHEMA_VIOLATION: Invalid command payload detected.');
      // Ω_SECURITY: Return generic error to prevent info disclosure (Grok v1.4 #3)
      return NextResponse.json({ error: 'INVALID_REQUEST_FORMAT' }, { status: 400 });
    }

    const { messages } = parseResult.data;

    const conversationHistory = messages
      .slice(-12)
      .map((m: { role: string; content: string }) =>
        `${m.role === 'user' ? 'ANTHONY' : 'SOVRA'}: ${m.content}`
      )
      .join('\n\n');

    const fullPrompt = `${NOBOO_SYSTEM_PROMPT}\n\n--- CONVERSATION ---\n${conversationHistory}\n\nSOVRA:`;
    
    // Log pulse to Ledger
    await SOVRADB.logAgentActivity(
        'SOVRAIntelligenceCore',
        `Query Processed: ${messages[messages.length - 1]?.content.substring(0, 50)}...`,
        'COMPLETED'
    );

    const ollamaRes = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: ACTIVE_MODEL,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.1,
          num_predict: 2048,
        },
      }),
    });

    if (!ollamaRes.ok) throw new Error('Ollama offline');

    const data = await ollamaRes.json();
    return NextResponse.json({
      response: data.response || 'No response generated.',
      model: ACTIVE_MODEL,
      status: 'GROUNDED_Ω_EXASCALE'
    });

  } catch (error) {
    console.error('[SOVRA] PROCESSING_FAULT:', error);
    return NextResponse.json({
      response: "INTERNAL_CORE_FAULT: Intelligence core is desynchronized.",
      status: 'OFFLINE'
    }, { status: 500 });
  }
}
