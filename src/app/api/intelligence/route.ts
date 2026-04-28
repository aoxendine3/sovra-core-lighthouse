import { validateHandshake } from '@/lib/auth/Handshake';
import { SOVRADB } from '@/agency/lib/db/SOVRADB';
import { NextResponse } from 'next/server';

export async function GET(req: Request, ) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

    try {
        const db = await SOVRADB.getInstance();
        const reports = await db.all('SELECT * FROM sovereign_intelligence_library ORDER BY timestamp DESC');
        return NextResponse.json(reports);
    } catch (error) {
        console.error('[Intelligence API Error]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
