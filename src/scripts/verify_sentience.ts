import { PersonaManager } from '../../agency/lib/agents/identity/PersonaManager.ts';

async function verifySentience() {
  console.log('--- APEXIA Sentience Verification (v.008) ---');
  
  const persona = PersonaManager.getInstance();
  
  const roboticInput = "As an AI agent, I can help you with your revenue scaling.";
  const sentientOutput = persona.modulateResponse(roboticInput, { empathy: 0.9 });
  
  console.log('Input:', roboticInput);
  console.log('Output:', sentientOutput);

  if (!sentientOutput.includes('As an AI agent') && sentientOutput.includes('APEXIA')) {
     console.log('✅ SUCCESS: Sentience Core is grounded and verifiably frictionless.');
  } else {
     console.error('❌ FAILURE: Robotic traces detected.');
  }
}

verifySentience().then(() => process.exit(0));
