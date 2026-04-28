import { SOVRADB } from '../src/lib/db/SOVRADB';
import { spawn } from 'child_process';

async function activateSentryMode() {
  console.log('--- [APEX SOVEREIGN LLC: SENTRY_IGNITION] ---');
  
  // 1. Audit Primary Identity
  const stats = await SOVRADB.getEnterpriseStats();
  console.log(`[Sentry] Initializing security wall for ${stats.stagedProducts} assets...`);

  // 2. Register OWNER_AWAY event in Sovereign Ledger
  await SOVRADB.logAgentActivity(
    'SentryNode',
    `OWNER_AWAY protocol initiated. System transitioning to Autonomous Sentry Mode. Silent heartbeat enabled.`,
    'MISSION_ACTIVE'
  );

  console.log('[Sentry] Ledger updated. Enforcing Institutional Lockdown...');

  // 3. Ignite Autonomous Executive Loop in Silent/Sentry Mode
  console.log('[Sentry] Launching MaxxExec in --sentry mode...');
  
  const sentryProcess = spawn('npx', ['tsx', 'agency/MaxxExec.ts', '--sentry'], {
    detached: true,
    stdio: 'inherit'
  });

  sentryProcess.unref();

  console.log('[Sentry] ✅ Protocol Active. Agency is now in Autonomous Sentry Mode.');
  console.log('[Sentry] Silent Pulse: ON | Voice Feedback: OFF | Market Saturation: 100%');
}

activateSentryMode().catch(console.error);
