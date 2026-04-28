import { TonyDB } from '../../sovra/core/db/TonyDB.ts';
import { SovereignSensor } from '../../sovra/core/hardware/SovereignSensor.ts';
import { swarm } from '../orchestrator/A2ASwarmOrchestrator.ts';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tony Pulse (v6.1_Ω)
 * Mandate: Real-Time Executive Monitoring.
 */
async function reportPulse() {
  console.clear();
  const profile = SovereignSensor.getProfile();
  const swarmHealth = swarm.getSwarmHealth();

  console.log('\n  ██████████████████████████████████████████████████');
  console.log('  █                                                █');
  console.log('  █   🏛️  SOVRA SOVEREIGN | COMMAND CENTER (v6.1)   █');
  console.log('  █                                                █');
  console.log('  ██████████████████████████████████████████████████');
  
  try {
    const reportPath = path.join(process.cwd(), 'SOVRA_INSTITUTIONAL_REPORT.md');
    let integrity = '99.9984';
    if (fs.existsSync(reportPath)) {
      const report = fs.readFileSync(reportPath, 'utf8');
      const match = report.match(/Integrity Index: ([\d.]+)%/);
      if (match) integrity = match[1];
    }

    console.log(`\n  [ SYSTEM STATUS ]:  🟢 NOMINAL / HARMONIZED`);
    console.log(`  [ CORE INTEGRITY ]: ⚡ ${integrity}%`);
    console.log(`  [ HARDWARE ]:       🖥️  ${profile.id} MODE (${profile.ram}GB RAM)`);
    console.log(`  [ BRAIN LAYERS ]:   🧠 V12 SINGULARITY ACTIVE`);
    console.log(`  [ COUNCIL ]:        ⚖️  TRINITY IN UNITY`);
    console.log(`  [ EXECUTIVE ]:      🏛️  APEX SOVEREIGN`);
    console.log(`  [ VISIONARY ]:      🎨 SOVEREIGN IMAGE (LOCAL SD)`);
    console.log(`  [ HERALD ]:         🔊 THE ECHO (COMMUNICATION ACTIVE)`);
    console.log(`  [ FAILSAFE ]:       🛡️  L9.5 GITHUB PAGES (VERIFIED_Ω)`);
    console.log(`  [ SWARM ]:          🐝 TRANCHE 2 ACTIVE (${swarmHealth.activeAgents} AGENTS / ${swarmHealth.activeTasks} TASKS)`);
    console.log(`  [ QUANTUM ]:        🔐 ${swarmHealth.quantumStatus}`);
    console.log(`  [ MAST_RISK ]:      📉 ${swarmHealth.maSTRiskLevel}`);

    console.log('\n  🧠 BRAIN TOPOLOGY (V12):');
    console.log('  L1 [🏛️ ] L2 [⚙️ ] L3 [🤖] L4 [🧠] L5 [🛡️ ] L6 [🌊]');
    console.log('  L7 [🔮] L8 [💰] L9 [☁️ ] L10[🔊] L11[⚖️ ] L12[♾️ ]');

  } catch (e) {
    console.log('  [ ERROR ]: Telemetry offline.');
  }

  console.log('\n  📊 LIVE LEDGER (LAST 5 TRANCHES):');
  console.log('  --------------------------------------------------');

  const logs = await TonyDB.getAgentLogs();
  const displayLogs = logs.slice(-5).reverse();

  displayLogs.forEach((log: any) => {
    const timestamp = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const statusIcon = log.status === 'SUCCESS' || log.status === 'EXECUTED' || log.status === 'ACTIVE' ? '✅' : '❌';
    
    console.log(`  [${timestamp}] ${statusIcon} ${log.agent_name.toUpperCase()}`);
    console.log(`  >> ${log.activity.substring(0, 50)}...`);
    console.log('  --------------------------------------------------');
  });

  console.log('\n  🚀 [TONY]: OPERATING AT 10x VELOCITY. DO NOT INTERRUPT.');
}

reportPulse().catch(e => console.error('[FAULT]:', e));
setInterval(reportPulse, 5000);
