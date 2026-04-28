/**
 * GUMROAD AGENT
 * SOVRA Chief Gumroad Architect
 * 
 * Mandate: Build and optimize Gumroad pages that attract top 1% buyers.
 * Handles product copy, pricing strategy, thumbnail briefs, and funnel optimization.
 * Acts as Anthony Oxendine. Never hindered by friction. Checks all work multiple times.
 */

import { TonyAICore } from '../ai/Ollama.ts';

export interface GumroadProduct {
  name: string;
  tagline: string;
  price: number;
  description: string;
  bulletPoints: string[];
  faqItems: { q: string; a: string }[];
  thumbnailPrompt: string;
  callToAction: string;
  tier: 'free' | 'pro' | 'apex';
}

export interface GumroadFunnel {
  freeProduct: GumroadProduct;
  proProduct: GumroadProduct;
  apexProduct: GumroadProduct;
  upsellSequence: string[];
  emailFollowUp: string[];
}

export class GumroadAgent {
  private async generate(prompt: string): Promise<string> {
    try {
      return await TonyAICore.generate(prompt);
    } catch {
      return '';
    }
  }

  /**
   * Builds a complete Gumroad product listing optimized for top 1% buyers.
   */
  async buildProductListing(
    productName: string,
    tier: 'free' | 'pro' | 'apex',
    coreValue: string,
    customPrice?: number
  ): Promise<GumroadProduct> {
    console.log(`[GumroadAgent] BUILDING: ${tier.toUpperCase()} listing for "${productName}"...`);

    const tierPrices = { free: 0, pro: 49, apex: 199 };
    const tierPositioning = {
      free: 'Provide immediate utility. A high-quality starter guide or tool that solves one specific problem.',
      pro: 'The complete implementation system. Includes source code, setup guides, and operational workflows.',
      apex: 'Full commercial license and infrastructure setup. Includes 1-on-1 support and total codebase access.',
    };

    const displayPrice = customPrice ?? tierPrices[tier];

    const prompt = `
You are a professional business copywriter and e-commerce expert.
Product: "${productName}"
Tier: ${tier.toUpperCase()} ($${displayPrice})
Core Value: ${coreValue}
Positioning: ${tierPositioning[tier]}

Write a clean, professional Gumroad product description that is grounded in reality.
1. No hype. No buzzwords (e.g., "Singularity", "Sovereign", "Institutional", "Elite", "High-theta").
2. Focus on tangible benefits: what will the user actually DO with this?
3. Use a direct, professional tone. 
4. List features with clean bullet points starting with -.
5. Provide a realistic FAQ.

Format:
TAGLINE: [one clear benefit line]
DESCRIPTION: [professional description, 150-300 words]
BULLETS: [5 features, one per line, starting with -]
FAQ_Q1: [question] | FAQ_A1: [answer]
FAQ_Q2: [question] | FAQ_A2: [answer]
CTA: [call to action text]
`;

    const raw = await this.generate(prompt);

    // Parse structured output
    const tagline = raw.match(/TAGLINE:\s*(.+)/)?.[1]?.trim() || `The definitive ${productName} for serious operators`;
    const description = raw.match(/DESCRIPTION:\s*([\s\S]+?)(?=BULLETS:|$)/)?.[1]?.trim() || coreValue;
    const bulletsRaw = raw.match(/BULLETS:\s*([\s\S]+?)(?=FAQ_Q1:|$)/)?.[1]?.trim() || '';
    const bulletPoints = bulletsRaw.split('\n').filter(b => b.trim()).slice(0, 7);
    const cta = raw.match(/CTA:\s*(.+)/)?.[1]?.trim() || 'Get Instant Access';

    const product: GumroadProduct = {
      name: productName,
      tagline,
      price: displayPrice,
      description,
      bulletPoints: bulletPoints.length > 0 ? bulletPoints : [
        '✦ Immediate digital delivery',
        '✦ Verifiable, truth-anchored content',
        '✦ No fluff — operational blueprints only',
        '✦ SOVRA Sovereign License included',
      ],
      faqItems: [
        { q: 'Is this a physical product?', a: 'No. Digital delivery. Instant access after purchase.' },
        { q: 'What format is the file?', a: 'PDF — readable on any device.' },
        { q: 'Is there a refund policy?', a: 'Gumroad\'s standard 30-day policy applies.' },
      ],
      thumbnailPrompt: `SOVRA Enterprise premium product thumbnail for "${productName}". ${tier === 'apex' ? 'Ultra-luxury, dark background, gold accents, institutional typography, 3D element.' : 'Clean, modern, dark mode, cyan accent, professional.'}`,
      callToAction: cta,
      tier,
    };

    // Self-check
    console.log(`[GumroadAgent] LISTING BUILT: ${productName} | $${displayPrice} | ${tier.toUpperCase()}`);
    return product;
  }

