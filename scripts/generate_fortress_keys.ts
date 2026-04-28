import { generateKeyPairSync } from 'crypto';

/**
 * AURVANT v19.0 Fortress - Key Generator
 * Generates Ed25519 PKCS8 (Private) and SPKI (Public) keys in Base64
 */

const { publicKey, privateKey } = generateKeyPairSync('ed25519', {
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

console.log('--- AURVANT v19.0 FORTRESS KEYS ---');
console.log('\n[SERVER-SIDE] AURVANT_PRIVATE_KEY:');
console.log(Buffer.from(privateKey).toString('base64'));

console.log('\n[CLIENT-SIDE] AURVANT_PUBLIC_KEY:');
console.log(Buffer.from(publicKey).toString('base64'));
console.log('\n------------------------------------');
console.log('CRITICAL: Store the Private Key in your secure vault. NEVER commit it to GitHub.');
