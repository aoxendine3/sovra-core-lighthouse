
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top ai accessories Gadgets 2026',
  description: 'Curated list of the best and highest converting ai accessories products.',
};

const products = [
  {
    "name": "Pro Smart LED",
    "description": "Wifi-enabled smart lights with voice assistant sync.",
    "price": "$35.99",
    "keywords": "ai-accessories smart lights"
  },
  {
    "name": "Ergo Stand",
    "description": "Premium aluminum stand with cooling vents.",
    "price": "$29.99",
    "keywords": "ai-accessories laptop stand"
  },
  {
    "name": "Ultra Cam 4K",
    "description": "Wide-view 4K camera with AI tracking.",
    "price": "$149.99",
    "keywords": "ai-accessories 4k camera"
  },
  {
    "name": "Wireless Hub",
    "description": "8-in-1 high-speed charging hub.",
    "price": "$49.99",
    "keywords": "ai-accessories wireless hub"
  },
  {
    "name": "Noise-Cancelling Pods",
    "description": "Deep bass and 40H battery life.",
    "price": "$89.99",
    "keywords": "ai-accessories earbuds"
  }
];

export default function aiaccessoriesPage() {
  return (
    <main style={{ background: '#0a0a0f', color: '#fff', minHeight: '100vh', padding: '60px 24px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 16 }}>
          Trending <span style={{ color: '#a78bfa' }}>ai accessories</span> Picks
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 48 }}>
          Hand-selected via Workspace AI Intelligence for maximum ROI.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {products.map((product: any, idx: number) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{product.name}</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#60a5fa' }}>{product.price}</span>
                <a 
                  href={`/api/track?url=${encodeURIComponent(`https://www.amazon.com/s?k=${encodeURIComponent(product.keywords)}&tag=SOVRA_APEXpettech20-20`)}&source=ai-accessories_PAGE`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', color: '#fff', padding: '10px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}
                >
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
