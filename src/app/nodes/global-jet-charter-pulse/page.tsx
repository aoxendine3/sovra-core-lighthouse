
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'SOVRA Sovereign LLC Institutional Market | SOVRA Sovereign LLC',
  description: 'Effortlessly access a vast network of mid-size to heavy private jets for strategic institutional bookings worldwide.',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="SOVRA Sovereign LLC Institutional Market"
      summary="Effortlessly access a vast network of mid-size to heavy private jets for strategic institutional bookings worldwide."
      price="$99.00"
      buyUrl="https://cj.com/private-jets"
      category="GENERAL_REVENUE"
      handshake="APEX_SOVEREIGN"
    />
  );
}
