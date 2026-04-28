import { ollama } from './Ollama';

/**
 * Quick smoke-test for the local Ollama connection.
 * Run with: npx ts-node xoras/core/ai/test-ollama.ts
 */
async function main() {
  console.log('─────────────────────────────────────');
  console.log('  XORAS Ollama Connection Test');
  console.log('─────────────────────────────────────');

  // 1. Health check
  const alive = await ollama.isAlive();
  console.log(`[1] Ollama alive: ${alive ? '✅ YES' : '❌ NO — is Ollama running?'}`);
  if (!alive) process.exit(1);

  // 2. List models
  const models = await ollama.listModels();
  console.log(`[2] Available models (${models.length}):`);
  models.forEach(m => console.log(`    • ${m.name} (${(m.size / 1e9).toFixed(1)} GB)`));

  // 3. Quick generate
  console.log('[3] Sending test prompt...');
  const response = await ollama.generate('Reply with exactly: XORAS_OK', {
    num_predict: 20,
    temperature: 0.0,
  });
  console.log(`[3] Response: "${response.trim()}"`);

  console.log('─────────────────────────────────────');
  console.log('  ✅ XORAS Ollama: ONLINE & READY');
  console.log('─────────────────────────────────────');
}

main().catch(err => {
  console.error('[FAULT]', err.message);
  process.exit(1);
});
