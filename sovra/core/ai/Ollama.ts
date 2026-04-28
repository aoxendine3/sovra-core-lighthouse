import { TonyDB } from '../db/TonyDB.ts';

/**
 * SOVRA_AI_CORE (v15.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Unitary Intelligence Orchestration (Local + Grok + Gemini).
 * Logic: Transparent fallback and specialized task routing.
 */
export class TonyAICore {
  private static readonly OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
  private static readonly OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:latest';
  private static readonly X_AI_API_KEY = process.env.X_AI_API_KEY || '';

  /**
   * generate: The authoritative ingress for all cognitive pulses.
   */
  static async generate(prompt: string, options: { model?: string, provider?: 'OLLAMA' | 'GROK' | 'GEMINI' } = {}): Promise<string> {
    const provider = options.provider || (this.X_AI_API_KEY ? 'GROK' : 'OLLAMA');
    
    console.log(`[SOVRA_AI_CORE] INGRESS_PULSE: [${provider}] "${prompt.substring(0, 50)}..."`);

    try {
      if (provider === 'GROK' && this.X_AI_API_KEY) {
        return await this.generateGrok(prompt, options.model || 'grok-1');
      }

      // Default: Ollama Local Pulse
      return await this.generateOllama(prompt, options.model || this.OLLAMA_MODEL);

    } catch (err) {
      console.error(`[TonyAICore] EXECUTION_FAULT [${provider}]:`, err);
      // Mission-Critical Fallback to Local Llama
      if (provider !== 'OLLAMA') {
        return await this.generateOllama(prompt, this.OLLAMA_MODEL);
      }
      return '[TonyAICore_Fault] Cognitive bypass failed.';
    }
  }

  /**
   * generateOllama: Local inference pulse.
   */
  private static async generateOllama(prompt: string, model: string): Promise<string> {
    const res = await fetch(`${this.OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, stream: false })
    });
    const data = await res.json();
    return data.response;
  }

  /**
   * generateGrok: xAI Grok-1 inference pulse.
   */
  private static async generateGrok(prompt: string, model: string): Promise<string> {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.X_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1
      })
    });
    const data = await res.json();
    return data.choices[0].message.content;
  }
}
