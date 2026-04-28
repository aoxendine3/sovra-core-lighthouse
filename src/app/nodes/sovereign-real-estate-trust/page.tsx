
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'SOVRA Sovereign Institutional Fund | SOVRA Sovereign LLC',
  description: 'Unlock superior returns on a cutting-edge, data-driven platform featuring high-yield commercial property tranches and luxury developments from around the world.',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="SOVRA Sovereign Institutional Fund"
      summary="Unlock superior returns on a cutting-edge, data-driven platform featuring high-yield commercial property tranches and luxury developments from around the world."
      price="$99.00"
      buyUrl="https://cj.com/luxury-real-estate"
      category="GENERAL_REVENUE"
      handshake="APEX_SOVEREIGN"
    />
  );
}
