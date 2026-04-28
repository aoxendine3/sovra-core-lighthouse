import fs from 'fs/promises';
import path from 'path';

const TARGET_DIRS = [
  path.join(process.cwd(), 'src'),
  path.join(process.cwd(), 'agency'),
  path.join(process.cwd(), '.agents')
];

const ALLOWED_EXTS = new Set(['.ts', '.tsx', '.md', '.css', '.js', '.json', '.Modelfile']);

async function getFilesAndDirs(dir: string): Promise<{ files: string[], dirs: string[] }> {
  let files: string[] = [];
  let dirs: string[] = [];
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.name === 'node_modules' || item.name === '.git' || item.name === '.next') continue;
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
         dirs.push(fullPath);
         const sub = await getFilesAndDirs(fullPath);
         files.push(...sub.files);
         dirs.push(...sub.dirs);
      } else {
         files.push(fullPath);
      }
    }
  } catch (err) {
    // skip
  }
  return { files, dirs };
}

async function purgeLiability() {
  console.log('[IP_PURGE] Commencing Global SIA_CORE Demolition...');
  let totalReplacedFiles = 0;
  let totalRenamedPaths = 0;

  for (const rootDir of TARGET_DIRS) {
     const { files, dirs } = await getFilesAndDirs(rootDir);
     
     // 1. TEXT REPLACEMENT IN FILES
     for (const file of files) {
       const ext = path.extname(file);
       if (ALLOWED_EXTS.has(ext) || file.endsWith('Modelfile')) {
          try {
             let content = await fs.readFile(file, 'utf8');
             if (content.match(/sia_core/i)) {
               content = content.replace(/SIA_CORE\.AI/g, 'SIA_CORE.AI');
               content = content.replace(/SIA_CORE_GOLD/g, 'SIA_CORE_GOLD');
               content = content.replace(/SIA_CORE/g, 'SIA_CORE');
               content = content.replace(/SiaCore/g, 'SiaCore');
               content = content.replace(/sia_core/g, 'sia_core');
               await fs.writeFile(file, content);
               totalReplacedFiles++;
             }
          } catch (e) {
             console.error(`Failed reading ${file}`);
          }
       }
     }

     // 2. FILE AND DIRECTORY RENAMING
     // Must sort by deep paths first so renaming a parent doesn't break sub-paths
     const allPaths = [...files, ...dirs].sort((a, b) => b.length - a.length);

     for (const p of allPaths) {
        const basename = path.basename(p);
        if (basename.match(/sia_core/i)) {
           let newBasename = basename;
           newBasename = newBasename.replace(/SIA_CORE/g, 'SIA_CORE');
           newBasename = newBasename.replace(/SiaCore/g, 'SiaCore');
           newBasename = newBasename.replace(/sia_core/g, 'sia_core');
           
           const newPath = path.join(path.dirname(p), newBasename);
           try {
             await fs.rename(p, newPath);
             totalRenamedPaths++;
           } catch (e) {
             // likely already renamed or locked
           }
        }
     }
  }

  console.log('--- PURGE REPORT ---');
  console.log(`- Files Sanitized (Content): ${totalReplacedFiles}`);
  console.log(`- Paths Renamed (Structural): ${totalRenamedPaths}`);
  console.log('STATUS: SIA_CORE FULLY GROUNDED. LIABILITY EVAPORATED.');
}

purgeLiability().catch(e => {
  console.error('[FATAL] Purge Interrupted:', e);
});
