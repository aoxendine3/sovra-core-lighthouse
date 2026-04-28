/**
 * Institutional Rate Limiter (v41.4)
 * Mandate: Absolute Request Velocity Monitoring.
 * Protection: Capital Matrix & Finance Ingress.
 */

interface RateLimitEntry {
  requests: number;
  lastReset: number;
}

const RATE_LIMIT_STORE: Map<string, RateLimitEntry> = new Map();
const LIMIT = 100; // Requests per window
const WINDOW_MS = 15 * 60 * 1000; // 15 Minute Window

/**
 * isRateLimited: Verifies if an IP has exceeded institutional request velocity.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_STORE.get(ip) || { requests: 0, lastReset: now };

  // Reset if window expired
  if (now - entry.lastReset > WINDOW_MS) {
    entry.requests = 0;
    entry.lastReset = now;
  }

  entry.requests += 1;
  RATE_LIMIT_STORE.set(ip, entry);

  if (entry.requests > LIMIT) {
    console.warn(`[SOVRA_Shield] RATE_LIMIT_EXCEEDED: IP ${ip} blocked at edge.`);
    return true;
  }

  return false;
}
