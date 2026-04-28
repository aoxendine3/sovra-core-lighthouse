import { TonyDB } from '../../db/TonyDB';

/**
 * DataPrivacyGuard (2031 Protocol)
 * Mandate: Zero-Leak Institutional Integrity.
 * Function: Scans all outgoing agent communications and logs for sensitive 'Top Secret' 
 *           patterns (e.g., .env keys, private IDs, owner specifics).
 */
export class DataPrivacyGuard {
  private sensitivePatterns = [
    /TELEGRAM_BOT_TOKEN/g,
    /0x[a-fA-F0-0]{40}/g, // Generic Eth Addresses (Redact if not public)
    /8620357919:AA/g, // Specific compromised token pattern
    /7577097584/g, // Owner ID
    /vault-key-[a-zA-Z0-9]+/g,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, // Emails
    /password\s*:\s*[^\s]+/gi, // Passwords
    /bearer\s+[a-zA-Z0-9.-_]+/gi, // Bearer tokens
    /sk-[a-zA-Z0-9]{48}/g // OpenAI-style keys
  ];

  async provablePulse() {
    return { 
      agent: 'DataPrivacyGuard', 
      status: 'PRIVACY_SCANNING_ACTIVE', 
      leakProtection: 'ELITE_INSTITUTIONAL' 
    };
  }

  /**
   * PURIFY: Redacts sensitive data before it hits the logs or external bridges.
   */
  purify(content: string): string {
    let purified = content;
    this.sensitivePatterns.forEach(pattern => {
      purified = purified.replace(pattern, (match) => {
        return `[REDACTED_${match.slice(0, 4).toUpperCase()}]`;
      });
    });
    return purified;
  }

  /**
   * GUARD_MESSAGE: Checks a message for potential data leaks. 
   * returns false if a major leak is detected (blocking the send).
   */
  async guardMessage(agent: string, message: string): Promise<boolean> {
    const isLeaking = this.sensitivePatterns.some(pattern => pattern.test(message));
    
    if (isLeaking) {
      console.error(`[PrivacyGuard] LEAK_DETECTED: Agent ${agent} attempted to transmit sensitive data. Blocking.`);
      await TonyDB.logAgentActivity('DataPrivacyGuard', `LEAK PREVENTED from ${agent}.`, 'COMPLETED');
      return false;
    }

    return true;
  }
}
