import { CoreKernel } from '../maxx/kernel.ts';
import { Architect, Strategist, Sentinel } from '../trinity/Trinity.ts';
import { TonyDB } from '../db/TonyDB.ts';
import { ledger } from '../../../src/ledger/SovereignLedger.ts';

/**
 * SOVEREIGN APEX (THE SUPREME)
 * Mandate: Absolute Oversight & Ultimate Execution.
 * 
 * Logic: Orchestrates the Trinity and only answers to the Human User.
 */
export class SovereignApex extends CoreKernel {
    private architect = new Architect();
    private strategist = new Strategist();
    private sentinel = new Sentinel();

    constructor() {
        super();
    }

    /**
     * EXECUTE_TRANCHE: Triggers the Trinity of Judgment and records to the L1 Ledger.
     */
    async executeTranche(tranche: any) {
        console.log('🏛️  [APEX] TRANCHE_INIT: Requesting Deliberation from the Trinity...');

        const deliberations = await Promise.all([
            this.architect.analyzeTranche(tranche),
            this.strategist.analyzeTranche(tranche),
            this.sentinel.analyzeTranche(tranche)
        ]);

        const votes = deliberations.map(d => d.vote);
        const approved = votes.filter(v => v === 'APPROVE').length >= 2; // Majority rule

        console.log(`🏛️  [APEX] DELIBERATION_COMPLETE: [${votes.join(' | ')}]`);

        if (approved) {
            console.log('🚀 [APEX] DECISION: APPROVED. Executing and Recording to Ledger...');
            
            // Record to L1 Ledger (Tranche 3)
            const ledgerEntry = await ledger.recordPulse({
                layer: 'L14_APEX',
                action: `EXECUTE_TRANCHE: ${tranche.name}`,
                maSTScore: tranche.maSTScore || 0.01
            });

            await TonyDB.logAgentActivity('SovereignApex', `Tranche Executed: ${tranche.name}`, 'SUCCESS', { deliberations, ledgerEntry });
            return { status: 'EXECUTED', deliberations, ledgerEntry };
        } else {
            console.warn('❌ [APEX] DECISION: REJECTED. Compromise detected in unity.');
            await TonyDB.logAgentActivity('SovereignApex', `Tranche Rejected: ${tranche.name}`, 'REJECTED', { deliberations });
            return { status: 'REJECTED', deliberations };
        }
    }
}
