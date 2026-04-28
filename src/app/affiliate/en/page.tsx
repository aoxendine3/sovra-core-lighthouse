import SovereignHeader from '@/components/SovereignHeader';

/**
 * Global Sovereign Hub - EN (SOVRA V1.0 - GROUNDED)
 * 100/100 Factual Extraction Center for English-speaking markets.
 */
export default function GlobalHubENPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <SovereignHeader />
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <h1 className="text-[72px] font-black italic tracking-tighter uppercase mb-6 leading-none">
          Global <span className="text-cyan-glow">Extraction</span> Hub
        </h1>
        <p className="text-xl text-white/40 max-w-2xl mx-auto italic mb-32">
          Grounded resource recovery for the North American and Global markets. SOVRA V1.0 protocol.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Institutional Recovery', price: '$2,500', tier: 'guardian' },
            { name: 'Sovereign Saturation', price: '$12,500', tier: 'sentinel' },
            { name: 'SOVRA Master Node', price: '$99,000', tier: 'master' }
          ].map((node, i) => (
            <div key={i} className="glass-panel p-12 rounded-[48px] border border-white/5 bg-white/[0.01] hover:border-cyan-glow transition-all">
              <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.4em] mb-8">{node.name}</h3>
              <div className="text-[56px] font-black italic mb-8">{node.price}</div>
              <a href={`/api/checkout?tier=${node.tier}&lang=en`} className="block w-full py-6 rounded-full bg-cyan-glow text-black font-black uppercase text-[10px] tracking-widest">
                Initialize Extraction
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
