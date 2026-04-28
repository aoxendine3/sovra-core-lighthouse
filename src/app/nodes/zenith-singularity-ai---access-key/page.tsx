
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'SOVRA Singularity AI - Access Key | SIA Sovereign Intelligence LLC',
  description: 'Full institutional access to the Sovereign Hive v22.0. Quantum-resistant fulfillment.',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="SOVRA Singularity AI - Access Key"
      summary="Full institutional access to the Sovereign Hive v22.0. Quantum-resistant fulfillment."
      price="$999"
      buyUrl="/subscribe?source=node_apex-singularity-ai---access-key"
      category="AI_SOFTWARE"
    />
  );
}
