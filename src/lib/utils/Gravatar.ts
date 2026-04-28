import crypto from 'crypto';

/**
 * Gravatar Sovereign Utility (v3.0.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mission: Verifiably synchronize user profiles using the 
 * high-integrity SHA256 hashing protocol.
 * 
 * Mandate: Purge legacy MD5 usage. Adopt Rich Profile Data.
 */

export class Gravatar {
    private static API_KEY = process.env.GRAVATAR_API_KEY;

    /**
     * getHash: Generates the SHA256 hash for an email address.
     */
    static getHash(email: string): string {
        const cleanEmail = email.trim().toLowerCase();
        return crypto.createHash('sha256').update(cleanEmail).digest('hex');
    }

    /**
     * getAvatarUrl: Returns the high-resolution avatar URL.
     */
    static getAvatarUrl(email: string, size: number = 200): string {
        const hash = this.getHash(email);
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }

    /**
     * fetchProfile: Retrieves rich profile data (Socials, Crypto Wallets, etc.)
     * Required: GRAVATAR_API_KEY in .env.local
     */
    static async fetchProfile(email: string) {
        const hash = this.getHash(email);
        const url = `https://api.gravatar.com/v3/profiles/${hash}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.warn(`[Gravatar] PROFILE_FAULT: ${response.status}`);
                return null;
            }

            return await response.json();
        } catch (err) {
            console.error('[Gravatar] NETWORK_FAULT:', err);
            return null;
        }
    }
}
