import { NextRequest, NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { SOVRADB } from '@/../sovra/core/db/SOVRADB';

/**
 * Sovereign API Gateway (v15.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Secure egress of institutional metrics and audit logs.
 * 
 * Logic: Synchronizes with the SOVRADB Sovereign Ledger for real-time 
 * autonomous telemetry.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');

  // 🛡️ SOVRA Handshake Validation (Spectral PQ Handshake)
  if (!(await validateHandshake(req))) {
    return NextResponse.json(
      { error: 'SECURITY_FAULT: Handshake signature invalid or missing.' },
      { status: 401 }
    );
  }

  try {
    // 🎯 Single Product Lookup
    if (handle) {
      const product = await SOVRADB.get('SELECT * FROM sovra_products WHERE name = ?', [handle]);

      if (!product) {
        return NextResponse.json({ error: 'PRODUCT_NOT_FOUND' }, { status: 404 });
      }

      return NextResponse.json({
        status: 'PRODUCT_RETRIEVED',
        product: {
          id: product.name,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          status: product.status,
          image: product.url || '/assets/aidt_hero.png'
        }
      });
    }

    // 📊 Metric Aggregation via Sovereign Ledger
    const stats = await SOVRADB.getEnterpriseStats();
    const products = await SOVRADB.all('SELECT * FROM sovra_products');
    const logs = await SOVRADB.all('SELECT * FROM sovra_agent_logs');

    return NextResponse.json({
      status: 'SOVRA_NODE_ONLINE',
      timestamp: new Date().toISOString(),
      metrics: {
        productCount: products.length,
        logCount: logs.length,
        revenueTotal: stats.grossRevenue || 0,
        missionCount: 1 // Baseline mission
      },
      activity: logs.slice(-20).reverse() // Recent activity
    });

  } catch (err) {
    console.error('SOVRA API Fault:', err);
    return NextResponse.json(
      { error: 'INTERNAL_API_FAULT', details: (err as Error).message },
      { status: 500 }
    );
  }
}
