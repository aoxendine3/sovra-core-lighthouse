'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowUpRight, 
  Shield, 
  Zap, 
  Search, 
  ChevronRight, 
  Boxes, 
  Cpu, 
  Crown, 
  Filter, 
  Star 
} from 'lucide-react';

import SOVRAStoreLayout from '@/components/retail/SOVRAStoreLayout';
import { TrustSignals, LivePulse } from '@/components/retail/TrustSignals';
import { HighFidelityBook } from '@/components/retail/HighFidelityBook';

const CATEGORIES = ['All Assets', 'Doctoral Intelligence', 'Cultural Sovereignty', 'Software / SaaS', 'Memberships', 'Courses & Books'];

const GUMROAD_DISCOVERY_ITEMS = [
  { 
    id: '201', 
    name: 'XORAS Ancestral Pulse: Tech-Wear Matrix', 
    seller: 'XORAS Institutional', 
    price: 89.00, 
    type: 'Cultural Sovereignty', 
    rating: 5.0, 
    icon: Star, 
    url: 'https://trendsetter445.gumroad.com/l/wloayv', 
    isSovereign: true, 
    description: 'High-performance tech-wear garments featuring deep cultural geometry fused with modern spectral resistance. Ancestral precision for the modern operator.' 
  },
  { 
    id: '202', 
    name: 'The Obsidian HUD: Tactical Mobile Suite', 
    seller: 'XORAS Institutional', 
    price: 19.00, 
    type: 'Cultural Sovereignty', 
    rating: 5.0, 
    icon: Zap, 
    url: 'https://trendsetter445.gumroad.com/l/exnogw', 
    isSovereign: true, 
    description: 'Complete tactical transformation for your mobile device. Includes obsidian-glass icon packs, custom KLWP HUD interfaces, and XORAS-grade telemetry widgets.' 
  },
  { 
    id: '203', 
    name: 'XORAS Sovereign Desk Node (Digital Plan)', 
    seller: 'XORAS Institutional', 
    price: 29.00, 
    type: 'Cultural Sovereignty', 
    rating: 5.0, 
    icon: Boxes, 
    url: 'https://trendsetter445.gumroad.com/l/ndhdqhu', 
    isSovereign: true, 
    description: 'Architectural blueprints and software for building your own XORAS Institutional Desk Display. Ground your workspace in real-time sovereign telemetry.' 
  },
  { 
    id: '100', 
    name: 'Sovereign Ingress Architecture: The Implementation Matrix', 
    seller: 'XORAS Institutional', 
    price: 0.00, 
    type: 'Courses & Books', 
    rating: 5.0, 
    icon: Crown, 
    url: 'https://trendsetter445.gumroad.com/l/wloayv', 
    isSovereign: true, 
    description: 'The definitive architectural blueprint for establishing autonomous operational sovereignty. This 412-page doctoral treatise covers exascale ingress, 512-bit spectral security, and high-theta revenue orchestration.' 
  },
  { 
    id: '101', 
    name: 'XORAS Neural Handshake: Pro-Grade Implementation Node', 
    seller: 'XORAS Institutional', 
    price: 49.00, 
    type: 'Software / SaaS', 
    rating: 5.0, 
    icon: Cpu, 
    url: 'https://trendsetter445.gumroad.com/l/exnogw', 
    isSovereign: true, 
    description: 'A verifiably grounded implementation kit for senior architects. Includes the full XORAS V15.0 logic gate array and institutional connectivity tranches.' 
  },
  { 
    id: '102', 
    name: 'Institutional Singularity: Exascale Deployment Mandate', 
    seller: 'XORAS Institutional', 
    price: 199.00, 
    type: 'Software / SaaS', 
    rating: 5.0, 
    icon: Shield, 
    url: 'https://trendsetter445.gumroad.com/l/ndhdqhu', 
    isSovereign: true, 
    description: 'The ultimate executive mandate for 100M-node scaling. Unlocks the full XORAS Sovereign Protocol for real-world market dominance and capital acquisition.' 
  },
  { 
    id: '103', 
    name: 'The Sovereign Desire Decoder: Institutional Psychology', 
    seller: 'XORAS Institutional', 
    price: 129.00, 
    type: 'Courses & Books', 
    rating: 5.0, 
    icon: Crown, 
    url: 'https://twostraws.gumroad.com/l/hws-subscription',
    isSovereign: true,
    description: 'A masterclass in algorithmically decoding market desire tranches. Learn to predict and capture capital pulses before they manifest in the generic ledger.'
  },
  { 
    id: '104', 
    name: 'Ghost Executive: 24/7 Operational Autonomy', 
    seller: 'XORAS Institutional', 
    price: 499.00, 
    type: 'Software / SaaS', 
    rating: 5.0, 
    icon: Zap, 
    url: 'https://paycheckportfolio.gumroad.com/l/iescv',
    isSovereign: true,
    description: 'Deploy a dedicated XORAS Ghost Node that maintains your enterprise presence 24/7. Zero-friction scaling with absolute data integrity.'
  }
];

