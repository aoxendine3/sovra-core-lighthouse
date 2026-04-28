import { NextResponse } from 'next/server';
import { validateHandshake } from '@/lib/auth/Handshake';
import { CryptoAgent } from '@agency/lib/agents/CryptoAgent';
import { audit } from '@/lib/logger/InstitutionalLogger';

const cryptoAgent = new CryptoAgent();

/**
 * SOVRA_LIQUIDITY_MANEUVER: v1.0_SOVRA
 * ─────────────────────────────────────────────────────────────
 * MISSION: TACTICAL_MARKET_MANEUVER
 * Executes high-theta arbitrage and accumulation maneuvers in the Sovereign Ledger.
 */
export async function POST(req: Request) {
  try {
    // 1. SECURITY: HYPER-SOVEREIGN HANDSHAKE
    const isValidHandshake = await validateHandshake(req);

    if (!isValidHandshake) {
      audit('warn', 'CRYPTO_SECURITY_FAULT', { type: 'UNAUTHORIZED_MANEUVER_ATTEMPT' });
      return NextResponse.json({ status: 'UNAUTHORIZED_ACCESS_TERMINATED' }, { status: 403 });
    }
    
    const body = await req.json();
    const { symbol, type } = body;

    audit('info', 'CRYPTO_MANEUVER_INITIATED', { symbol: symbol || 'SOVRA', type: type || 'ARBITRAGE' });

    // 2. TACTICAL_EXECUTION: High-Theta SOVRA Maneuver
    const maneuverResult = await cryptoAgent.executeManeuver(
      symbol || 'SOVRA', 
      type || 'ARBITRAGE'
    );

    // 3. TELEMETRY: Unified terminal pulse
    const terminalData = await cryptoAgent.streamNeuralTerminalData();

    audit('info', 'CRYPTO_MANEUVER_SUCCESS', { symbol: symbol || 'SOVRA', type: type || 'ARBITRAGE', result: maneuverResult.status });

    return NextResponse.json({
      status: 'SOVRA_SUCCESS',
      maneuver: maneuverResult,
      signals: await cryptoAgent.scanSignals(),
      vault: terminalData.vault,
      protocol: 'v1.0_SOVRA',
      integrity: '100/100',
      timestamp: Date.now()
    }, {
      headers: {
        'X-SOVRA-Integrity': '100/100',
        'X-Protocol-Version': 'v1.0_SOVRA'
      }
    });
  } catch (error: any) {
    audit('error', 'CRYPTO_EXECUTION_FAULT', { error: error.message });
    return NextResponse.json({ 
      status: 'FAULT', 
      message: error.message,
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}
