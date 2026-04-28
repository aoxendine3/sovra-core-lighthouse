import { verifyMessage } from 'viem';

/**
 * WEB3AUTH UTILITY (v1.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * Grounding Executive Identity via ECC Signature Recovery.
 */
export class Web3Auth {
  /**
   * VERIFY_EXECUTIVE_SIGNATURE: Recovers address and performs security handshake.
   * @param message The signed nonce (APEX_X_CLOUD_AUTH_...)
   * @param signature The hex-encoded signature from the wallet.
   * @param expectedAddress Optional address to check against (Whitelist).
   */
  static async verifyExecutiveSignature(
    message: string, 
    signature: `0x${string}`, 
    expectedAddress?: string
  ): Promise<{ success: boolean; address?: string; error?: string }> {
    try {
      const address = await verifyMessage({
        message,
        signature,
      });

      if (expectedAddress && address.toLowerCase() !== expectedAddress.toLowerCase()) {
        return { success: false, address, error: 'IDENTITY_MISMATCH: Address not anchored in Sovereign Whitelist.' };
      }

      return { success: true, address };
    } catch (err: any) {
      console.error('[Web3Auth] SIGNATURE_FAULT:', err.message);
      return { success: false, error: `SIGNATURE_FAULT: ${err.message}` };
    }
  }

  /**
   * GENERATE_NONCE: Creates a stateful nonce for replay protection.
   */
  static generateNonce(): string {
    return `APEX_X_CLOUD_AUTH_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}
