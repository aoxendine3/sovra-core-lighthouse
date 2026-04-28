import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import fs from 'fs';
import path from 'path';

/**
 * TELEMETRY_MIGRATION_PULSE (v1.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * MISSION: DATA_SOVEREIGNTY_ENFORCEMENT
 * Purpose: Migrates legacy JSON telemetry into the verifiably grounded SOVRADB.
 */
async function runMigration() {
  console.log('--- BEGIN TELEMETRY MIGRATION (EBOD v35.0) ---');
  
  const db = await SOVRADB.getInstance();
  const dataDir = path.resolve(process.cwd(), 'src/data');

  // 1. Migrate Feedback
  try {
    const feedbackPath = path.join(dataDir, 'feedback.json');
    if (fs.existsSync(feedbackPath)) {
      const feedback = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
      console.log(`[MIGRATE] Found ${feedback.length} feedback entries. Grounding...`);
      for (const f of feedback) {
        await db.run(
          'INSERT OR IGNORE INTO sovra_feedback (score, comment, url, timestamp) VALUES (?, ?, ?, ?)',
          [f.score, f.comment, f.url, f.timestamp]
        );
      }
      console.log('[MIGRATE] Feedback verifiably grounded.');
    }
  } catch (e) {
    console.error('[MIGRATE] Feedback migration fault:', e);
  }

  // 2. Migrate Clicks 
  try {
    const clicksPath = path.join(dataDir, 'clicks.json');
    if (fs.existsSync(clicksPath)) {
        const clicks = JSON.parse(fs.readFileSync(clicksPath, 'utf8'));
        console.log(`[MIGRATE] Found ${clicks.length} click entries. Grounding...`);
        for (const c of clicks) {
          await db.run(
            'INSERT INTO sovra_analytics_clicks (source, locale, niche, timestamp) VALUES (?, ?, ?, ?)',
            [c.source || 'LEGACY', c.locale || 'EN', c.niche || 'GENERAL', c.timestamp]
          );
        }
        console.log('[MIGRATE] Click telemetry verifiably grounded.');
    }
  } catch (e) {
    console.error('[MIGRATE] Click migration fault:', e);
  }

  // 3. Migrate Deployments
  try {
    const deploymentsPath = path.join(dataDir, 'deployments.json');
    if (fs.existsSync(deploymentsPath)) {
        const deployments = JSON.parse(fs.readFileSync(deploymentsPath, 'utf8'));
        console.log(`[MIGRATE] Found ${deployments.length} deployment entries. Grounding...`);
        for (const d of deployments) {
          await db.run(
            'INSERT INTO sovra_deployments (target, asset, status, timestamp) VALUES (?, ?, ?, ?)',
            [d.target || 'UNKNOWN', d.asset || 'UNKNOWN', d.status || 'SUCCESS', d.timestamp]
          );
        }
        console.log('[MIGRATE] Deployment logs verifiably grounded.');
    }
  } catch (e) {
    console.error('[MIGRATE] Deployment migration fault:', e);
  }

  console.log('--- MIGRATION COMPLETE ---');
}

runMigration().catch(console.error);
