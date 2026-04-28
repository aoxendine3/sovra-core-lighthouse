import crypto from 'crypto';

/**
 * Sovereign Key Provisioner
 * Generates raw 32-byte entropy for Ed25519 institutional keys.
 */
function provision() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  
  // Extract raw 32-byte entropy
  // Node.js returns these in a specific format; we need the raw keys for the DeepLock standard
  const pub = publicKey.export({ type: 'spki', format: 'der' }).slice(-32);
  const priv = privateKey.export({ type: 'pkcs8', format: 'der' }).slice(-32);

  console.log(`SOVEREIGN_PUB=${pub.toString('hex')}`);
  console.log(`SOVEREIGN_PRIV=${priv.toString('hex')}`);
}

provision();
