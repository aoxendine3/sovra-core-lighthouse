import { CoreKernel } from '@/lib/jarvis/kernel';

/**
 * PROJECT SENTINEL VERIFICATION: Global Pulse
 * Verifies the system's ability to maintain flawless online status.
 */
async function verifySentinelPulse() {
  console.log('--- STARTING PROJECT SENTINEL VERIFICATION ---');
  
  const kernel = new CoreKernel();

  // 1. Initial State Check
  console.log('[Verify] Running global technical health audit...');
  const heartbeat = await kernel.executeHeartbeat();

  if (heartbeat.status === 'HALTED') {
     console.error('[Verify] FAILURE: System halted during pulse. Dependency failure detected.');
  } else {
     console.log('[Verify] SUCCESS: Sentinel pulse confirmed. All technical dependencies ONLINE.');
  }

  // 2. Check AuthManager Registry
  const healthStatus = (kernel as any).auth.isSystemHealthy();
  console.log(`[Verify] System Health Registry State: ${healthStatus ? 'CLEAR' : 'WARNING'}`);

  console.log('--- VERIFICATION COMPLETE ---');
}

verifySentinelPulse().catch(err => {
   console.error('Sentinel Verification Failed:', err);
   process.exit(1);
});
