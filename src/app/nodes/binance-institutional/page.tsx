
import { InstitutionalPage } from '@/components/commerce/InstitutionalPage';

export const metadata = {
  title: 'Binance Institutional | SOVRA Sovereign LLC',
  description: 'Unparalleled liquidity and digital asset custody for sovereign wealth funds and institutional invest',
};

export default function NodePage() {
  return (
    <InstitutionalPage 
      name="Binance Institutional"
      summary="Unparalleled liquidity and digital asset custody for sovereign wealth funds and institutional invest"
      price="$99.00"
      buyUrl="https://www.binance.com/en/institutional"
      category="GENERAL_REVENUE"
      handshake="APEX_SOVEREIGN"
    />
  );
}
