import { SOVRADB } from '../db/SOVRADB.ts';
import { TonyAICore } from '../ai/Ollama.ts';

export class SentimentScoutAgent {
  systemRole = 'SOVRA Sovereign LLC Market Resonance Scout';
  systemMotto = 'Pulse of the Masses, Direction of the Sovereign';

  /**
   * SCAN_TRENDS: Scans trending AI and Tech narratives to align our 110 assets.
   */
  async scanTrends(): Promise<{ trend: string; vibe: string; score: number }[]> {
    console.log('[SentimentScout] SCANNING: Analyzing market narratives...');

    const prompt = `You are an elite Market Intelligence Analyst for the SOVRA Sovereign Enterprise.
    Analyze the current global AI landscape and identify the top 3 trending 'vibes' or narratives (e.g., 'Agentic Autonomy', 'Local Privacy', 'GPU Arbitrage').
    Provide a resonance score (0-100) for each.
    Format must be a valid JSON array: [{"trend":"Agentic Autonomy", "vibe":"Extreme Hype", "score": 98}].
    Return ONLY the JSON array.`;

    try {
      const response = await TonyAICore.generate(prompt, {
        options: {
          num_ctx: 128000,
          temperature: 0.7, // Higher temp for creative trend spotting
          num_gpu: 1
        }
      });

      const match = response.trim().match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (match) {
        const trends = JSON.parse(match[0]);
        
        await SOVRADB.logAgentActivity(
          'SentimentScout',
          `Market Pulse Captured: ${trends[0].trend} is dominant.`,
          'SUCCESS',
          { topTrend: trends[0], allTrends: trends }
        );

        return trends;
      }
    } catch (err) {
      console.warn('[SentimentScout] SCAN_FAULT: Reverting to baseline trends.');
    }

    return [
      { trend: 'Agentic Autonomy', vibe: 'Dominant', score: 95 },
      { trend: 'Zero-Point Security', vibe: 'Growing', score: 88 },
      { trend: 'Local Intelligence', vibe: 'High Demand', score: 92 }
    ];
  }

  /**
   * ALIGN_ASSET: Suggests a 'vibe-aligned' hook for a specific asset.
   */
  async alignAsset(assetName: string, category: string) {
    const trends = await this.scanTrends();
    const topTrend = trends[0];

    console.log(`[SentimentScout] ALIGNING: ${assetName} with ${topTrend.trend}...`);
    
    // Logic to suggest hook adjustments would go here
    return { trend: topTrend.trend, alignmentScore: 94 };
  }
}
