import { TonyDB } from '../../db/TonyDB';

/**
 * IntrusionZapper (2031 Protocol)
 * Mandate: Hard-Reset Intrusion Prevention.
 * Function: Automatically identifies and 'Zaps' (blocks) unauthorized incoming requests
 *           to protect the internal SOVRA APEX brain.
 */
export class IntrusionZapper {
  private blacklist: Set<string> = new Set();
  private trapCounts: Map<string, number> = new Map();

  async provablePulse() {
    return { 
      agent: 'IntrusionZapper', 
      status: 'DEFENSES_HOT', 
      blacklistedIPs: this.blacklist.size 
    };
  }

  /**
   * EVALUATE_ZAP: Analyzes a request source. If hostile, it 'Zaps' the IP.
   */
  async evaluateZap(ip: string, payload: any) {
    console.log(`[Zapper] AUDIT: Evaluating traffic from ${ip}...`);

    // Hostile patterns: bypass attempts, admin probing, script injections
    const payloadStr = JSON.stringify(payload).toLowerCase();
    const isHostile = 
      payloadStr.includes('admin') || 
      payloadStr.includes('delete') || 
      payloadStr.includes('config') ||
      payloadStr.includes('../');

    if (isHostile) {
      const count = (this.trapCounts.get(ip) || 0) + 1;
      this.trapCounts.set(ip, count);

      if (count >= 3) {
        console.error(`[Zapper] ZAPPED: IP ${ip} has reached threat threshold. Hard-blocking ingress.`);
        this.blacklist.add(ip);
        await TonyDB.logAgentActivity('IntrusionZapper', `HARD BLOCK: IP ${ip} zapped for hostile payload.`, 'FAILED');
        return { action: 'ZAP', status: 'BLOCKED' };
      }

      console.warn(`[Zapper] WARNING: Suspicious activity from ${ip}. Threat Count: ${count}/3`);
      return { action: 'WARN', status: 'MONITORED' };
    }

    return { action: 'NONE', status: 'NOMINAL' };
  }

  getBlacklist() {
    return Array.from(this.blacklist);
  }
}
