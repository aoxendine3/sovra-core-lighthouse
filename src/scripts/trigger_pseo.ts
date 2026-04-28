import { CoreKernel } from '../../agency/lib/jarvis/kernel';

async function triggerPSEO() {
  console.log('--- MANUALLY TRIGGERING PSEO EXPANSION CYCLE ---');
  const kernel = new CoreKernel();
  await kernel.executePSEOExpansion();
  console.log('--- CYCLE COMPLETE ---');
}

triggerPSEO().catch(err => {
  console.error('PSEO Trigger Failed:', err);
  process.exit(1);
});
