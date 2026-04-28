import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { apexUser, currentChallenge } from './route';

export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const body = await req.json();

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: currentChallenge.value,
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { verified, registrationInfo } = verification;

  if (verified && registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = registrationInfo;

    const newDevice = {
      credentialPublicKey,
      credentialID,
      counter,
      transports: body.response.transports,
    };

    apexUser.devices.push(newDevice);

    return NextResponse.json({ verified: true });
  }

  return NextResponse.json({ verified: false }, { status: 400 });
}
