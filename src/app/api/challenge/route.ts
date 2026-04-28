import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { SERVER_TIME_HEADER } from '@/lib/security/Fortress';
import { randomUUID } from 'crypto';

export async function GET(req: Request, ) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const nonce = randomUUID();
  return NextResponse.json(
    { nonce },
    {
      headers: {
        [SERVER_TIME_HEADER]: Date.now().toString(),
        'Cache-Control': 'no-store, no-cache',
      },
    }
  );
}
