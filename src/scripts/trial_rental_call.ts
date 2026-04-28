import { createSOVRAToken } from '../lib/auth/Handshake.ts';
import { RentalAgent } from '../../agency/lib/agents/RentalAgent.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import { audit } from '../lib/logger/InstitutionalLogger.ts';

/**
 * INSTITUTIONAL EXECUTION: B2B Agent Rental (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: AGENT_RENTAL_PULSE
 * Purpose: Executes and grounds billable agent sessions.
 */
async function executeTrialRental() {
  audit('info', 'B2B_RENTAL_PULSE_INITIATED');
  
  try {
    const agent = new RentalAgent();

    audit('info', 'RENTAL_AGENT_DEPLOYMENT_START', { agent: 'SocialAgent' });
    const result = await agent.deployRentedAgent('SocialAgent', 'Engineer 5 hooks for high-fidelity audio equipment.', 'CLEARED');

    if (result.status === 200 || result.status === 'SUCCESS') {
      const amount = result.invoiceDeducted || 50.00;
      audit('info', 'RENTAL_TRANSACTION_SUCCESS', { amount });
      
      // Direct Database Recording
      await SOVRADB.trackRevenue(`Institutional_Rental_SocialAgent`, amount, amount);
      audit('info', 'RENTAL_REVENUE_GROUNDED', { source: 'SocialAgent', amount });
    } else {
      audit('warn', 'RENTAL_TRANSACTION_FAILED', { result });
    }

  } catch (err: any) {
    audit('error', 'RENTAL_PULSE_FAULT', { error: err.message });
  }
}

executeTrialRental();
