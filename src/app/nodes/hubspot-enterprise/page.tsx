
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'HubSpot Enterprise | SOVRA Sovereign LLC',
  description: 'Elevate global enterprise operations with unified CRM and marketing automation that drives scalable ROI.',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="HubSpot Enterprise"
      summary="Elevate global enterprise operations with unified CRM and marketing automation that drives scalable ROI."
      price="$99.00"
      buyUrl="https://www.hubspot.com/products/marketing/enterprise"
      category="GENERAL_REVENUE"
      handshake="APEX_SOVEREIGN"
    />
  );
}
