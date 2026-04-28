import AdLandingClient from './AdLandingClient';

export async function generateStaticParams() {
  return [{ slug: 'SOVRA_APEX-alpha' }];
}

export default function AdPage() {
  return <AdLandingClient />;
}
