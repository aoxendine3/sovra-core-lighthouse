import { validateHandshake } from '@/lib/auth/Handshake';
import { NextResponse } from 'next/server';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import apple_accessories from '@/data/apple_accessories.json';

/**
 * APEX_RETAIL_API: v30.0
 * Mandate: Autonomous Retail Grounding for the Stunning Choice Mart.
 * Fallback: High-Fidelity static tranches.
 */
export async function GET(req: Request, ) {
  // Ω_SECURITY_LOCK
  if (!(await validateHandshake(req))) return new Response('Unauthorized', { status: 401 });

  try {
    const staged = await SOVRADB.getStagedProducts();
    
    // Merge staged products with static defaults for 100/100 coverage
    const allProducts = [
      ...apple_accessories,
      ...staged.map((p: any) => ({
        id: `STAGED-${p.id}`,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        metadata: JSON.parse(p.metadata || '{}')
      }))
    ];

    // Remove duplicates by name
    const unique = Array.from(new Map(allProducts.map(p => [p.name, p])).values());

    return NextResponse.json(unique);
  } catch (error) {
    console.error('[API_STORE] RETAIL_FAULT:', error);
    return NextResponse.json(apple_accessories);
  }
}