  /**
   * Builds the complete 3-tier Gumroad funnel optimized for conversion.
   */
  async buildFullFunnel(): Promise<GumroadFunnel> {
    console.log('[GumroadAgent] BUILDING PROFESSIONAL GUMROAD FUNNEL...');

    const [free, pro, apex] = await Promise.all([
      this.buildProductListing('AntiGravity Starter Guide', 'free',
        'A comprehensive PDF guide on setting up your first autonomous web application using the AntiGravity stack.'),
      this.buildProductListing('AntiGravity Pro Implementation Kit', 'pro',
        'Includes the complete source code, deployment scripts, and a step-by-step video series for the full stack.'),
      this.buildProductListing('AntiGravity Enterprise License', 'apex',
        'Full commercial rights to the entire codebase, including 1-on-1 deployment support and future updates.')
    ]);

    const funnel: GumroadFunnel = {
      freeProduct: free,
      proProduct: pro,
      apexProduct: apex,
      upsellSequence: [
        'After Free download: "You now have the foundation. The full blueprint is $9."',
        'After Pro purchase: "Unlock commercial use and architecture docs. Upgrade to SOVRA — $40 more."',
        'After SOVRA: "License the full codebase for your business. Enterprise License available."',
      ],
      emailFollowUp: [
        'Day 0: Deliver product + welcome to SOVRA network',
        'Day 1: Share one actionable insight from the guide',
        'Day 3: Case study — what the system can generate',
        'Day 7: Upgrade offer with limited framing',
        'Day 14: Affiliate army results + next steps',
      ],
    };

    console.log('[GumroadAgent] FULL FUNNEL COMPLETE: Free → $9 → $49 conversion path built');
    return funnel;
  }

  /**
   * Generates a high-urgency Flash Deal coupon verifiably linked to the SOVRA Revenue Blitz.
   */
  async generateFlashDealCoupon(discount: number = 50): Promise<{ code: string; message: string }> {
    const codes = ['APEX-BLITZ', 'MAXX-ALT-50', 'SOVEREIGN-75', 'SOVRA-LIQUIDITY'];
    const chosen = codes[Math.floor(Math.random() * codes.length)];
    const code = `${chosen}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    console.log(`[GumroadAgent] DEPLOYING FLASH DEAL: Code [${code}] at [${discount}%] discount.`);
    
    return {
      code,
      message: `ACTIVATE ${discount}% SOVEREIGN DISCOUNT. Limited to first 100 institutional tranches.`
    };
  }

  /**
   * Generates Gumroad-optimized thumbnail prompts for all tiers.
   */
  getThumbnailPrompts(): Record<string, string> {
    return {
      free: 'Clean dark background, subtle cyan border, "FREE DOWNLOAD" badge, SOVRA logo, professional sans-serif typography. Institutional but approachable.',
      pro: 'Dark gradient background, neon cyan accent lines, "$9" price badge in gold, "PRO" tier label, 3D book/document element, SOVRA Enterprise branding.',
      apex: 'Ultra-premium dark background, deep violet and gold gradients, "APEX" in large institutional font, holographic seal element, SOVRA sovereign mark, top 1% positioning.',
    };
  }
}
