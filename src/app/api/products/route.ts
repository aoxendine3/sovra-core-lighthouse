import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB.ts';

export async function GET(req: Request, ) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const db = await SOVRADB.getInstance();
    const { rows } = await db.pool.query('SELECT * FROM sovra_products WHERE status = \'ACTIVE\' ORDER BY timestamp DESC');
    
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: 'FAILED_TO_LOAD_PRODUCTS' }, { status: 500 });
  }
}
