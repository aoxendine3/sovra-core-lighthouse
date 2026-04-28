import { validateHandshake } from '@/lib/auth/Handshake';
import { NextRequest, NextResponse } from 'next/server';
import { InstitutionalDeliveryNode } from '@/../agency/lib/agents/InstitutionalDeliveryNode';

/**
 * INSTITUTIONAL_DELIVERY_API (v20.0)
 * Endpoint: /api/institutional/deliver
 * Logic: Validates receipt and serves the sovereign asset.
 */

export async function GET(req: Request, req: NextRequest) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const receiptId = searchParams.get('receipt_id');
  const productId = searchParams.get('product_id');

  if (!receiptId || !productId) {
    return NextResponse.json({ error: 'MISSING_PARAMETERS' }, { status: 400 });
  }

  const deliveryNode = new InstitutionalDeliveryNode();
  const result = await deliveryNode.verifyAndDeliver(receiptId, productId);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 403 });
  }

  // Redirect to the Secure Sovereign Download Path
  return NextResponse.redirect(result.downloadUrl!);
}

export async function POST(req: Request, req: NextRequest) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  // Webhook handling from Gumroad
  const body = await req.json();
  console.log('[InstitutionalDelivery] WEBHOOK_RECIEVED:', body.sale?.id);
  
  return NextResponse.json({ status: 'WEBHOOK_PROCESSED' });
}
