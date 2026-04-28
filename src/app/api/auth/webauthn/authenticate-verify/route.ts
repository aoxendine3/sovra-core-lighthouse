import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { apexUser, currentChallenge } from '../register/route';

export async function POST(req: Request, req: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const body = await req.json();

  const authenticator = apexUser.devices.find(
    dev => dev.credentialID.toString() === body.id
  );

  if (!authenticator) {
    return NextResponse.json({ error: 'Authenticator not found' }, { status: 400 });
  }

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: currentChallenge.value,
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
      authenticator,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { verified } = verification;

  if (verified) {
    authenticator.counter = verification.authenticationInfo.newCounter;
    // Set a secure cookie for the session
    const res = NextResponse.json({ verified: true });
    res.cookies.set('apex_fido_session', 'verified', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });
    return res;
  }

  return NextResponse.json({ verified: false }, { status: 400 });
}
