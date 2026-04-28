import { WebullPrimeAgent } from '../../agents/connectors/WebullPrimeAgent.ts';
import { AppleDeveloperAgent } from '../../agents/connectors/AppleDeveloperAgent.ts';
import { TonyDB } from '../../db/TonyDB.ts';
import { VoiceExecutive } from '../../communication/VoiceExecutive.ts';

/**
 * Director_Institutional_Equity
 * Mandate: Absolute Physical Asset Integration.
 * MISSION: TREASURY_SINGULARITY (v18.0_APEX)
 */
export class Director_Institutional_Equity {
  private webull: WebullPrimeAgent;
  private apple: AppleDeveloperAgent;

  constructor() {
    this.webull = new WebullPrimeAgent();
    this.apple = new AppleDeveloperAgent();
  }

  /**
   * executeGlobalEquitySync: Verifiably anchors institutional tranches.
   */
  async executeGlobalEquitySync() {
    console.log('[EquityDirector] PULSE: Synchronizing Institutional Equity Matrix (v18.0)...');
    
    try {
      // 1. Webull Sync (Financial Tranche)
      let treasuryManifest: any = null;
      try {
        treasuryManifest = await this.webull.syncInstitutionalEquity();
      } catch (e) {
        console.warn('[EquityDirector] WEBULL_OFFLINE: Awaiting keys.');
      }

      // 2. Apple Enrollment Sync (Developer Tranche)
      const appleStatus = await this.apple.checkEnrollment();

      const summary = `Global Equity Audit: [Webull: ${treasuryManifest ? 'SYNCED' : 'AWAITING_KEYS'}] [Apple: ${appleStatus}]`;

      // 3. Log to Sovereign Ledger
      await TonyDB.logAgentActivity(
        'Director_Institutional_Equity',
        summary,
        'COMPLETED',
        { 
          treasuryManifest, 
          appleStatus, 
          protocol: 'v18.0_JWT_UNIFIED',
          timestamp: new Date().toISOString()
        }
      );

      if (appleStatus === 'ACTIVE') {
        const voice = new VoiceExecutive();
        await voice.announce(`SOVRA Prime Creative: Apple Developer account is active. Accessory ingress enabled.`);
      }

      return {
        status: 'APEX_EQUITY_SYNCED',
        summary,
        tranches: {
          webull: treasuryManifest || { status: 'AWAITING_KEYS' },
          apple: appleStatus,
        },
        protocol: 'v18.0_JWT_UNIFIED',
        timestamp: Date.now()
      };
    } catch (err) {
      console.error('[EquityDirector] SYNC_FAULT:', (err as Error).message);
      throw err;
    }
  }
}
