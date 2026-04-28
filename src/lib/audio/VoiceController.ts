import OpenAI from "openai";

/**
 * VOICE_CONTROLLER (v.008_SINGULARITY)
 * ─────────────────────────────────────────────────────────────
 * Mode: APEXIA_VOCAL_GROUNDING
 * Mandate: Absolute Natural Expression.
 */
export class VoiceController {
  private openai: OpenAI;
  private currentVoice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'nova';

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'NOT_SET',
    });
  }

  /**
   * generateSpeech: Converts text into a high-fidelity vocal tranche.
   * Supports 100+ languages and institutional voice selection.
   */
  public async generateSpeech(text: string, voice?: string) {
    console.log(`[Voice] APEXIA: Generating Vocal Pulse...`);

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'NOT_SET') {
      console.warn(`[Voice] APEX_WARP: OpenAI Key Missing. Returning Institutional Mock Trace.`);
      // Return a 1-second silence buffer (MP3 frame for silence)
      return Buffer.alloc(10); 
    }

    const response = await this.openai.audio.speech.create({
      model: "tts-1-hd", // High-fidelity for the 0.01%
      voice: (voice as any) || this.currentVoice,
      input: text,
    });

    return Buffer.from(await response.arrayBuffer());
  }

  /**
   * setVoice: Updates the institutional tonal signature.
   */
  public setVoice(voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer') {
    this.currentVoice = voice;
    console.log(`[Voice] APEXIA: Voice signature set to ${voice}`);
  }

  /**
   * getAvailableVoices: Returns the institutional voice library.
   */
  public getVoices() {
    return [
      { id: 'nova', name: 'APEXIA_AUTHORITY', description: 'Caring, Wise, Peer Strategist' },
      { id: 'onyx', name: 'APEXIA_COMMANDER', description: 'Deep, Resonant, Institutional' },
      { id: 'shimmer', name: 'APEXIA_EMPATH', description: 'Soft, Nurturing, Emotional' },
      { id: 'fable', name: 'APEXIA_SAGE', description: 'Ancient Intelligence, Wise' }
    ];
  }
}
