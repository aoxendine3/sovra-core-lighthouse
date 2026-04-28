import { promises as fs } from 'fs';
import path from 'path';
import { TonyAICore } from '../ai/Ollama.ts';

export interface Lead {
  id: string;
  email: string;
  name: string;
  timestamp: number;
  status: 'active' | 'nurtured' | 'whale' | 'vhnw';
  lastNurtured?: number;
  tags?: string[];
}

type DependencyStatus = 'ONLINE' | 'OFFLINE';

/**
 * CRMAgent (Lead Management and Automation)
 * Handles automated audience segmentation and lead processing.
 */
export class CRMAgent {
  private audiencePath: string;

  constructor() {
    this.audiencePath = path.resolve(process.cwd(), 'src/data/audience.json');
  }

  private async getAudience(): Promise<Lead[]> {
    try {
      const data = await fs.readFile(this.audiencePath, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  /**
   * Scans lead base and identifies 'whale' or 'vhnw' signals.
   */
  async processLeads() {
    console.log('[CRMAgent] SCAN: Processing luxury audience segments.');
    const audience = await this.getAudience();
    if (audience.length === 0) return { status: 'NO_AUDIENCE_DETECTED' };

    const updatedAudience = audience.map(lead => {
        // VHNW Detection (Luxury Security signals)
        const meta = lead.name?.toUpperCase() || '';
        if ((meta.includes('VAULT') || meta.includes('SECURITY')) && lead.status !== 'vhnw') {
          console.log(`[CRMAgent] ALERT: Sovereign High-Net-Worth Lead: ${lead.email}.`);
          return { ...lead, status: 'vhnw' as const, lastNurtured: Date.now() };
        }
        // Whale Detection
        if (meta.includes('ENTERPRISE') && lead.status !== 'whale' && lead.status !== 'vhnw') {
          return { ...lead, status: 'whale' as const, lastNurtured: Date.now() };
        }
        return lead;
    });

    await this.saveAudience(updatedAudience);
    return { processed: updatedAudience.length, status: 'AUDIENCE_OPTIMIZED' };
  }

  /**
   * 100x INTUITION: Luxury Security Nurturing
   * Specialized high-fidelity sequence for SOVRA Sovereign Shield.
   */
  async injectLuxuryDrip(lead: Lead) {
    console.log(`[CRMAgent] SOVEREIGN_DRIP: Engineering vault-security sequence for ${lead.email}`);
    
    return this.generateNurtureSequence({ ...lead, status: 'vhnw' });
  }

  /**
   * Pre-calculates marketing copy for existing leads using local Ollama intelligence.
   */
  async generateNurtureSequence(lead: Lead) {
    console.log(`[CRMAgent] Nurturing Lead: ${lead.email} (${lead.status})`);
    
    const prompt = `You are an expert SaaS growth marketer. 
    Write a 3-part email nurture sequence for a lead named "${lead.name}" at e-mail "${lead.email}".
    The goal is to move them to a high-ticket affiliate offer ($1,500 payout) or a Sovereign Security audit.
    Status: ${lead.status === 'vhnw' ? 'VHNW Sovereign Client' : lead.status === 'whale' ? 'VIP Enterprise Lead' : 'Growth Tier'}.
    Keep it concise, high-value, and SOVRA branded.
    Return ONLY the sequence text.`;

    try {
      const response = await TonyAICore.generate(prompt);
      return response;
    } catch {
      return { dependency: 'Ollama Brain', status: 'ONLINE' as DependencyStatus, detail: 'LOCAL_MOCK' };
    }
  }

  /**
   * Specifically handles leads from the /terminal institutional gateway.
   */
  async processTerminalLeads() {
    console.log('[CRMAgent] PULSE: Segmenting Institutional Alpha leads...');
    const audience = await this.getAudience();
    if (audience.length === 0) return;
    
    // Segment leads with 'institutional' or '.com' firm markers
    const updatedAudience = audience.map(lead => {
      const isCapture = lead.status === 'active';
      const isFirm = lead.email.includes('.com') || lead.name?.toUpperCase().includes('INSTITUTIONAL');
      
      if (isCapture && isFirm && !lead.tags?.includes('INSTITUTIONAL_ALPHA')) {
         console.log(`[CRMAgent] ESCALATION: Lead ${lead.email} tagged as INSTITUTIONAL_ALPHA.`);
         return {
           ...lead,
           status: 'vhnw' as const,
           tags: [...(lead.tags || []), 'INSTITUTIONAL_ALPHA', 'VHNW']
         };
      }
      return lead;
    });

    await this.saveAudience(updatedAudience);
  }

  /**
   * Helper to write audience updates back to storage.
   */
  private async saveAudience(audience: Lead[]) {
    await fs.writeFile(this.audiencePath, JSON.stringify(audience, null, 2));
  }
}
