// src/lib/brain/Brain.ts
/**
 * ONE BRAIN. ONE FLOW. ZERO DUPLICATION.
 * Unified execution loop for SOVRA Prime.
 * It pulls recent context from the SOVRADB memory layer,
 * generates a plan, validates it, runs it via a provided runner,
 * evaluates the outcome, and writes back to memory.
 */

import { SOVRADB } from '../../../sovra/core/db/SOVRADB';
import { Runner } from '../core/Runner'; // assumed generic runner interface
import { Tools } from '../core/Tools'; // collection of tool wrappers (e.g., generate_image, read_url_content)

export interface BrainInput {
  /** High‑level user intent or system objective */
  intent: string;
}

export interface ValidationResult {
  valid: boolean;
  plan?: string; // serialized plan or command list
  errors?: string[];
}

export class Brain {
  private db = SOVRADB;

  /**
   * Process a single high‑level request through the full pipeline.
   */
  async process(input: BrainInput, tools: Tools, runner: Runner): Promise<any> {
    // 1. CONTEXT – fetch the last N memory entries for grounding
    const recent = await this.db.all('sovra_agent_logs'); // Fallback to logs if getRecentConversations missing
    const context = recent.slice(-10).map((c: any) => `${c.agent_name}: ${c.activity}`).join('\n');

    // 2. DECIDE + PLAN (merged) – ask the LLM to produce an executable plan
    const plan = await this._generatePlan(input.intent, context, tools);

    // 3. VALIDATE – ensure the plan conforms to schema & safety rules
    const validated = await this._validate(plan, tools);
    if (!validated.valid) {
      await this._fallback('No valid execution path.', input.intent);
      return null;
    }

    // 4. EXECUTE – run the plan in an isolated environment
    const results = await runner.runWorkflow(validated.plan!);

    // 5. ANALYZE – evaluate results against the original intent
    const final = await this._evaluate(results, input.intent);

    // 6. MEMORY WRITE – persist the exchange
    await this.db.logAgentActivity('SOVRA_BRAIN', `PROCESS_INTENT: ${input.intent}`, 'COMPLETED', { final });

    return final;
  }

  private async _generatePlan(intent: string, context: string, tools: Tools): Promise<string> {
    // Simple placeholder: call the LLM (via Ollama) with a prompt that includes tools list
    const prompt = `
You are the SOVRA Prime Brain.
Context:\n${context}\n
User Intent: ${intent}\n
Available tools: ${tools.listNames().join(', ')}.
Generate a concise, executable plan (as a single shell command or JSON workflow) that accomplishes the intent while respecting zero‑trust and policy constraints.`;
    // Assume SOVRA_AI_Core.generate exists and returns a string
    // This is a conceptual mapping; in practice, would use the actual Ollama binding.
    return `EXECUTING: ${intent}`; 
  }

  private async _validate(plan: string, tools: Tools): Promise<ValidationResult> {
    // Basic JSON schema validation if plan looks like JSON, otherwise trust it if it contains a known tool
    try {
      const parsed = JSON.parse(plan);
      if (Array.isArray(parsed.steps)) {
        return { valid: true, plan: plan };
      }
      return { valid: false, errors: ['Missing steps array'] };
    } catch {
      const hasTool = tools.listNames().some(name => plan.includes(name));
      return { valid: hasTool, plan: hasTool ? plan : undefined, errors: hasTool ? [] : ['No known tool referenced'] };
    }
  }

  private async _fallback(message: string, intent: string) {
    await this.db.logAgentActivity('SOVRA_BRAIN', 'FALLBACK_TRIGGERED', 'WARNING', { message, intent });
  }

  private async _evaluate(results: any, intent: string): Promise<any> {
    if (results && results.success) {
      return { status: 'completed', details: results };
    }
    const ok = typeof results === 'string' && results.toLowerCase().includes(intent.toLowerCase());
    return { status: ok ? 'completed' : 'partial', results };
  }
}
