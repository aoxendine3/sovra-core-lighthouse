import { Metadata } from 'next';

const targets = [
  { competitor: "Salesforce", slug: "salesforce-vs-SOVRA_APEX-logic", target: "SOVRA Logic" },
  { competitor: "HubSpot", slug: "hubspot-vs-SOVRA_APEX-autonomous", target: "SOVRA Autonomous" },
  { competitor: "Cloudflare", slug: "cloudflare-vs-aegis-shield", target: "Aegis Shield" },
  { competitor: "Shopify", slug: "shopify-vs-sovereign-storefront", target: "Sovereign Storefront" },
  { competitor: "ActiveCampaign", slug: "activecampaign-vs-growth-agent", target: "GrowthAgent" }
];

export async function generateStaticParams() {
  return targets.map((target) => ({
    slug: target.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const target = targets.find(t => t.slug === slug);
  if (!target) return { title: 'Unknown Comparison' };
  
  return {
    title: `${target.competitor} vs ${target.target} | SOVRA Sovereign Elite`,
    description: `Independent comparison of ${target.competitor} infrastructure versus the autonomous ${target.target} sovereign protocol.`
  };
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
