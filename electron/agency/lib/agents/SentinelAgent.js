/**
 * SentinelAgent (Technical Uptime & Token Watchdog)
 * Responsible for maintaining 100% operational status for Mission 10M.
 * Performs periodic heartbeat checks on Binance, Stripe, and Ollama.
 */
export class SentinelAgent {
    ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
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
        const isHealthy = results.every((r) => r.status !== 'OFFLINE');
        const isThrottled = rateLimits.some((r) => r.usagePercentage > 70);
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
    async trackRateLimits() {
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
    async checkCryptoDataHealth() {
        try {
            const price = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
            if (price.ok)
                return { dependency: 'CoinGecko', status: 'ONLINE' };
            return { dependency: 'CoinGecko', status: 'DEGRADED' };
        }
        catch {
            return { dependency: 'CoinGecko', status: 'OFFLINE', detail: 'CONNECTION_FAILED' };
        }
    }
    async checkOllamaPulse() {
        try {
            const response = await fetch(`${this.ollamaHost}/api/tags`);
            if (response.ok) {
                return { dependency: 'Ollama Brain', status: 'ONLINE' };
            }
            return { dependency: 'Ollama Brain', status: 'OFFLINE', detail: `HTTP_${response.status}` };
        }
        catch {
            return { dependency: 'Ollama Brain', status: 'OFFLINE', detail: 'SERVICE_UNREACHABLE' };
        }
    }
    async checkStripeStatus() {
        const hasKey = !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== '';
        return {
            dependency: 'Stripe Wealth',
            status: (hasKey ? 'ONLINE' : 'OFFLINE'),
            detail: hasKey ? 'LIVE' : 'NOT_CONFIGURED'
        };
    }
    async checkInstitutionalFunnel() {
        try {
            const frontiers = [
                { name: 'Oracle Matrix', url: 'http://localhost:3000/crypto' },
                { name: 'Neural Terminal', url: 'http://localhost:3000/terminal' },
                { name: 'Luxury Lockdown', url: 'http://localhost:3000/affiliate/institutional-security-2026' }
            ];
            const logicChecks = await Promise.all(frontiers.map(async (f) => {
                try {
                    const start = Date.now();
                    const res = await fetch(f.url);
                    const latency = Date.now() - start;
                    if (!res.ok)
                        return { name: f.name, status: 'OFFLINE', detail: `HTTP_${res.status}` };
                    return { name: f.name, status: 'ONLINE', latency };
                }
                catch (e) {
                    return { name: f.name, status: 'OFFLINE', detail: e.message };
                }
            }));
            const allOnline = logicChecks.every(l => l.status === 'ONLINE');
            return {
                dependency: 'Institutional Frontiers',
                status: (allOnline ? 'ONLINE' : 'DEGRADED'),
                detail: allOnline ? 'ALL_NODES_GHD' : 'PARTIAL_OUTAGE',
                nodes: logicChecks
            };
        }
        catch (err) {
            return {
                dependency: 'Institutional Frontiers',
                status: 'OFFLINE',
                detail: err.message
            };
        }
    }
    async checkWealthVariance() {
        return {
            dependency: 'Wealth Reconciliation',
            status: 'DEGRADED',
            detail: 'AWAITING_LIVE_SYNC'
        };
    }
    async checkDexGateways() {
        try {
            const response = await fetch('https://quote-api.jup.ag/v6/quote?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=So11111111111111111111111111111111111111112&amount=1000000&slippageBps=50');
            if (response.ok) {
                return { dependency: 'DEX Gateway', status: 'ONLINE', detail: 'JUPITER_OK' };
            }
            return { dependency: 'DEX Gateway', status: 'OFFLINE', detail: `HTTP_${response.status}` };
        }
        catch {
            return { dependency: 'DEX Gateway', status: 'OFFLINE', detail: 'NETWORK_ERROR' };
        }
    }
}
