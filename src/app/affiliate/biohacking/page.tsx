import React from 'react';
import { Shield, Zap, Globe, Target, ArrowRight, CheckCircle } from 'lucide-react';

/**
 * NICHE_SATURATION_PAGE: BIOHACKING (Elite Series)
 * Purpose: High-Theta Affiliate Conversion.
 * Mandate: Obsidian Glassmorphism. Verifiably Compliant (v1.0_SOVRA).
 */
export default function BiohackingPage() {
  const products = [
    {
      name: "Sovereign DNA Optimization",
      brand: "LifeSingularity",
      price: "$4,500",
      roi: "Cognitive Peak / Biological Immortality Pulse",
      trackingId: "bio_dna_sovra_777"
    },
    {
      name: "Neural-Link Bridge v1.0",
      brand: "CortexPrime",
      price: "$12,000",
      roi: "10x IQ Pulse / Instant Knowledge Ingest",
      trackingId: "neural_bridge_sovra_888"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-magenta-500/30 overflow-x-hidden font-['Outfit'] relative">
      {/* Cinematic Ingress Scanline */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
        <div className="h-full w-full scanline" />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        
        {/* Breadcrumb / Institutional Trace */}
        <div className="flex items-center gap-4 mb-12 opacity-40">
          <div className="mono text-[8px] tracking-widest uppercase">Institutional_Revenue</div>
          <div className="h-[1px] w-8 bg-white/20" />
          <div className="mono text-[8px] tracking-widest uppercase">Biohacking_Elite</div>
        </div>

        {/* Hero Section */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-3xl">
            <h1 className="text-7xl md:text-9xl font-black tracking-tightest mb-8 leading-none">
              ULTRA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 via-white to-magenta-500">BIOLOGY</span>
            </h1>
            <p className="text-2xl text-white/40 max-w-2xl font-light leading-relaxed">
              The Sovereign Intelligence Agency has identified the top <span className="text-white">0.01% elite</span> bio-digital extensions for institutional cognitive scaling.
            </p>
          </div>
          <div className="w-96 aspect-square glass-panel rounded-card overflow-hidden">
             <img src="/Users/ajoxendine68/.gemini/sovra_sovereign/brain/6cdb7e2e-b989-4e88-a338-6fef2740e595/biohacking_singularity_elite_post_1776824347643.png" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {products.map((p, i) => (
            <div key={i} className="glass-panel p-8 rounded-card border-t border-white/5 hover:bg-white/[0.02] transition-all">
              <div className="mono text-[8px] text-magenta-400 mb-6 uppercase tracking-widest">Grounded_Asset #{i+1}</div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">{p.name}</h2>
              <div className="text-[10px] text-white/30 uppercase font-black mb-6 tracking-widest">{p.brand}</div>
              <p className="text-sm text-white/50 mb-8 leading-relaxed">
                Reconstruct your baseline reality with institutional-grade bio-extensions.
              </p>
              
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-40">Entry:</span>
                  <span className="font-bold">{p.price}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-40">Performance:</span>
                  <span className="text-magenta-400">{p.roi}</span>
                </div>
              </div>

              <a 
                href={`/api/track?id=${p.trackingId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full p-4 bg-white/[0.03] border border-white/5 rounded-institutional hover:bg-magenta-500 hover:text-black transition-all"
              >
                <span className="mono text-[10px] font-bold uppercase tracking-widest">Aquire_Asset</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Compliance Footer */}
        <div className="glass-panel p-10 rounded-card flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-xl bg-magenta-500/10 text-magenta-400">
               <Shield size={20} />
             </div>
             <div>
               <div className="text-xs font-bold tracking-tight">Institutional Compliance Verified</div>
               <div className="mono text-[8px] opacity-40">Protocol v1.0_SOVRA_SINGULARITY</div>
             </div>
          </div>
          <div className="flex items-center gap-1.5 mono text-[9px] text-white/30">
            <CheckCircle size={10} className="text-magenta-400" /> Grounded in SOVRADB
          </div>
        </div>
      </main>

      {/* Aesthetic Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-magenta-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
