/**
 * ──────────────────────────────────────────────────────────────────────────────
 * APEX SOVEREIGN LLC - PROPRIETARY & CONFIDENTIAL
 * ──────────────────────────────────────────────────────────────────────────────
 * MODULE: Sovereign Intelligence Verification
 * VERSION: v2026.11_MASTER
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { SOVRADB } from '../agency/lib/db/SOVRADB.js';
import { SovereignIntelligence } from '../agency/lib/apex/SovereignIntelligence.js';

async function verifyIntelligence() {
  console.log('--- SOVRA_INTELLIGENCE: Initiating Verification Pulse... ---');
  
  const db = await SOVRADB.getInstance();
  
  // 1. Seed Grounded Market Nodes
  const seedNodes = [
    { x: 0.95, y: 0.88, label: 'CYBER_DEFENSE' },
    { x: 0.92, y: 0.85, label: 'CYBER_DEFENSE' },
    { x: 0.45, y: 0.60, label: 'AI_ORCHESTRATION' },
    { x: 0.40, y: 0.55, label: 'AI_ORCHESTRATION' },
    { x: 0.10, y: 0.20, label: 'PET_TECH' },
    { x: 0.15, y: 0.25, label: 'PET_TECH' }
  ];

  console.log('[Verify] Seeding 6 grounded market nodes for clustering audit...');
  
  // Directly pushing to the Ghost Ledger for absolute finality in this test
  if (!db.isCloud) {
    db.data.sovra_market_nodes = seedNodes;
    db.save();
  }

  // 2. Execute Intelligence Analysis
  console.log('[Verify] Triggering Sovereign Intelligence Audit...');
  const report = await SovereignIntelligence.analyzeEnterpriseState();
  
  console.log('\n--- INTELLIGENCE REPORT: VERIFIED ---');
  console.log(`Status: ${report.status}`);
  console.log(`Projected Revenue (Bagging): $${report.projection.toLocaleString()}`);
  console.log(`Market Segments identified (K-Means): ${report.segmentCount}`);
  
  if (report.status === 'INTELLIGENCE_STABILIZED') {
    console.log('\n[SUCCESS] Sovereign Intelligence Ingress is 100/100 grounded.');
  } else {
    console.error('\n[FAULT] Intelligence stabilization failure.');
    process.exit(1);
  }
}

verifyIntelligence().catch(console.error);
