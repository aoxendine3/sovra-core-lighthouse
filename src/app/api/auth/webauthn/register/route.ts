import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';

// In-memory store for the sole sovereign user (APEX). 
// In production, move to SOVRADB/Redis.
export const apexUser = {
  id: 'apex-sovereign-001',
  username: 'apex',
  devices: [] as any[], // Array of AuthenticatorDevices
};

export const currentChallenge = { value: '' };

export async function GET(req: Request, ) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const options = await generateRegistrationOptions({
    rpName: 'SOVRA Sovereign Fortress',
    rpID: 'localhost',
    userID: new Uint8Array(Buffer.from(apexUser.id)),
    userName: apexUser.username,
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
      authenticatorAttachment: 'platform', // Forces TouchID/FaceID
    },
  });

  currentChallenge.value = options.challenge;

  return NextResponse.json(options);
}
