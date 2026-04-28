/**
 * APEX-X: HYPER-SOVEREIGN HANDSHAKE CLIENT (v62.0_SENTINEL_NORMALIZED)
 * ─────────────────────────────────────────────────────────────
 * MISSION: SERVER_SIDE_PULSE_ACQUISITION
 * Purpose: Acquires authoritative security handshakes from the central API.
 * This ensures the browser never handles the private HANDSHAKE_SECRET.
 */

/**
 * generateHandshake: Authoritative browser-side acquisition.
 */
export async function generateHandshake(): Promise<string> {
  try {
    const res = await fetch('/api/handshake/pulse');
    if (!res.ok) throw new Error(`[SOVRA] Pulse Acquisition Failed: ${res.status}`);
    const data = await res.json();
    return data.token;
  } catch (err) {
    console.error('[SOVRA] HANDSHAKE_CLIENT_FAULT:', err);
    throw err;
  }
}

/**
 * generateHandshakeHeaders: Convenience helper for authorized fetch requests.
 */
export async function generateHandshakeHeaders() {
  const token = await generateHandshake();
  return {
    'X-SOVRA-DEEP-LOCK': token,
    'Content-Type': 'application/json'
  };
}

/**
 * createSOVRAToken: Direct alias for generateHandshake to support legacy SOVRA-X naming.
 */
export { generateHandshake as createSOVRAToken };
