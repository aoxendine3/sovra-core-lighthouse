import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request, request: Request) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('target');
  const handshake = searchParams.get('handshake');
  const category = searchParams.get('category') || 'UNKNOWN_NODE';
  const quality = searchParams.get('q') || 'default';

  if (!targetUrl || (handshake !== 'SOVRA_SOVEREIGN' && handshake !== 'APEX')) {
    return NextResponse.json(
      { error: 'Zero-Trust Verification Failed. Unauthorized routing attempt.' },
      { status: 403 }
    );
  }

  // Log this click to SOVRADB Ledger (master_dataset_001.json)
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: 'AD_CLICK_PROXY',
    target: targetUrl,
    handshake_validated: handshake,
    category: category,
    media_quality_tier: quality,
    user_agent: request.headers.get('user-agent') || 'UNKNOWN'
  };

  try {
    const dbPath = path.resolve(process.cwd(), 'sovereign_data/ad_metrics.jsonl');
    if (!fs.existsSync(path.dirname(dbPath))) {
       fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    }
    // Safe JSONL append (no array brackets)
    fs.appendFileSync(dbPath, JSON.stringify(logEntry) + '\n');
  } catch(e) {
    console.error('SOVRADB Write Error:', e);
  }

  console.log(`[API_TRACK] Verified outbound routing to: ${targetUrl} [Category: ${category}] [Quality: ${quality}]`);

  // Execute 302 Redirect to the CJ Affiliate URL
  return NextResponse.redirect(targetUrl, 302);
}
