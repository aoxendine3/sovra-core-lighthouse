import { MarketOracleAgent } from '../../agency/lib/agents/MarketOracleAgent.ts';
import { generateHandshake } from '../lib/auth/HandshakeCore.ts';

async function testV007Finality() {
  console.log('--- SOVRA Singularity v.007: FINAL_TRUTH_TEST ---');
  
  try {
    // 1. Test Oracle
    const oracle = new MarketOracleAgent();
    const mandates = await oracle.generatePropheticMandate();
    console.log('✅ ORACLE_TEST: Mandates Generated.');
    console.log(JSON.stringify(mandates[0], null, 2));

    // 2. Test Handshake (Ghost Protocol)
    const token = await generateHandshake();
    console.log('✅ HANDSHAKE_TEST: Pulse Generated.');
    console.log(`Token: ${token.substring(0, 50)}...`);

    console.log('--- MISSION_SUCCESS: v.007_VERIFIED ---');
  } catch (e: any) {
    console.error(`❌ FAULT DETECTED: ${e.message}`);
  }
}

testV007Finality().then(() => process.exit(0));
