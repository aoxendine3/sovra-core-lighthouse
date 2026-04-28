import { NextRequest, NextResponse } from 'next/server';
import { VoiceController } from '@/lib/audio/VoiceController';
import { validateHandshake } from '@/lib/auth/Handshake';

/**
 * VOCAL_PULSE_API (v.010_SINGULARITY)
 * ─────────────────────────────────────────────────────────────
 * Mode: APEXIA_VOCAL_SYNCHRONIZATION
 * Mandate: Absolute Natural Expression.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. SECURITY: AUTHORITATIVE HANDSHAKE
    if (!await validateHandshake(req)) {
      return new NextResponse('Institutional Handshake Required (v.010_APEX)', { status: 401 });
    }

    const { text, voice } = await req.json();

    if (!text) {
      return new NextResponse('Vocal Content Required', { status: 400 });
    }

    const voiceController = new VoiceController();
    const audioBuffer = await voiceController.generateSpeech(text, voice);

    // 2. STREAMING: High-fidelity audio tranche
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'X-SOVRA-Vocal-Signature': voice || 'nova',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (e: any) {
    console.error('[Voice_API] FAULT:', e.message);
    return new NextResponse('Vocal Generation Fault', { status: 500 });
  }
}
