import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateHandshake } from './lib/auth/Handshake';
import { SOVRADB } from '../sovra/core/db/SOVRADB';

/**
 * SOVRA Sovereign Middleware (v1.1_Ω_FINALITY)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Institutional Perimeter Defense & Rate Limiting.
 */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

  // 1. ADD SECURITY HEADERS (Strict CSP, HSTS, etc.)
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost:11434;");
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  if (request.nextUrl.pathname.startsWith('/api')) {
    
    // 2. INSTITUTIONAL RATE LIMITING
    const db = await SOVRADB.getInstance();
    const now = Date.now();
    const limitWindow = 60000; // 1 minute
    const maxHits = 100; // 100 req/min/IP

    const rateData = await db.get('SELECT hits, last_reset FROM sovra_ratelimit WHERE ip = ?', [ip]);
    
    if (rateData) {
        if (now - rateData.last_reset < limitWindow) {
            if (rateData.hits >= maxHits) {
                console.warn(`[Aegis_RateLimit] BLOCKING_IP: ${ip} | Threshold Exceeded.`);
                return new NextResponse(JSON.stringify({ error: 'RATE_LIMIT_EXCEEDED' }), { status: 429, headers: { 'Content-Type': 'application/json' } });
            }
            await db.run('UPDATE sovra_ratelimit SET hits = hits + 1 WHERE ip = ?', [ip]);
        } else {
            await db.run('UPDATE sovra_ratelimit SET hits = 1, last_reset = ? WHERE ip = ?', [now, ip]);
        }
    } else {
        await db.run('INSERT INTO sovra_ratelimit (ip, hits, last_reset) VALUES (?, 1, ?)', [ip, now]);
    }

    // 3. WHITELIST_CRAWLERS
    const ua = request.headers.get('user-agent') || '';
    const isPublicCrawler = ua.toLowerCase().includes('pinterest') || ua.toLowerCase().includes('googlebot');
    const isFeed = request.nextUrl.pathname === '/api/feed';

    if (isFeed && isPublicCrawler) {
        return response;
    }

    // 4. VALIDATE Ω_FINALITY HANDSHAKE
    const isValid = await validateHandshake(request);

    if (!isValid) {
      console.warn(`[Aegis_Middleware] BLOCKED_UNAUTHORIZED_INGRESS: ${request.nextUrl.pathname} | UA: ${ua}`);
      return new NextResponse(
        JSON.stringify({ error: 'Institutional PQ Handshake Required (v1.5_Ω_FINALITY)' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
