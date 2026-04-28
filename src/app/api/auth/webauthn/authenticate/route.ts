import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { apexUser, currentChallenge } from '../register/route';

export async function GET(req: Request, ) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const options = await generateAuthenticationOptions({
    rpID: 'localhost',
    allowCredentials: apexUser.devices.map(dev => ({
      id: dev.credentialID,
      type: 'public-key',
      transports: dev.transports,
    })),
    userVerification: 'preferred',
  });

  currentChallenge.value = options.challenge;

  return NextResponse.json(options);
}
