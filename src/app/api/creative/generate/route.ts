export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { CreativeAgent } from '@agency/lib/agents/CreativeAgent';
import { validateHandshake } from '@/lib/auth/Handshake';
import { SOVRADB } from '@agency/lib/db/SOVRADB';
import { audit } from '@/lib/logger/InstitutionalLogger';

const creativeAgent = new CreativeAgent();

// Pool of pre-engineered high-fidelity assets for the "Workspace" debut
const ASSET_POOL = [
  '/ads/sovra_sovereign_coin_ad.png',
  '/ads/creator_studio_concept.png',
  '/ads/sovereign_creator_portrait.png'
];

/**
 * Creative Generation API: v20.0_APEX
 * ─────────────────────────────────────────────────────────────
 * MISSION: VIRAL_ASSET_ENGINEERING
 * Purpose: Generates ad creatives and grounds them in the creative history ledger.
 */
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  try {
    // SECURITY: INSTITUTIONAL HANDSHAKE
    if (!await validateHandshake(req)) {
      audit('warn', 'CREATIVE_AUTH_FAILURE', { ip });
      return NextResponse.json({ status: 'UNAUTHORIZED' }, { status: 401 });
    }

    const body = await req.json();
    const { hook } = body;

    if (!hook) {
      return NextResponse.json({ error: 'Missing Viral Hook payload' }, { status: 400 });
    }

    // 1. Engineer the Creative Metadata (Copy + Image Prompt)
    audit('info', 'CREATIVE_ENGINEERING_START', { platform: hook.platform });
    const adSet = await creativeAgent.engineerCreative(hook);

    // 2. Select the optimal asset from the high-fidelity cloud pool
    const selectedAsset = ASSET_POOL[Math.floor(Math.random() * ASSET_POOL.length)];

    // 3. Ground the creative in the SOVRADB Ledger (v37.0)
    await SOVRADB.recordCreativeGeneration({
      ad_id: adSet.id,
      platform: hook.platform,
      hook_type: hook.type || 'ViralHook',
      copy: adSet.copy,
      image_url: selectedAsset
    });

    audit('info', 'AD_CREATIVE_GROUNDED', { adId: adSet.id, platform: hook.platform });

    return NextResponse.json({
      status: 'AD_CREATIVE_GENERATED',
      adId: adSet.id,
      copy: adSet.copy,
      imageUrl: selectedAsset,
      platform: hook.platform,
      timestamp: Date.now()
    });

  } catch (error: any) {
    audit('error', 'CREATIVE_GENERATION_FAULT', { ip, error: error.message });
    return NextResponse.json({ error: 'Internal Deployment Error' }, { status: 500 });
  }
}
