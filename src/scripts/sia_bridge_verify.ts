import fs from 'fs';
import path from 'path';

async function verifySIABridge() {
  console.log('--- SIA INSTITUTIONAL BRIDGE VERIFICATION ---');

  const bridges = [
    { name: 'gate_keeper', path: path.join(process.cwd(), 'aux/gate_keeper') },
    { name: 'mac-jarvis', path: path.join(process.cwd(), 'aux/mac-jarvis') }
  ];

  let bridgeFaults = 0;

  for (const bridge of bridges) {
    console.log(`[BRIDGE] Checking ${bridge.name} at ${bridge.path}...`);
    
    try {
      const stats = fs.lstatSync(bridge.path);
      if (stats.isSymbolicLink()) {
        const target = fs.readlinkSync(bridge.path);
        console.log(`[PASS] ${bridge.name} verifiably bridged -> ${target}`);
      } else {
        console.error(`[FAIL] ${bridge.name} is not a symbolic link.`);
        bridgeFaults++;
      }
    } catch (err) {
      console.error(`[FAIL] ${bridge.name} bridge inaccessible or missing.`);
      bridgeFaults++;
    }
  }

  // Check for SIA Identity in key configuration
  console.log('[IDENTITY] Verifying SIA Branding in APEX core...');
  const routePath = path.join(process.cwd(), 'src/app/api/jarvis/route.ts');
  const routeContent = fs.readFileSync(routePath, 'utf8');
  
  if (routeContent.includes('SIA Global Institutional Intelligence Core')) {
    console.log('[PASS] APEX identity synchronized with SIA mandate.');
  } else {
    console.error('[FAIL] APEX identity drift detected.');
    bridgeFaults++;
  }

  console.log('--- BRIDGE AUDIT COMPLETE ---');
  if (bridgeFaults === 0) {
    console.log('MISSION_SUCCESS: SIA_BRIDGE_STABLE');
    process.exit(0);
  } else {
    console.log(`MISSION_FAULT: ${bridgeFaults} critical bridge errors identified.`);
    process.exit(1);
  }
}

verifySIABridge().catch(e => {
  console.error('[FATAL] Bridge Audit Interrupted:', e);
  process.exit(1);
});
