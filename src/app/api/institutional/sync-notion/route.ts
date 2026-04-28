import { NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { NotionAgent } from '@agency/lib/agents/governance/NotionAgent';
import { audit } from '@/lib/logger/InstitutionalLogger';

/**
 * APEX-X: NOTION SYNC BRIDGE (v1.0)
 * Allows the Commander to trigger an institutional data sync to Notion.
 */

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Handshake Verification
    const isValid = await validateHandshake(req);
    
    if (!isValid) {
      return NextResponse.json({ status: 'SOVEREIGN_BLOCK', message: 'Unauthorized' }, { status: 403 });
    }

    // 2. Mission Execution
    console.log('[InstitutionalAPI] NOTION_SYNC: Triggering institutional heart-beat...');
    
    const agent = new NotionAgent();
    const [revResult, logResult] = await Promise.all([
        agent.syncRevenue(),
        agent.syncLogs()
    ]);

    await audit('info', 'INSTITUTIONAL_NOTION_SYNC', { 
        revenueItems: revResult.count, 
        logItems: logResult.count,
        mode: revResult.mode 
    });

    return NextResponse.json({
        status: 'SYNC_COMPLETE',
        revenuePulse: revResult.success ? 'GROUNDED' : 'FAILED',
        logPulse: logResult.success ? 'GROUNDED' : 'FAILED',
        mode: revResult.mode,
        timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('[InstitutionalAPI] NOTION_SYNC_FAULT:', err);
    return NextResponse.json({ status: 'INTERNAL_FAULT', message: 'Sync Interrupted' }, { status: 500 });
  }
}
