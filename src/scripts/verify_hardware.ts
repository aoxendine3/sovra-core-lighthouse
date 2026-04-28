import fs from 'fs/promises';
import path from 'path';
import { ResourceGuard } from '@/lib/jarvis/ResourceGuard';

/**
 * HYBRID SOVEREIGNTY VERIFICATION: Disk Pressure
 * Simulates log saturation to verify the ResourceGuard's pruning logic.
 */
async function verifyDiskProtection() {
  console.log('--- STARTING HARDWARE PROTECTION VERIFICATION ---');
  
  const targetPath = path.resolve(process.cwd(), 'src/data/deployments.json');
  const dirPath = path.dirname(targetPath);

  // 1. Create directory if missing
  await fs.mkdir(dirPath, { recursive: true });

  // 2. Simulate 12000 log entries (Pressure > 10MB)
  const heavyPayload = Array.from({ length: 12000 }).map((_, i) => ({
    id: i,
    data: 'X'.repeat(1024), // 1KB per entry -> 12MB total
    timestamp: new Date().toISOString()
  }));

  console.log('[Verify] Generating simulated log pressure (12000 entries)...');
  await fs.writeFile(targetPath, JSON.stringify(heavyPayload, null, 2));

  // 3. Trigger Audit
  console.log('[Verify] Triggering ResourceGuard audit...');
  await ResourceGuard.auditResources();

  // 4. Verify result
  const finalData = JSON.parse(await fs.readFile(targetPath, 'utf8'));
  console.log(`[Verify] Final entry count: ${finalData.length}`);

  if (finalData.length <= 100) {
    console.log('[Verify] SUCCESS: ResourceGuard successfully pruned logs to preserve SSD space.');
  } else {
    console.error('[Verify] FAILURE: logs were not pruned correctly.');
  }
  
  console.log('--- VERIFICATION COMPLETE ---');
}

verifyDiskProtection().catch(err => {
   console.error('Hardware Verification Failed:', err);
   process.exit(1);
});
