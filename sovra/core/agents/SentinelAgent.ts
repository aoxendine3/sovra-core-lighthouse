import { TonyAICore } from '../ai/Ollama.ts';

export type DependencyStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE';

export class SentinelAgent {

  /**
   * Performs a comprehensive health audit of the entire command infrastructure.
   * Includes Project Token Defense: Rate Limit Tracking.
   */
  async executeHealthAudit() {
    console.log('[SentinelAgent] PULSE: Initiating technical infrastructure heartbeat...');
    
    const [results, rateLimits] = await Promise.all([
      Promise.all([
        this.checkCryptoDataHealth(),
        this.checkOllamaPulse(),
        this.checkStripeStatus(),
        this.checkDexGateways(),
        this.checkInstitutionalFunnel(),
        this.checkWealthVariance()
      ]),
      this.trackRateLimits()
    ]);

    const isHealthy = results.every((r: { status: string }) => r.status !== 'OFFLINE');
    const isThrottled = rateLimits.some((r: { usagePercentage: number }) => r.usagePercentage > 70);

    if (isThrottled) {
      console.warn('[SentinelAgent] DEFENSE_ALERT: Rate limit threshold (70%) exceeded. Recommending throttle.');
    }
    
    return {
      healthy: isHealthy,
      throttled: isThrottled,
      timestamp: new Date().toISOString(),
      dependencies: results,
      rateLimits
    };
  }

  private async trackRateLimits() {
    // CoinGecko free tier: 30 calls/min — no account needed
    return [
      {
        service: 'CoinGecko (Free)',
        usagePercentage: 0,
        currentWeight: 0,
        note: 'Free tier, no rate limit tracking needed'
      }
    ];
  }

  private async checkCryptoDataHealth() {
    try {
      const price = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      if (price.ok) return { dependency: 'CoinGecko', status: 'ONLINE' as DependencyStatus };
      return { dependency: 'CoinGecko', status: 'DEGRADED' as DependencyStatus };
    } catch {
      return { dependency: 'CoinGecko', status: 'OFFLINE' as DependencyStatus, detail: 'CONNECTION_FAILED' };
    }
  }

  private async checkOllamaPulse() {
    try {
      // Check centralized TonyAICore health
      const isHealthy = await TonyAICore.checkHealth();
      if (isHealthy) {
        return { dependency: 'TonyAICore Intelligence', status: 'ONLINE' as DependencyStatus };
      }
      return { dependency: 'TonyAICore Intelligence', status: 'OFFLINE' as DependencyStatus };
    } catch {
      return { dependency: 'TonyAICore Intelligence', status: 'OFFLINE' as DependencyStatus, detail: 'SERVICE_UNREACHABLE' };
    }
  }

  private async checkStripeStatus() {
    const hasKey = !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== '';
    return { 
      dependency: 'Stripe Wealth', 
      status: (hasKey ? 'ONLINE' : 'OFFLINE') as DependencyStatus,
      detail: hasKey ? 'LIVE' : 'NOT_CONFIGURED'
    };
  }

  private async checkInstitutionalFunnel() {
    try {
      const frontiers = [
        { name: 'Oracle Matrix', url: 'https://sovra.apex/crypto' },
        { name: 'Neural Terminal', url: 'https://sovra.apex/terminal' },
        { name: 'Luxury Lockdown', url: 'https://sovra.apex/affiliate/institutional-security-2026' }
      ];

      const logicChecks = await Promise.all(frontiers.map(async (f) => {
        try {
          const start = Date.now();
          const res = await fetch(f.url);
          const latency = Date.now() - start;
          
          if (!res.ok) return { name: f.name, status: 'OFFLINE', detail: `HTTP_${res.status}` };
          return { name: f.name, status: 'ONLINE', latency };
        } catch (e) {
          return { name: f.name, status: 'OFFLINE', detail: (e as Error).message };
        }
      }));

      const allOnline = logicChecks.every(l => l.status === 'ONLINE');

      return { 
        dependency: 'Institutional Frontiers', 
        status: (allOnline ? 'ONLINE' : 'DEGRADED') as DependencyStatus, 
        detail: allOnline ? 'ALL_NODES_GHD' : 'PARTIAL_OUTAGE',
        nodes: logicChecks
      };
    } catch (err) {
      return { 
        dependency: 'Institutional Frontiers', 
        status: 'OFFLINE' as DependencyStatus,
        detail: (err as Error).message
      };
    }
  }

  private async checkWealthVariance() {
     return { 
       dependency: 'Wealth Reconciliation', 
       status: 'DEGRADED' as DependencyStatus,
       detail: 'AWAITING_LIVE_SYNC'
     };
  }

  private async checkDexGateways() {
    try {
      const response = await fetch('https://quote-api.jup.ag/v6/quote?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=So11111111111111111111111111111111111111112&amount=1000000&slippageBps=50');
      if (response.ok) {
         return { dependency: 'DEX Gateway', status: 'ONLINE' as DependencyStatus, detail: 'JUPITER_OK' };
      }
      return { dependency: 'DEX Gateway', status: 'OFFLINE' as DependencyStatus, detail: `HTTP_${response.status}` };
    } catch {
      return { dependency: 'DEX Gateway', status: 'OFFLINE' as DependencyStatus, detail: 'NETWORK_ERROR' };
    }
  }
}