export default function InstitutionalStorefront() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  
  const AFFILIATE_ID = 'trendsetter445'; // SOVRA Production Affiliate ID
  const [activeCategory, setActiveCategory] = useState('All Assets');
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [sovereignItems, setSovereignItems] = useState<any[]>([]);

  useEffect(() => {
    if (urlQuery && searchQuery !== urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map(item => ({
             id: 'sov-' + item.id,
             name: item.name,
             seller: item.seller,
             price: parseFloat(item.price),
             type: item.category,
             rating: 5.0,
             icon: item.category === 'Software / SaaS' ? Cpu : Crown,
             url: item.url,
             isSovereign: true,
             description: item.description
          }));
          setSovereignItems(mapped);
        }
      });
  }, []);

  const allItems = [...sovereignItems, ...GUMROAD_DISCOVERY_ITEMS];

  const filteredItems = allItems.filter(item => {
    const matchesCategory = activeCategory === 'All Assets' || item.type === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <SOVRAStoreLayout>
      <div className="min-h-screen bg-[#020205]">
        <LivePulse />
        
        <header className="pt-48 pb-24 px-10 md:px-20 max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-16"
          >
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-4 bg-[#cd9d3f]/10 border border-[#cd9d3f]/20 px-8 py-3 rounded-full backdrop-blur-xl mb-12">
                 <span className="w-2.5 h-2.5 bg-[#cd9d3f] rounded-full animate-pulse shadow-[0_0_15px_#cd9d3f]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#cd9d3f] italic font-mono">Sovereign Acquisition Network</span>
              </div>
              
              <h1 className="leading-[0.85] mb-12">
                The <span className="gold-gradient italic">Ledger.</span>
              </h1>
              <p className="text-white/40 text-2xl font-medium leading-relaxed border-l-4 border-[#cd9d3f]/30 pl-12 italic uppercase tracking-widest max-w-3xl">
                Algorithmically vetted, institutional-grade assets. verifiably grounded in the sovereign discovery grid.
              </p>
            </div>
            
            <TrustSignals />

            <div className="glass-panel p-10 rounded-[48px] border-white/5 flex flex-wrap gap-12 items-center shadow-3xl overflow-hidden relative group bg-white/[0.02]">
               <div className="absolute inset-0 bg-gradient-to-br from-[#cd9d3f]/5 to-transparent" />
               <div className="relative z-10">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-2 italic font-mono">Total_Inventory</p>
                  <p className="text-4xl font-black text-white tracking-tighter italic">{allItems.length}</p>
               </div>
               <div className="w-px h-12 bg-white/10 relative z-10 hidden md:block" />
               <div className="relative z-10">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-2 italic font-mono">Active_Deployments</p>
                  <p className="text-4xl font-black text-[#cd9d3f] tracking-tighter italic">LIVE</p>
               </div>
               <div className="w-px h-12 bg-white/10 relative z-10 hidden md:block" />
               <div className="relative z-10">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-2 italic font-mono">Handshake_Status</p>
                  <p className="text-4xl font-black text-emerald-400 tracking-tighter italic font-mono">SECURE</p>
               </div>
            </div>
          </motion.div>
        </header>

        <div className="sticky top-40 z-40 px-10 md:px-20 py-8 mb-24 bg-black/80 border-y border-white/5 backdrop-blur-3xl shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 justify-between items-center">
            <div className="flex flex-wrap bg-white/5 p-2 rounded-3xl border border-white/10 w-full xl:w-auto shadow-inner justify-center xl:justify-start gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === category 
                      ? 'bg-[#cd9d3f] text-black shadow-[0_10px_30px_rgba(205,157,63,0.3)] italic scale-105' 
                      : 'text-white/20 hover:text-white/60 hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full xl:w-[400px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cd9d3f]/40" />
              <input 
                type="text" 
                placeholder="Search the Global Ledger..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-[13px] font-black text-white placeholder-white/10 focus:outline-none focus:border-[#cd9d3f]/30 transition-all shadow-inner uppercase tracking-[0.2em] italic font-mono"
              />
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-10 md:px-20 pb-64">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-center py-48 bg-white/5 rounded-[80px] border border-white/5"
              >
                 <Filter className="w-20 h-20 text-white/10 mx-auto mb-10" />
                 <p className="text-[12px] font-black text-white/20 uppercase tracking-[0.8em] italic">No Tranches Found In This Query.</p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
              >
                {filteredItems.map((item, index) => (
                  <motion.a
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    key={item.id}
                    href={item.url.includes('?') ? `${item.url}&affiliate_id=${AFFILIATE_ID}` : `${item.url}?affiliate_id=${AFFILIATE_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col p-10 rounded-[64px] bg-white/[0.01] border border-white/5 hover:border-[#cd9d3f]/40 transition-all duration-700 overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#cd9d3f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-full flex items-center gap-3 shadow-inner">
                         <item.icon className="w-4 h-4 text-[#cd9d3f]" />
                         <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 italic font-mono">
                           {item.type}
                         </span>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#cd9d3f] group-hover:border-[#cd9d3f] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(205,157,63,0.3)]">
                        <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-black" />
                      </div>
                    </div>

                    {/* High-Fidelity Asset Preview */}
                    {item.type === 'Courses & Books' && (
                      <div className="mb-12 py-8 bg-black/20 rounded-[40px] border border-white/5">
                        <HighFidelityBook title={item.name} author={item.seller} />
                      </div>
                    )}

                    <div className="relative z-10 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <p className="text-[#cd9d3f] text-[10px] font-black uppercase tracking-[0.5em] italic font-mono">Institutional_Asset</p>
                        {item.isSovereign && (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 italic">Verified</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight text-white group-hover:text-[#cd9d3f] transition-colors duration-300 mb-6">
                        {item.name}
                      </h3>
                      
                      <p className="text-white/30 text-[10px] font-medium uppercase tracking-widest leading-relaxed line-clamp-3 italic mb-8">
                        {item.description || "A verifiably grounded digital asset optimized for high-theta performance and institutional sovereignty."}
                      </p>

                      <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-4 italic leading-none font-mono">
                        PROVENANCE <span className="w-1 h-1 rounded-full bg-[#cd9d3f]/40" /> {item.seller}
                      </p>
                    </div>

                    <div className="mt-16 pt-10 border-t border-white/5 flex justify-between items-end relative z-10">
                      <div>
                        <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] mb-3 italic font-mono">Acquisition_Fee</p>
                        <p className="text-4xl font-black text-white italic tracking-tighter leading-none">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] mb-3 italic font-mono">Index_Yield</p>
                         <p className="text-xl font-black text-emerald-400 flex items-center gap-3 italic leading-none">
                            <Star className="w-4 h-4 fill-emerald-400" /> 5.0
                         </p>
                      </div>
                    </div>

                    <div className="absolute inset-x-8 bottom-8 translate-y-[180%] group-hover:translate-y-0 transition-all duration-700 z-20">
                       <div className="bg-[#cd9d3f] text-black font-black py-6 px-10 rounded-3xl flex justify-between items-center shadow-[0_20px_50px_rgba(205,157,63,0.3)] uppercase tracking-[0.3em] text-[11px] italic">
                          <span>Initialize Handshake</span>
                          <ChevronRight className="w-5 h-5" />
                       </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <section className="bg-white/[0.01] border-t border-white/5 py-48 px-10 md:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-12">
                <div className="inline-flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-full">
                   <Shield className="w-4 h-4 text-emerald-400" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">Absolute Trust Handshake</span>
                </div>
                <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                  Verifiable <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Origin Protocol.</span>
                </h2>
                <p className="text-white/40 text-xl font-bold uppercase tracking-widest italic leading-relaxed border-l-2 border-emerald-500/30 pl-10">
                  Every asset in the Sovereign Ledger is verifiably extracted from Ground Truth historical sources. We eliminate digital noise through strictly enforced cryptographic provenance audits.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 italic">Verification_Node</p>
                    <p className="text-2xl font-black text-white italic tracking-tighter uppercase">X-71_SOVRA</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 italic">Consensus_Threshold</p>
                    <p className="text-2xl font-black text-white italic tracking-tighter uppercase">0.998_SIG</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[80px] bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-white/10 backdrop-blur-3xl flex items-center justify-center p-16 overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                   <Shield className="w-64 h-64 text-white/10 animate-pulse" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="w-96 h-96 border-2 border-dashed border-emerald-500/20 rounded-full" 
                     />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border-t border-white/5 py-32 px-10 md:px-20 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#cd9d3f]/50 to-transparent" />
          <div className="max-w-7xl mx-auto text-center">
            <h4 className="text-[12px] font-black text-white/20 uppercase tracking-[1em] italic mb-20">Supported Institutional Gateways</h4>
            <div className="flex flex-wrap justify-center items-center gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="text-3xl font-black italic tracking-tighter text-white">BLOOMBERG</div>
               <div className="text-3xl font-black italic tracking-tighter text-white">REUTERS</div>
               <div className="text-3xl font-black italic tracking-tighter text-white">STRIPE</div>
               <div className="text-3xl font-black italic tracking-tighter text-white">VISA</div>
               <div className="text-3xl font-black italic tracking-tighter text-white">CITADEL</div>
            </div>
          </div>
        </section>
      </div>
    </SOVRAStoreLayout>
  );
}
