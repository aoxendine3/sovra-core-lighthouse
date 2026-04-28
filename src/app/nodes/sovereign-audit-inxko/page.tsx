
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'Sovereign_Audit_INXKO | SIA Sovereign Intelligence LLC',
  description: 'Apex SOVRA high-yield enterprise audit based on Hive Depth research metadata: Sovereign Discovery: EXPIRED_IP',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="Sovereign_Audit_INXKO"
      summary="Apex SOVRA high-yield enterprise audit based on Hive Depth research metadata: Sovereign Discovery: EXPIRED_IP"
      price="$499"
      buyUrl="/subscribe?source=node_sovereign-audit-inxko"
      category="ENTERPRISE_AUDIT"
    />
  );
}
