
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'SOVRA Sovereign LLC Aegis Edge Shield | SOVRA Sovereign LLC',
  description: 'Elevate your institution's security posture with our cutting-edge, pre-cognitive DDoS protection and handshake-secured API gateways tailored for the world's top market leaders.',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="SOVRA Sovereign LLC Aegis Edge Shield"
      summary="Elevate your institution's security posture with our cutting-edge, pre-cognitive DDoS protection and handshake-secured API gateways tailored for the world's top market leaders."
      price="$99.00"
      buyUrl="https://apex-sovereign.com/enterprise/aegis"
      category="GENERAL_REVENUE"
      handshake="APEX_SOVEREIGN"
    />
  );
}
