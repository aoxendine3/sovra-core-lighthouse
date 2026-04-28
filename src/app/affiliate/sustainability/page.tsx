import React from 'react';
import { Shield, Zap, Globe, Target, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

/**
 * NICHE_SATURATION_PAGE: SUSTAINABILITY (Elite Series)
 * Purpose: High-Theta Affiliate Conversion.
 * Mandate: Obsidian Glassmorphism. Verifiably Compliant (v1.0_SOVRA).
 */
export default function SustainabilityPage() {
  const products = [
    {
      name: "SolarFlow Elite X1",
      brand: "EcoSingularity",
      desc: "Modular 1.2kW solar array with integrated storage. Institutional grade efficiency.",
      price: "$1,299",
      roi: "34% Year-over-Year",
      trackingId: "eco_x1_sovra_777"
    },
    {
      name: "AquaRestore Pro",
      brand: "SOVRAWater",
      desc: "High-density atmospheric water generation. Pure hydration from noise.",
      price: "$850",
      roi: "Zero-Waste Certified",
      trackingId: "water_pro_sovra_888"
    },
    {
      name: "CarbonLock Terra",
      brand: "BioGrounded",
      desc: "Home-scale carbon sequestration soil catalyst. Grounding your footprint.",
      price: "$299",
      roi: "Institutional ESG Verified",
      trackingId: "carbon_terra_sovra_999"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden font-['Outfit']">
      {/* Cinematic Ingress Scanline */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
        <div className="h-full w-full scanline" />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        
        {/* Breadcrumb / Institutional Trace */}
        <div className="flex items-center gap-4 mb-12 opacity-40">
          <div className="mono text-[8px] tracking-widest uppercase">Institutional_Revenue</div>
          <div className="h-[1px] w-8 bg-white/20" />
          <div className="mono text-[8px] tracking-widest uppercase">Niche_Saturation_Elite</div>
        </div>

        {/* Hero Section */}
        <div className="mb-24">
          <h1 className="text-7xl md:text-9xl font-black tracking-tightest mb-8 leading-none">
            ULTRA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-500">SUSTAIN</span>
          </h1>
          <p className="text-2xl text-white/40 max-w-2xl font-light leading-relaxed">
            The Sovereign Intelligence Agency has identified the top <span className="text-white">0.01% elite</span> sustainability solutions for institutional-grade resource independence.
          </p>
        </div>

        {/* Product Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {products.map((p, i) => (
            <div key={i} className="glass-panel p-8 rounded-card border-t border-white/5 hover:bg-white/[0.02] transition-all">
              <div className="mono text-[8px] text-cyan-400 mb-6 uppercase tracking-widest">Grounded_Asset #{i+1}</div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">{p.name}</h2>
              <div className="text-[10px] text-white/30 uppercase font-black mb-6 tracking-widest">{p.brand}</div>
              <p className="text-sm text-white/50 mb-8 leading-relaxed">
                {p.desc}
              </p>
              
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-40">Entry:</span>
                  <span className="font-bold">{p.price}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-40">Performance:</span>
                  <span className="text-green-400">{p.roi}</span>
                </div>
              </div>

              <a 
                href={`/api/track?id=${p.trackingId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full p-4 bg-white/[0.03] border border-white/5 rounded-institutional hover:bg-cyan-500 hover:text-black transition-all"
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
             <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
               <Shield size={20} />
             </div>
             <div>
               <div className="text-xs font-bold tracking-tight">Institutional Compliance Verified</div>
               <div className="mono text-[8px] opacity-40">Protocol v1.0_SOVRA_SINGULARITY</div>
             </div>
          </div>
          <div className="flex items-center gap-1.5 mono text-[9px] text-white/30">
            <CheckCircle size={10} className="text-cyan-400" /> Grounded in SOVRADB
          </div>
        </div>
      </main>

      {/* Aesthetic Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
