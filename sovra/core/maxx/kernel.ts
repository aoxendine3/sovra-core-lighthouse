import { SovereignKernel } from '../../../src/lib/kernel/SovereignKernel.ts';
import { SovereignScraper } from '../utils/SovereignScraper.ts';

/**
 * CoreKernel (Legacy Bridge)
 * Mandate: Absolute Operational Reality for Tony's Agents.
 * This file bridges the old 'maxx/kernel' path to the new 'SovereignKernel'.
 */
export class CoreKernel extends SovereignKernel {
    public pipeline: SovereignScraper;

    constructor() {
        super();
        this.pipeline = new SovereignScraper();
    }
}
