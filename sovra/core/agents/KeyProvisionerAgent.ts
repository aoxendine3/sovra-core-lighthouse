/**
 * KeyProvisionerAgent
 * SOVRA Infrastructure & Access Manager
 * 
 * Mandate: Identify missing API keys and guide the owner to official
 * developer portals to generate them. Removes friction from the setup process.
 */

export interface MissingKey {
  service: string;
  portalUrl: string;
  description: string;
  impactIfMissing: string;
}

export class KeyProvisionerAgent {
  private readonly portalMap: Record<string, MissingKey> = {
    'TIKTOK_ACCESS_TOKEN': {
      service: 'TikTok for Business',
      portalUrl: 'https://developers.tiktok.com/',
      description: 'Used for autonomous content posting and traffic generation.',
      impactIfMissing: 'TikTokAgent remains in STANDBY. No autonomous organic reach.'
    },
    'FACEBOOK_PAGE_TOKEN': {
      service: 'Facebook/Meta Graph API',
      portalUrl: 'https://developers.facebook.com/',
      description: 'Manages SOVRA Page posts and Facebook Marketplace listings.',
      impactIfMissing: 'FacebookAgent remains in STANDBY. Marketplace automation disabled.'
    },
    'GITHUB_TOKEN': {
      service: 'GitHub Personal Access Token',
      portalUrl: 'https://github.com/settings/tokens',
      description: 'Allows Maxx to manage code, issues, and enterprise infrastructure.',
      impactIfMissing: 'GitHubAgent restricted to read-only. No autonomous code fixes.'
    },
    'SELLVIA_API_KEY': {
      service: 'Sellvia Dropshipping',
      portalUrl: 'https://sellvia.com/api-docs/',
      description: 'Connects the storefront to fulfillment and product sourcing.',
      impactIfMissing: 'SellviaAgent disabled. Order fulfillment must be manual.'
    }
  };

  /**
   * Scans the environment for missing critical keys.
   */
  async scanForGaps(): Promise<MissingKey[]> {
    const gaps: MissingKey[] = [];
    
    // List of keys to check
    const keysToCheck = Object.keys(this.portalMap);
    
    for (const key of keysToCheck) {
      if (!process.env[key] || process.env[key] === 'your_key_here') {
        gaps.push(this.portalMap[key]);
      }
    }
    
    return gaps;
  }

  /**
   * Generates a "provisioning roadmap" for the owner.
   */
  generateRoadmap(gaps: MissingKey[]): string {
    if (gaps.length === 0) return "All SOVRA Infrastructure keys are verified and LIVE.";
    
    return gaps.map(gap => `
### ${gap.service}
- **Action:** Visit [${gap.portalUrl}](${gap.portalUrl})
- **Purpose:** ${gap.description}
- **Priority:** High. ${gap.impactIfMissing}
    `).join('\n');
  }
}
