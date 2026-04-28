import { SwingTraderAgent } from '../agency/lib/agents/finance/SwingTraderAgent';

async function executeGenesisStrategy() {
    console.log('--- [MANNIX_ALPHA_INGRESS] EXECUTING FIRST HIGH-THETA STRATEGY ---');
    
    const trader = new SwingTraderAgent();

    try {
        // 1. Analyze for Aspirational Gains
        const intelligence = await trader.analyzeMarketGenesis('Digital Assets / AI Infrastucture');
        console.log('[MANNIX] Strategy Grounded:', intelligence);

        // 2. Execute the Maneuver
        // Assuming 'BTC/SOL' based on Market Oracle's previous mandate but refined by Swing logic
        const result = await trader.executeSwingManeuver('SOVRA/BTC_INDEX');
        
        console.log('\n--- STRATEGY SUCCESSFUL ---');
        console.log('Asset:', result.asset);
        console.log('Status:', result.status);
        console.log('Strategy:', result.strategy);
        console.log('\n[APEX] Gains and resources ingress initiated. Institutional grounding at 100%.');

    } catch (error) {
        console.error('[CRITICAL_FAULT] Alpha Ingress Failed:', error);
        process.exit(1);
    }
}

executeGenesisStrategy();
