import { AICore } from '../agency/lib/ai/Ollama';

async function testOllama() {
  console.log('--- STARTING APEX AI CORE TEST ---');
  try {
    const models = await AICore.listModels();
    console.log(`[AICore] Verifiably reachable. Models found: ${models.length}`);
    
    if (models.length > 0) {
      console.log(`[AICore] Executing inference with llama3.2...`);
      const response = await AICore.generate('Confirm operational status of APEX Sovereign LLC.');
      console.log('[AICore] Response:', response);
    } else {
      console.log('[AICore] FAILED: No models found.');
    }
  } catch (err) {
    console.error('[AICore] Error:', err);
  }
  console.log('--- TEST COMPLETE ---');
}

testOllama().catch(console.error);
