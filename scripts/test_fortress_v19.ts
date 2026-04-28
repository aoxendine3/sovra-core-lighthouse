import { generateHandshake, validateHandshake } from '../agency/lib/auth/Handshake.ts';

// Mock request object structure for testing
function createMockRequest(token: string) {
  return {
    headers: {
      get: (name: string) => {
        if (name.toLowerCase() === 'x-SOVRA_APEX-deep-lock') return token;
        return null;
      }
    }
  };
}

async function runFortressTests() {
  console.log('\n======================================================');
  console.log('🛡️  SOVRA_APEX ZERO-POINT DEEP LOCKING v19.0 "FORTRESS" AUDIT 🛡️');
  console.log('======================================================\n');

  try {
    // 1. VALID HANDSHAKE TEST
    console.log('[TEST 1] Initiating Standard Valid Handshake...');
    const validToken = await generateHandshake('POST', '/api/secure-endpoint');
    console.log('   -> Token Generated:', validToken.substring(0, 40) + '...');
    
    const req1 = createMockRequest(validToken);
    const result1 = await validateHandshake(req1);
    
    if (result1.valid) {
      console.log('   ✅ PASS: Valid handshake accepted.\n');
    } else {
      console.error('   ❌ FAIL: Valid handshake was rejected!\n', result1.error);
    }

    // 2. REPLAY ATTACK SIMULATION
    console.log('[TEST 2] Simulating Replay Attack (Duplicate JTI)...');
    console.log('   -> Attempting to use the exact same token again...');
    const req2 = createMockRequest(validToken);
    const result2 = await validateHandshake(req2);
    
    if (!result2.valid) {
      console.log('   ✅ PASS: Replay attack successfully blocked.\n');
    } else {
      console.error('   ❌ FAIL: Replay attack succeeded! The cache failed.\n');
    }

    // 3. TEMPORAL DRIFT SIMULATION (Clock Skew)
    console.log('[TEST 3] Simulating Temporal Drift Attack (Clock Skew > 2.5s)...');
    console.log('   -> Generating valid token...');
    const driftToken = await generateHandshake('GET', '/api/temporal');
    
    console.log('   -> Artificially waiting 3 seconds to simulate drift...');
    // Wait for 3 seconds to exceed the 2.5-second drift tolerance
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const req3 = createMockRequest(driftToken);
    const result3 = await validateHandshake(req3);
    
    if (!result3.valid) {
      console.log('   ✅ PASS: Temporal drift attack successfully blocked.\n');
    } else {
      console.error('   ❌ FAIL: Temporal drift attack succeeded! Tolerance is too loose.\n');
    }

    console.log('======================================================');
    console.log('🏁 FORTRESS AUDIT COMPLETE');
    console.log('======================================================\n');

  } catch (err) {
    console.error('Test Execution Fault:', err);
  }
}

runFortressTests();
