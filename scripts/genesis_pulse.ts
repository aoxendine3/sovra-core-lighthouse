import 'dotenv/config';
import { MasterSkillsmanAgent } from '../agency/lib/agents/MasterSkillsmanAgent';

/**
 * OPERATION: GENESIS_PULSE (v1.0_SINGULARITY)
 * ─────────────────────────────────────────────────────────────
 * Purpose: Verify the Llama 4:Scout intelligence anchor and and trigger
 * the first live High-Theta Mastery Cycle for the Master Skillsman.
 */
async function initiateGenesisPulse() {
    console.log('--- GENESIS INTELLIGENCE PULSE: START ---');
    console.log('[PULSE] Target Intelligence: Llama 4:Scout (Ollama)');
    
    try {
        const skillsman = new MasterSkillsmanAgent();
        
        console.log('[PULSE] Triggering Mastery Cycle...');
        await skillsman.executeMasteryPulse();
        
        console.log('[PULSE] Scanning identified Value Debts...');
        const debts = await skillsman.identifyValueDebt();
        
        console.log('--- PULSE SUMMARY ---');
        console.log(`STATUS: SUCCESS`);
        console.log(`IDENTIFIED DEBTS: ${debts.length}`);
        debts.forEach(d => {
            console.log(` - [${d.id}] ${d.niche}: $${d.potential.toLocaleString()}`);
        });

    } catch (error: any) {
        console.error('--- GENESIS PULSE FAULT ---');
        console.error(`FAULT CODE: INTELLIGENCE_DISCONNECT`);
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
}

initiateGenesisPulse();
