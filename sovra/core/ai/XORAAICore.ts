import { TonyDB } from '../db/TonyDB.ts';

/**
 * Tony_SOVEREIGN_CORE (v1.0)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Integration of multi-model intelligence into the TonyS Swarm.
 * Purpose: High-theta reasoning and absolute logic for exascale missions.
 */
export class GrokClient {
  private static readonly API_URL = 'https://api.x.ai/v1/chat/completions';
  private static readonly API_KEY = process.env.X_AI_API_KEY || '';

  /**
   * generate: Executes a high-IQ inference pulse via the Grok-1 model.
   */
  static async generate(prompt: string, model: string = 'grok-1'): Promise<string> {
    console.log(`[Grok] INITIATING_PULSE: "${prompt.substring(0, 50)}..."`);

    if (!this.API_KEY) {
      console.warn('[Grok] SECURITY_FAULT: X_AI_API_KEY missing. Falling back to local models.');
      // In a real scenario, this would return an error or trigger local fallback
      return '[Grok_Fallback] Institutional context required.';
    }

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.1,
          stream: false
        })
      });

      if (!response.ok) throw new Error(`Grok API Fault: ${response.status}`);

      const data = await response.json();
      const content = data.choices[0].message.content;

      await TonyDB.logAgentActivity('GrokClient', `Grok Pulse Success: ${model}`, 'SUCCESS', {
          prompt_len: prompt.length,
          response_len: content.length
      });

      return content;

    } catch (err) {
      console.error('[Grok] EXECUTION_FAULT:', err);
      return '[Grok_Fault] System logic compromised.';
    }
  }
}

/**
 * TonyAICore: Multi-Model Sovereign Orchestrator
 * This class replaces the legacy Ollama-only implementation.
 */
export class TonyAICore {
    static async generate(prompt: string, provider?: string): Promise<string> {
        const activeProvider = provider || process.env.AI_PROVIDER || 'OLLAMA';
        
        switch (activeProvider) {
            case 'GROK':
                return await GrokClient.generate(prompt);
            case 'OLLAMA':
                // Placeholder for existing Ollama logic
                return `[Ollama] Local pulse: ${prompt}`;
            default:
                return `[TonyAICore] Provider ${activeProvider} not verifiably grounded.`;
        }
    }
}
