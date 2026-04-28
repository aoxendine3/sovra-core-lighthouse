import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { validateHandshake } from '@/lib/auth/Handshake';

/**
 * EXECUTIVE FEEDBACK API: v20.0_UNIFIED
 * Mandate: Qualitative Ingress for high-theta decision making.
 * SECURITY: Enforces the proprietary SOVRA Deep Lock protocol.
 */
export async function GET(req: Request) {
  try {
    // SECURITY: UNITARY INSTITUTIONAL HANDSHAKE
    const isValidHandshake = await validateHandshake(req);

    if (!isValidHandshake) {
      console.warn('[SECURITY] FEEDBACK_LOCK_FAILURE: Unauthorized sentiment attempt destroyed.');
      return NextResponse.json({ status: 'UNAUTHORIZED_ACCESS_TERMINATED' }, { status: 403 });
    }

    const feedbackPath = path.resolve(process.cwd(), 'src/data/feedback.json');
    if (!fs.existsSync(feedbackPath)) {
      return NextResponse.json([]);
    }

    const data = fs.readFileSync(feedbackPath, 'utf8');
    const feedback = JSON.parse(data);

    // Return most recent feedback first
    return NextResponse.json(feedback.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
    
  } catch (error) {
    console.error('[API_FEEDBACK] INGRESS_FAULT:', error);
    return NextResponse.json([], { status: 500 });
  }
}
