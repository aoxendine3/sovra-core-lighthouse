import SovereignHeader from '@/components/SovereignHeader';

/**
 * Real Estate Arbitrage 2026 (SOVRA V1.0 - GROUNDED)
 * Factual Sales Page for High-Ticket Property Extraction.
 */
export default function RealEstateArbitragePage() {
  const products = [
    {
      id: 'CJ-RE-001',
      name: 'PropTech Insight: Institutional Data-Set',
      category: 'DATA_EXTRACT',
      commissionTier: 'HIGH_TICKET',
      action: 'https://www.proptechinsight.com/enterprise'
    },
    {
      id: 'CJ-RE-002',
      name: 'EquityLock: Tokenized Asset Monitor',
      category: 'FINANCIAL_IP',
      commissionTier: 'ENTERPRISE',
      action: 'https://equitylock.io/pro'
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white p-8">
      <SovereignHeader />
      
      <div className="max-w-7xl mx-auto mt-20">
        <div className="mb-20 text-center">
          <h1 className="text-[64px] font-black italic tracking-tighter uppercase mb-6 leading-none">
            Real Estate <span className="text-purple-500">Arbitrage</span> 2026
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto italic">
            Factual resource extraction from the global property grid. Recovering value-debt in tokenized equity markets.
          </p>
        </div>

        {/* FACTUAL PRICING NODE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="glass-panel p-12 rounded-[48px] border border-white/5 bg-white/[0.01]">
            <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.4em] mb-8">Asset Recovery Pulse</h3>
            <div className="text-[56px] font-black italic mb-8">$2,500<span className="text-sm font-normal text-white/20 not-italic">/node</span></div>
            <ul className="space-y-4 mb-12 text-sm text-white/40">
              <li>• Grounded Property Scour</li>
              <li>• Tokenized Equity Audit</li>
              <li>• Registry Leak Identification</li>
            </ul>
            <button className="w-full py-6 rounded-full bg-purple-500 text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
              Initialize Extraction
            </button>
          </div>

          <div className="glass-panel p-12 rounded-[48px] border border-purple-500/50 bg-purple-500/[0.02] relative shadow-[0_0_80px_rgba(168,85,247,0.05)]">
            <h3 className="text-xs font-black text-purple-500 uppercase tracking-[0.4em] mb-8">Global Saturation</h3>
            <div className="text-[56px] font-black italic mb-8">$12,500<span className="text-sm font-normal text-white/20 not-italic">/pulse</span></div>
            <ul className="space-y-4 mb-12 text-sm text-white/60">
              <li>• Market Arbitrage Automation</li>
              <li>• Perpetual Property Scour (24/7)</li>
              <li>• Elite 100 Agent Deployment</li>
            </ul>
            <button className="w-full py-6 rounded-full bg-purple-500 shadow-[0_0_30px_#a855f7] text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
              Ignite Saturation
            </button>
          </div>
        </div>

        {/* CJ GROUNDED PRODUCTS */}
        <div className="mb-32">
          <h2 className="text-[11px] font-black text-white/20 uppercase tracking-[0.6em] italic mb-12">Grounded Property Nodes (CJ Verified)</h2>
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-8 glass-panel border border-white/5 bg-white/[0.01] rounded-3xl hover:border-purple-500 transition-all">
                <div>
                  <h4 className="font-black italic text-lg">{p.name}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{p.category} // {p.commissionTier}</p>
                </div>
                <a href={p.action} target="_blank" className="px-10 py-4 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">
                  Claim Provision
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
