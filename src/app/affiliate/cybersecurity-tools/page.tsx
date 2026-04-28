import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top cybersecurity tools 2026',
  description: 'Exclusive deals and access for the best cybersecurity tools solutions.',
};

export default function CybersecurityToolsPage() {
  return (
    <main style={{ background: '#0a0a0f', color: '#fff', minHeight: '100vh', padding: '60px 24px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>
          The Best in <span style={{ color: '#00f0ff', textTransform: 'capitalize' }}>cybersecurity tools</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 20, marginBottom: 48, maxWidth: 600 }}>
          Autonomous routing selected the deepest affiliate discounts for this sector. Deploy these tools directly to scale your infrastructure.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 32 }}>
          <div style={{ background: 'rgba(0, 240, 255, 0.05)', borderRadius: 24, padding: 40, border: '1px solid rgba(0, 240, 255, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: '#00f0ff', filter: 'blur(100px)', opacity: 0.2, pointerEvents: 'none' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
              <div style={{ zIndex: 10 }}>
                <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, textTransform: 'capitalize' }}>cybersecurity tools Master Suite</h2>
                <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 24, maxWidth: 500, lineHeight: 1.6 }}>
                  Direct access to the required architecture. Leverage these platforms to stay ahead of the global trend.
                </p>
              </div>

              <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(0,0,0,0.4)', padding: 32, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 14, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Secure Access</span>
                <span style={{ fontSize: 36, fontWeight: 900, marginBottom: 24 }}>Unlock Deal</span>
                <a 
                  href={`/api/track?url=https%3A%2F%2Fwww.amazon.com%2Fs%3Fk%3D${encodeURIComponent('cybersecurity tools')}%26tag%3DSOVRA_APEXpettech20-20&source=cybersecurity-tools_PAGE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#00f0ff', color: '#000', padding: '16px 32px', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 18, width: '100%', textAlign: 'center', transition: 'all 0.2s', boxShadow: '0 0 20px rgba(0,240,255,0.3)' }}
                >
                  Apply Affiliate Override
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}