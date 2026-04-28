import { GitHubAlphaScoutAgent } from '../../sovra/core/agents/GitHubAlphaScoutAgent.ts';
import { TonyDB } from '../../sovra/core/db/TonyDB.ts';

async function executeGitHubScour() {
    console.log('🏛️  SOVRA SOVEREIGN ENTERPRISE | [TONY] GITHUB ALPHA SCOUR');
    console.log('──────────────────────────────────────────────────');
    
    const scout = new GitHubAlphaScoutAgent();
    
    console.log('🚀 [PHASE 1]: INITIAL TRENDING SCOUR...');
    const trending = await scout.scour('trending');
    console.log(`✅ [PHASE 1]: Found ${trending.alphaCount} Alpha Signals in Trending.`);

    console.log('🔥 [PHASE 2]: SELF-LEARNING & "BETTER OPTIONS" EXPANSION...');
    const learnResult = await scout.selfLearn();
    console.log(`✅ [PHASE 2]: Explored ${learnResult.optionsExplored} high-velocity options.`);

    console.log('🏛️  [PHASE 3]: INSTITUTIONAL TELEMETRY...');
    const status = await TonyDB.getAgentStatus('GitHubAlphaScout');
    console.log(`[STATUS]: ${status}`);
    console.log('──────────────────────────────────────────────────');
    console.log('[TONY] GITHUB SCOUR verifiably complete. Self-learning established.');
}

executeGitHubScour().catch(console.error);
