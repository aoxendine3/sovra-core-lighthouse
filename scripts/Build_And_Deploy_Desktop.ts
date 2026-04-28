import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import os from 'os';

const execPromise = promisify(exec);

async function buildAndDeploy() {
  console.log('--- [DESKTOP_DEPLOYMENT] INITIATED ---');
  
  try {
    // 1. Production Next.js Build
    console.log('[BUILD] Generating Next.js Static Export...');
    await execPromise('npm run build');

    // 2. Electron Package
    console.log('[BUILD] Packaging Electron Application...');
    await execPromise('npx electron-builder --mac');

    // 3. Deployment
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const builtAppPath = path.join(process.cwd(), 'dist', 'mac', 'Maxx Sovereign Executive.app');
    const targetPath = path.join(desktopPath, 'Maxx_Apex.app');

    console.log(`[DEPLOY] Moving Executive Core to Desktop: ${targetPath}`);
    
    // Remove existing if any
    if (fs.existsSync(targetPath)) {
      await execPromise(`rm -rf "${targetPath}"`);
    }

    await execPromise(`cp -R "${builtAppPath}" "${targetPath}"`);

    console.log('[SUCCESS] Maxx Apex has been deployed to your Desktop.');
    console.log('--- [DESKTOP_DEPLOYMENT] COMPLETED ---');
    
  } catch (error) {
    console.error('[ERROR] Deployment failed:', error);
    process.exit(1);
  }
}

buildAndDeploy();
