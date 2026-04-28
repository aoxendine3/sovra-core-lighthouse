import { validateHandshake } from '@/lib/auth/Handshake';
import { NextRequest, NextResponse } from 'next/server';
import { SOVRADB } from '@/../jarvis/core/db/SOVRADB';
import { AegisSecurityService } from '@/lib/security/AegisSecurityService';

/**
 * SOVRA Product Feed (v1.2_Ω_SECURE)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Institutional egress for Pinterest Catalog Ingestion.
 * Mode: AEGIS_PROTECTED
 * 
 * Purpose: Allows Pinterest crawlers via User-Agent whitelisting,
 * but requires 512-bit PQ Handshake for all other extraction vectors.
 */
export async function GET(req: Request, req: NextRequest) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const ua = req.headers.get('user-agent') || '';
    const authKey = req.headers.get('x-aegis-auth') || '';
    
    const isPinterest = ua.toLowerCase().includes('pinterest') || ua.toLowerCase().includes('googlebot');
    const isAuthorized = AegisSecurityService.verifyTemporalAuthKey(authKey);

    // Ω_SECURITY: Block all non-whitelisted and non-authenticated scrapers
    if (!isPinterest && !isAuthorized) {
        console.warn(`[Aegis] BLOCKING_UNAUTHORIZED_EXTRACTION: ${ua}`);
        return new NextResponse(null, { status: 403 });
    }

    const db = await SOVRADB.getInstance();
    const products = await db.all('sovra_products');

    const baseUrl = 'https://sovra-15.myshopify.com';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>SOVRA Sovereign Catalog</title>
    <link>${baseUrl}</link>
    <description>Institutional-grade AI and Engineering assets. Powered by SOVRA OS.</description>`;

    for (const p of products) {
      const handle = p.name.toLowerCase().replace(/:/g, '').replace(/ /g, '-');
      const gpc = p.category === 'Tool/eBook' ? 'Software > Digital Goods' : 'Media > Books';
      
      const imgType = (p.id || 0) % 4 === 0 ? 'node' : (p.id || 0) % 4 === 1 ? 'core' : (p.id || 0) % 4 === 2 ? 'ledger' : 'vault';
      const imageUrl = p.image_src || `${baseUrl}/assets/institutional_${imgType}_v1.png`;
      
      xml += `
    <item>
      <g:id>${p.id || handle}</g:id>
      <g:title>${p.name}</g:title>
      <g:description>${p.description}</g:description>
      <g:link>${baseUrl}/products/${handle}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:brand>SOVRA Sovereign</g:brand>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${p.price} USD</g:price>
      <g:google_product_category>${gpc}</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
    }

    xml += `
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store, max-age=0',
        'X-Aegis-Confidence': '120/10'
      },
    });

  } catch (err) {
    console.error('Feed Generation Fault:', err);
    return NextResponse.json({ error: 'INTERNAL_FAULT' }, { status: 500 });
  }
}
