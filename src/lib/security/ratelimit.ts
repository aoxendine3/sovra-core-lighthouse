import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis silently, failing gracefully if env variables are missing in dev
let redisClient: Redis;
try {
  redisClient = Redis.fromEnv();
} catch {
  // Mock Redis for local dev without UPSTASH_REDIS_REST_URL
  redisClient = {
    set: async () => 'OK',
    get: async () => null,
    del: async () => 1,
    incr: async () => 1,
    pexpire: async () => 1,
    eval: async () => [1, Date.now() + 60000, 10, Date.now()], // Mock valid rate limit response
  } as unknown as Redis;
}

// 10 failed Fortress attempts per minute per IP/fingerprint
export const fortressRateLimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
  prefix: 'aurvant:fortress:ratelimit',
});

// 100 general API requests per 10 seconds per IP/fingerprint
export const apiRateLimit = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(100, '10 s'),
  prefix: 'aurvant:api',
});
