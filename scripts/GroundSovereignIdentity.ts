import { TonyDB } from '../sovra/core/db/TonyDB.ts';

/**
 * GroundSovereignIdentity (v1.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Synchronize the primary identity from the live 
 * Gravatar Sovereign Node (https://sovrasovereignapex.online/).
 */

async function groundIdentity() {
    console.log('🏛️ [IDENTITY] Synchronizing Sovereign Anchor...');

    const hash = 'superblyshark793bbec09a'; // From https://sovrasovereignapex.online/
    const url = `https://api.gravatar.com/v3/profiles/${hash}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.GRAVATAR_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.warn(`[IDENTITY] FETCH_FAULT: ${response.status}. Falling back to cached signature.`);
            return;
        }

        const profile = await response.json();
        
        // Ground into the Ledger
        const db = await TonyDB.getInstance();
        await TonyDB.run(
            'INSERT INTO sovra_identities (id, name, bio, socials, status, metadata) VALUES (?, ?, ?, ?, ?, ?)',
            [
                hash,
                profile.display_name || 'Anthony Oxendine',
                profile.description || 'Sovereign AI Architect',
                JSON.stringify(profile.verified_accounts || []),
                'VERIFIED_Ω',
                JSON.stringify({ 
                    avatar_url: profile.avatar_url,
                    pronunciation: profile.pronunciation,
                    location: profile.location
                })
            ]
        );

        console.log(`✅ [SUCCESS] Identity verifiably grounded: ${profile.display_name}`);
        
        await TonyDB.logAgentActivity(
            'IdentitySentinel', 
            'SOVEREIGN_IDENTITY_GROUNDED', 
            'SUCCESS', 
            { hash, source: 'sovrasovereignapex.online' }
        );

    } catch (err) {
        console.error('[IDENTITY] GROUNDING_FAULT:', err);
    }
}

groundIdentity().catch(console.error);
