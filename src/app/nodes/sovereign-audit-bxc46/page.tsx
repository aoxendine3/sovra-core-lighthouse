
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'Sovereign_Audit_BXC46 | SIA Sovereign Intelligence LLC',
  description: 'Apex SOVRA high-yield enterprise audit based on Hive Depth research metadata: Global Blitz: Scoured grid to depth 200000. Captured 3151 viable nodes.',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="Sovereign_Audit_BXC46"
      summary="Apex SOVRA high-yield enterprise audit based on Hive Depth research metadata: Global Blitz: Scoured grid to depth 200000. Captured 3151 viable nodes."
      price="$499"
      buyUrl="/subscribe?source=node_sovereign-audit-bxc46"
      category="ENTERPRISE_AUDIT"
    />
  );
}
