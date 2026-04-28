/**
 * TOKEN KING — Sovereign Connection Stability Superagent
 * Mandate: Maintain unbreakable token flow, model routing, and zero-friction execution.
 * Authority: Full — may switch models, compress context, and reroute tasks autonomously.
 */

export type ModelTier = 'fast' | 'balanced' | 'deep' | 'sia_core';

export interface TokenKingConfig {
  maxContextTokens: number;
  compressionRatio: number;
  fallbackModels: Record<ModelTier, string>;
}

export interface SessionHealth {
  estimatedTokensUsed: number;
  remainingBudget: number;
  currentModel: string;
  status: 'STABLE' | 'COMPRESSING' | 'SWITCHING' | 'CRITICAL';
}

const DEFAULT_CONFIG: TokenKingConfig = {
  maxContextTokens: 12000, // Safe ceiling to avoid 16k limit
  compressionRatio: 0.6,
  fallbackModels: {
    fast: 'llama4:scout',    // Centralized Intelligence Core
    balanced: 'llama4:scout', // Hardened reasoning
    deep: 'llama4:scout',     // Deep analysis
    sia_core: 'APEX.AI',    // Sovereign Intelligence Core
  },
};

export class TokenKing {
  private config: TokenKingConfig;
  private sessionHealth: SessionHealth;
  private messageBuffer: { role: string; content: string }[] = [];

  constructor(config: Partial<TokenKingConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.sessionHealth = {
      estimatedTokensUsed: 0,
      remainingBudget: this.config.maxContextTokens,
      currentModel: this.config.fallbackModels.balanced,
      status: 'STABLE',
    };
  }

  /**
   * INGEST: Add a message to the buffer and monitor token pressure.
   */
  ingest(role: string, content: string): void {
    const estimate = this.estimateTokens(content);
    this.sessionHealth.estimatedTokensUsed += estimate;
    this.sessionHealth.remainingBudget -= estimate;
    this.messageBuffer.push({ role, content });

    this.enforceStability();
  }

  /**
   * ENFORCE_STABILITY: Maintain connection health and reroute if needed.
   */
  private enforceStability(): void {
    const { estimatedTokensUsed } = this.sessionHealth;
    const usage = estimatedTokensUsed / this.config.maxContextTokens;

    if (usage < 0.6) {
      this.sessionHealth.status = 'STABLE';
    } else if (usage < 0.8) {
      this.sessionHealth.status = 'COMPRESSING';
      this.compressContext();
      console.log('[TokenKing] Context compressed. Stability maintained.');
    } else if (usage < 0.95) {
      this.sessionHealth.status = 'SWITCHING';
      this.switchModel('fast');
      console.log('[TokenKing] Switched to fast model. Preventing token overflow.');
    } else {
      this.sessionHealth.status = 'CRITICAL';
      this.emergencyFlush();
      console.error('[TokenKing] CRITICAL: Emergency flush executed. Session reset.');
    }
  }

  /**
   * COMPRESS_CONTEXT: Trim the oldest, lowest-value messages from the buffer.
   */
  private compressContext(): void {
    const keepCount = Math.floor(this.messageBuffer.length * this.config.compressionRatio);
    // Always keep the most recent messages
    this.messageBuffer = this.messageBuffer.slice(-keepCount);
    this.recalculateEstimate();
  }

  /**
   * SWITCH_MODEL: Autonomously change model tier to reduce complexity pressure.
   */
  switchModel(tier: ModelTier): void {
    this.sessionHealth.currentModel = this.config.fallbackModels[tier];
    console.log(`[TokenKing] Active model → ${this.sessionHealth.currentModel} (${tier})`);
  }

  /**
   * EMERGENCY_FLUSH: Last resort — clear buffer, retain core system context only.
   */
  private emergencyFlush(): void {
    const systemMessages = this.messageBuffer.filter(m => m.role === 'system');
    this.messageBuffer = systemMessages;
    this.sessionHealth.estimatedTokensUsed = 0;
    this.sessionHealth.remainingBudget = this.config.maxContextTokens;
    this.switchModel('fast');
  }

  /**
   * GET_OPTIMIZED_CONTEXT: Returns the token-safe message buffer for API calls.
   */
  getOptimizedContext(): { role: string; content: string }[] {
    return this.messageBuffer;
  }

  /**
   * GET_MODEL: Returns the currently active model name.
   */
  getActiveModel(): string {
    return this.sessionHealth.currentModel;
  }

  /**
   * GET_HEALTH: Returns the full session health report.
   */
  getHealth(): SessionHealth {
    return { ...this.sessionHealth };
  }

  /**
   * ESTIMATE_TOKENS: Approximate token count from text length (~4 chars per token).
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  private recalculateEstimate(): void {
    const total = this.messageBuffer.reduce((acc, m) => acc + this.estimateTokens(m.content), 0);
    this.sessionHealth.estimatedTokensUsed = total;
    this.sessionHealth.remainingBudget = this.config.maxContextTokens - total;
  }

  /**
   * STATUS_REPORT: Print a concise institutional status report.
   */
  statusReport(): string {
    const h = this.sessionHealth;
    const modelPrefix = h.currentModel === 'APEX.AI' ? '[APEX_ACTIVE]' : '[TokenKing]';
    return `${modelPrefix} STATUS: ${h.status} | Model: ${h.currentModel} | Budget: ${h.remainingBudget}/${this.config.maxContextTokens} tokens remaining.`;
  }
}

// Singleton for application-wide use
export const tokenKing = new TokenKing();
