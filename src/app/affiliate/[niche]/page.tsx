import React from 'react';
import { Shield, Zap, Globe, Target, ArrowRight, CheckCircle, Cpu, TrendingUp, Lock } from 'lucide-react';
import { notFound } from 'next/navigation';

/**
 * ELITE_NICHE_ENGINE (v1.0)
 * Purpose: Dynamic Grounding of high-theta saturation niches.
 * Mandate: Obsidian Glassmorphism. Zero-Friction Scaling.
 */
export default async function DynamicNichePage({ params }: { params: { niche: string } }) {
  const { niche } = params;

  // 1. Niche Registry (Elite 0.01% Series)
  const registry: Record<string, any> = {
    'green-fintech': {
      title: 'FINTECH',
      accent: 'emerald',
      creative: 'green_fintech_wealth_recovery_post_1776824360291.png',
      offers: [
        { name: 'Wealth Recovery Scour', brand: 'LiquidityPro', price: '15% Fee', roi: '100% Reclamation' },
        { name: 'Sovereign Asset Vault', brand: 'EliteReserve', price: '$2,500/mo', roi: 'Absolute Privacy' }
      ]
    },
    'robotic-logistics': {
      title: 'LOGISTICS',
      accent: 'amber',
      creative: 'robotic_logistics_exascale_post_1776824375269.png',
      offers: [
        { name: 'Exascale Freight Sync', brand: 'GlobalFlow', price: '$45,000', roi: 'Zero-Friction Supply' },
        { name: 'Autonomous Port Handler', brand: 'PortSingularity', price: '$1.2M', roi: '80% OpEx Reduction' }
      ]
    },
    'carbon-capture': {
      title: 'CARBON',
      accent: 'blue',
      creative: 'carbon_capture_zero_point_post_1776824388459.png',
      offers: [
        { name: 'Terraform X1 Monolith', brand: 'GaiaRestore', price: '$250,000', roi: 'Institutional ESG' },
        { name: 'Diamond Catalyst Soil', brand: 'CarbonGrounded', price: '$500/bag', roi: 'Rapid Sequestration' }
      ]
    },
    'cognitive-learning': {
      title: 'COGNITIVE',
      accent: 'purple',
      creative: 'elearning_cognitive_luxury_post_1776824402818.png',
      offers: [
        { name: 'High-IQ Immersion', brand: 'MindElite', price: '$15,000', roi: 'Full Mastery 30 Days' },
        { name: 'Knowledge Sphere Ingest', brand: 'OmniScience', price: '$2,500', roi: 'Exascale Intelligence' }
      ]
    },
    'ag-tech': {
      title: 'AG-TECH',
      accent: 'gold',
      creative: 'agtech_grounded_luxury_post_1776824430980.png',
      offers: [
        { name: 'Crystalline Vertical Farm', brand: 'LuxuryGrown', price: '$85,000', roi: '365-Day Harvest' },
        { name: 'Nutrient Singularity Pod', brand: 'BioBloom', price: '$950', roi: 'Super-Food Density' }
      ]
    },
    'bio-digital': {
      title: 'SINGULARITY',
      accent: 'rose',
      creative: 'biodigital_singularity_post_1776824443171.png',
      offers: [
        { name: 'Fiber-Optic Lung Sync', brand: 'BioSync', price: '$45,000', roi: 'Limitless Breath' },
        { name: 'Digital Identity Ingest', brand: 'SoulCloud', price: 'Equity Stake', roi: 'Eternal Presence' }
      ]
    }
  };

  const data = registry[niche];
  if (!data) return notFound();

  return (
    <div className={`min-h-screen bg-[#020205] text-white selection:bg-${data.accent}-500/30 overflow-x-hidden font-['Outfit'] relative`}>
      <div className="fixed inset-0 scanline pointer-events-none opacity-[0.03] z-50 pointer-events-none" />
      
      <main className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        
        {/* Institutional Trace */}
        <div className="flex items-center gap-4 mb-12 opacity-40">
          <div className="mono text-[8px] tracking-widest uppercase">Institutional_Revenue</div>
          <div className="h-[1px] w-8 bg-white/20" />
          <div className="mono text-[8px] tracking-widest uppercase">${data.title}_Elite</div>
        </div>

        {/* Hero Section */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-3xl">
            <h1 className="text-7xl md:text-9xl font-black tracking-tightest mb-8 leading-none">
              ULTRA<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${data.accent}-400 via-white to-${data.accent}-500`}>${data.title}</span>
            </h1>
            <p className="text-2xl text-white/40 max-w-2xl font-light leading-relaxed">
              Identifying the top <span className="text-white">0.01% elite</span> solutions for the institutional mandate.
            </p>
          </div>
          <div className="w-96 aspect-square glass-panel rounded-card overflow-hidden">
             <img src={`/Users/ajoxendine68/.gemini/sovra_sovereign/brain/6cdb7e2e-b989-4e88-a338-6fef2740e595/${data.creative}`} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {data.offers.map((p: any, i: number) => (
            <div key={i} className="glass-panel p-8 rounded-card border-t border-white/5 hover:bg-white/[0.02] transition-all">
              <div className={`mono text-[8px] text-${data.accent}-400 mb-6 uppercase tracking-widest`}>Elite_Asset #{i+1}</div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">{p.name}</h2>
              <div className="text-[10px] text-white/30 uppercase font-black mb-6 tracking-widest">{p.brand}</div>
              
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-40">Entry:</span>
                  <span className="font-bold">{p.price}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="opacity-40">Performance:</span>
                  <span className={`text-${data.accent}-400`}>{p.roi}</span>
                </div>
              </div>

              <button className={`group flex items-center justify-between w-full p-4 bg-white/[0.03] border border-white/5 rounded-institutional hover:bg-${data.accent}-500 hover:text-black transition-all`}>
                <span className="mono text-[10px] font-bold uppercase tracking-widest">Aquire_Asset</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Compliance Footer */}
        <div className="glass-panel p-10 rounded-card flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
          <div className="flex items-center gap-4">
             <div className={`p-3 rounded-xl bg-${data.accent}-500/10 text-${data.accent}-400`}>
               <Shield size={20} />
             </div>
             <div>
               <div className="text-xs font-bold tracking-tight">Institutional Compliance Verified</div>
               <div className="mono text-[8px] opacity-40">Protocol v1.0_SOVRA_SINGULARITY_RECOVERY</div>
             </div>
          </div>
          <div className="flex items-center gap-1.5 mono text-[9px] text-white/30">
            <CheckCircle size={10} className={`text-${data.accent}-400`} /> Grounded in SOVRADB
          </div>
        </div>
      </main>
      
      <div className={`fixed top-0 right-0 w-[800px] h-[800px] bg-${data.accent}-500/[0.03] rounded-full blur-[120px] pointer-events-none`} />
    </div>
  );
}
