import { SOVRADB } from '../db/SOVRADB.ts';
import { SentimentScoutAgent } from './SentimentScoutAgent.ts';

export class BriefingAgent {
  systemRole = 'SOVRA Sovereign LLC Executive Synthesis Node';
  systemMotto = 'Clarity for the Sovereign, Complexity in the Swarm';

  /**
   * GENERATE_EXECUTIVE_SUMMARY: Synthesizes all institutional telemetry into a high-theta briefing.
   */
  async generateExecutiveSummary() {
    console.log('[BriefingAgent] SYNTHESIZING: Collating institutional tranches...');

    const stats = await SOVRADB.getEnterpriseStats();
    const scout = new SentimentScoutAgent();
    const trends = await scout.scanTrends();
    
    // Retrieve recent reinvestments
    const logs = await SOVRADB.all('SELECT * FROM sovra_agent_logs WHERE agent_name = "SovereignWorker" ORDER BY timestamp DESC LIMIT 5');
    const recentLatency = logs.map((l: any) => l.metadata?.latencyMs || 0);
    const avgLatency = recentLatency.reduce((a: number, b: number) => a + b, 0) / recentLatency.length;

    const summary = {
      timestamp: new Date().toISOString(),
      treasury: {
        gross: stats.grossRevenue,
        liquid: stats.grossRevenue - 10000, // Accounting for recent $10k allocation
        reinvested: 10000
      },
      operations: {
        latency: `${avgLatency.toFixed(2)}ms`,
        drift: stats.heartbeatStatus,
        assetCount: stats.stagedProducts
      },
      marketResonance: {
        topTrend: trends[0].trend,
        vibe: trends[0].vibe,
        dominanceScore: trends[0].score
      },
      executiveVerdict: 'ABSOLUTE_DOMINANCE_ENGAGED'
    };

    await SOVRADB.logAgentActivity(
      'BriefingAgent',
      `Executive Briefing Synthesized: ${summary.marketResonance.topTrend}`,
      'SUCCESS',
      summary
    );

    return summary;
  }
}
