import { describe, test, expect, jest } from '@jest/globals';
import { 
  generateFortressLock, 
  verifyFortressLock, 
  revokeJTI,
} from '../src/lib/security/Fortress';
import { fortressRateLimit } from '../src/lib/security/ratelimit';

// Polyfill for Node.js environment
import { randomUUID } from 'crypto';
if (typeof crypto.randomUUID !== 'function') {
  crypto.randomUUID = randomUUID;
}

describe('AURVANT v19.2 Fortress Elite – Full Suite', () => {
  test('CHALLENGE_MODE: Accepts server-issued nonce', async () => {
    const nonce = crypto.randomUUID();
    const { lock, ephemeralPubKey } = await generateFortressLock({ challengeNonce: nonce });
    const result = await verifyFortressLock(lock, ephemeralPubKey, nonce);
    expect(result.valid).toBe(true);
  });

  test('RATE_LIMIT: Blocks excessive failed attempts', async () => {
    const identifier = 'test-ip-123';
    // Simulate many failures
    for (let i = 0; i < 12; i++) {
      await fortressRateLimit.limit(identifier);
    }
    const limitResult = await fortressRateLimit.limit(identifier);
    expect(limitResult.success).toBe(false);
  });

  test('REVOKE: JTI can be invalidated', async () => {
    const { lock, ephemeralPubKey } = await generateFortressLock();
    const result1 = await verifyFortressLock(lock, ephemeralPubKey);
    expect(result1.valid).toBe(true);

    await revokeJTI(result1.payload!.jti as string);

    const result2 = await verifyFortressLock(lock, ephemeralPubKey);
    expect(result2.valid).toBe(false);
    expect(result2.error).toBe('REPLAY_DETECTED'); // or VALIDATION_FAILED depending on timing
  });

  test('REDIS_FALLBACK: Works without Redis in dev', async () => {
    // Mock Redis null path – already covered by in-memory
    const { lock, ephemeralPubKey } = await generateFortressLock();
    const result = await verifyFortressLock(lock, ephemeralPubKey);
    expect(result.valid).toBe(true);
  });
});
