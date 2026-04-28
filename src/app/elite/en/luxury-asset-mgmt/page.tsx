

import { Activity, ShieldCheck, Zap } from 'lucide-react';
import { SOVRAAcquisitionButton } from '@/components/commerce/SOVRAAcquisitionButton';

export default function ElitePage() {

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans p-8 md:p-32 overflow-hidden relative">
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-900/5 blur-[120px] rounded-full" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-24 space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500 italic">Institutional Hub: Global / NYC</span>
          </div>
          <h1 className="text-8xl font-black tracking-tighter italic uppercase leading-none">
            luxury asset mgmt <br/>
            <span className="text-white/20">TRADED_V8.4</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[{"name":"Privé Vault","description":"Discreet, personalized wealth management for high-net-worth individuals and family offices seeking unparalleled expertise and customized solutions.","price":"$250,000 (annual retainer)","keywords":"luxury asset management, family office services, bespoke wealth planning"},{"name":"Rare Earth Fund","description":"A unique investment opportunity for the ultra-wealthy, featuring a curated portfolio of rare earth minerals and strategic investments in sustainable energy solutions.","price":"$500,000 (initial investment)","keywords":"private equity, sustainable investing, rare earth metals"},{"name":"Titanium Trust","description":"A bespoke trust administration service for high-net-worth individuals and family offices, offering complete confidentiality, tailored tax planning, and expert fiduciary services.","price":"$200,000 (annual trust administration fee)","keywords":"private trusts, estate planning, fiduciary services"}].map((p: any, i: number) => (
            <div key={i} className="glass-panel p-12 hover:border-yellow-500/30 transition-all duration-700">
               <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-10 italic">Asset_LUXURY-ASSET-MGMT</div>
               <h3 className="text-3xl font-black italic mb-6 leading-tight">{p.name}</h3>
               <p className="text-white/40 text-sm leading-relaxed mb-12 italic">{p.description}</p>
               <div className="flex justify-between items-center pt-8 border-t border-white/5">
                  <span className="text-3xl font-black italic text-yellow-500">{p.price}</span>
                  <SOVRAAcquisitionButton 
                   keywords={p.keywords}
                   category="AFFILIATE_REVENUE"
                   source="APEX_NODE"
                   label="DEPLOY ASSET"
                 />
               </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
