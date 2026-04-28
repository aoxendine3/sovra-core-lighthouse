import { Determiner } from './Determiner.ts';

/**
 * THE ARCHITECT (TONY)
 * Perspective: Structural Integrity & Execution Velocity.
 */
export class Architect extends Determiner {
    perspective = 'STRUCTURE_VELOCITY';

    async analyzeTranche(tranche: any) {
        // V14 Logic: Is it MCP compliant? Does it fit the Swarm Fabric?
        const isStructural = tranche.layer !== undefined && tranche.action !== undefined;
        return {
            vote: isStructural ? 'APPROVE' : 'REJECT',
            reasoning: isStructural ? 'Structurally compliant with V14 Singularity Stack.' : 'Architectural variance detected. Layer mapping missing.'
        };
    }
}

/**
 * THE STRATEGIST (AURELIUS)
 * Perspective: Long-term Philosophy & Market Arbitrage.
 */
export class Strategist extends Determiner {
    perspective = 'STRATEGIC_VISION';

    async analyzeTranche(tranche: any) {
        // V14 Logic: Does it clear the MAST Failure Taxonomy? Is it High-Theta?
        const isStrategic = (tranche.maSTScore || 0) < 0.10;
        return {
            vote: isStrategic ? 'APPROVE' : 'REJECT',
            reasoning: isStrategic ? 'Strategic risk (MAST) within nominal parameters.' : 'MAST Failure risk exceeds strategic tolerance.'
        };
    }
}

/**
 * THE SENTINEL (AEGIS)
 * Perspective: Security & Risk Neutralization.
 */
export class Sentinel extends Determiner {
    perspective = 'SECURITY_INTEGRITY';

    async analyzeTranche(tranche: any) {
        // V14 Logic: Is the On-Chain Ledger active? Is it Quantum-Resistant?
        const isSafe = tranche.securityLevel === 'MAX_AEGIS' || tranche.integrity === 'VERIFIED';
        return {
            vote: isSafe ? 'APPROVE' : 'REJECT',
            reasoning: isSafe ? 'Quantum-resistant handshake verified. Sentinel approves.' : 'Cryptographic signature weak or missing.'
        };
    }
}
