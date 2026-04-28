import axios from 'axios';
import * as cheerio from 'cheerio';
import { TonyDB } from '../db/TonyDB.ts';

/**
 * SovereignScraper — APEX INTELLECT (Phase 7.5 Protocol)
 * Mandate: Universal web-nav and zero-friction global data extraction.
 */
export class SovereignScraper {
    private userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'SovereignBot/7.5 (SOVRA TONY Intuitive Ingress; 2031-Protocol; SOVRA_APEX-Velocity)'
    ];

    private domainIntelligence = new Map<string, any>();

    private getRandomAgent() {
        return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
    }

    /**
     * INGRESS: Fetches HTML with multi-strategy retry logic.
     */
    async ingress(url: string, retries = 3): Promise<any> {
        const domain = new URL(url).hostname;
        const intel = this.domainIntelligence.get(domain) || { lastSuccess: 0, strategy: 0, failureCount: 0 };
        
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const currentStrategy = (intel.strategy + attempt - 1) % 3;
                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': this.getRandomAgent(),
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                        'X-Sovereign-Protocol': '7.5-INTUITIVE'
                    },
                    timeout: (currentStrategy + 1) * 3000,
                    maxRedirects: 5
                });

                this.domainIntelligence.set(domain, { lastSuccess: Date.now(), strategy: currentStrategy, failureCount: 0 });
                return cheerio.load(response.data);
            } catch (error) {
                intel.failureCount++;
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }
        throw new Error('APEX_SCRAPER_FAILURE');
    }

    /**
     * EXTRACT: Pulls structured data using CSS selectors.
     */
    extract($: any, selectors: Record<string, string>): Record<string, string> {
        const data: Record<string, string> = {};
        for (const [key, selector] of Object.entries(selectors)) {
            data[key] = $(selector).first().text().trim() || '';
        }
        return data;
    }

    /**
     * LOG_SCRAPE: Records the ingress event in the Sovereign Ledger.
     */
    async logScrape(source: string, itemsFound: number) {
        await TonyDB.logAgentActivity('SovereignScraper', `Harvested ${itemsFound} data points from ${source}`, 'COMPLETED');
    }
}
