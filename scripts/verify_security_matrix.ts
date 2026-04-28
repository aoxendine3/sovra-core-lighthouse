import { AegisWarden } from '../src/lib/agents/security/AegisWarden';
import { CipherKing } from '../src/lib/agents/security/CipherKing';
import { GhostProtocol } from '../src/lib/agents/security/GhostProtocol';
import { HaloGuardian } from '../src/lib/agents/security/HaloGuardian';
import { PhantomSentry } from '../src/lib/agents/security/PhantomSentry';
import { BridgeOverseer } from '../src/lib/agents/security/BridgeOverseer';
import { SovereignVault } from '../src/lib/agents/security/SovereignVault';
import { PulseDefender } from '../src/lib/agents/security/PulseDefender';
import { ForensicSpectre } from '../src/lib/agents/security/ForensicSpectre';
import { RedTeamApex } from '../src/lib/agents/security/RedTeamApex';

async function verifySecurityMatrix() {
  console.log('--- [SECURITY_MATRIX_VERIFICATION] INITIATED ---');

  const agents = {
    AegisWarden: new AegisWarden(),
    CipherKing: new CipherKing(),
    GhostProtocol: new GhostProtocol(),
    HaloGuardian: new HaloGuardian(),
    PhantomSentry: new PhantomSentry(),
    BridgeOverseer: new BridgeOverseer(),
    SovereignVault: new SovereignVault(),
    PulseDefender: new PulseDefender(),
    ForensicSpectre: new ForensicSpectre(),
    RedTeamApex: new RedTeamApex(),
  };

  const results = await Promise.all(
    Object.entries(agents).map(async ([name, agent]) => {
      try {
        const pulse = await agent.provablePulse();
        console.log(`[VERIFIED] ${name}: ${pulse.status} | Signature: ${pulse.signature}`);
        return { name, status: 'SUCCESS' };
      } catch (err) {
        console.error(`[FAILED] ${name}:`, err);
        return { name, status: 'FAILED' };
      }
    })
  );

  const allSuccess = results.every(r => r.status === 'SUCCESS');
  console.log(`\n--- FINAL RESULT: ${allSuccess ? 'MATRIX_NOMINAL' : 'MATRIX_DEGRADED'} ---`);
  
  if (!allSuccess) process.exit(1);
}

verifySecurityMatrix().catch(err => {
  console.error('[CRITICAL_FAILURE]:', err);
  process.exit(1);
});
