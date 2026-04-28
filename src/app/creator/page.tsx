'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViralManeuver } from '@/lib/types/SocialTypes';
import { generateHandshake } from '@/lib/auth/HandshakeClient';
import MaxxCreoChat from '@/components/dashboard/MaxxCreoChat';

interface CreatorDeal {
  merchant: string;
  product: string;
  commission: number;
  category: string;
  affiliateUrl: string;
}

/**
 * APEX_CREATOR_STUDIO (v30.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * MISSION: VIRAL_ASSET_PRODUCTION
 * Design: GLASS_APEX_ELITE
 */
export default function CreatorStudio() {
  const [hooks, setHooks] = useState<ViralManeuver[]>([]);
  const [deals, setDeals] = useState<CreatorDeal[]>([]);
  const [sentiment, setSentiment] = useState(0.85);
  const [stats, setStats] = useState({ totalEarnings: 0, activeNodes: 0, consensus: '0%' });
  const [loading, setLoading] = useState(true);
  const [generatingAd, setGeneratingAd] = useState<string | null>(null);
  const [generatedAds, setGeneratedAds] = useState<Record<string, any>>({});
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const lock = await generateHandshake();
        const res = await fetch('/api/creator', {
          headers: { 'X-SOVRA-DEEP-LOCK': lock }
        });
        if (res.ok) {
          const data = await res.json();
          setHooks(data.hooks || []);
          setDeals(data.deals || []);
          setSentiment(data.marketSentiment || 0.94);
          if (data.liveStats) setStats(data.liveStats);
        }
      } catch (err) {
        console.error('[CreatorStudio] Load Failure:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateAdSet = async (hookObj: ViralManeuver) => {
    setGeneratingAd(hookObj.hook);
    try {
      const lock = await generateHandshake();
      const res = await fetch('/api/creative/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-SOVRA-DEEP-LOCK': lock 
        },
        body: JSON.stringify({ hook: hookObj })
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedAds(prev => ({ ...prev, [hookObj.hook]: data }));
      }
    } catch (err) {
      console.error('[Creative_Gen] Failure:', err);
    } finally {
      setGeneratingAd(null);
    }
  };

  const handleWithdraw = async () => {
    if (stats.totalEarnings <= 0) return;
    setIsWithdrawing(true);
    try {
      const lock = await generateHandshake();
      await fetch('/api/executive/withdraw', {
        method: 'POST',
        headers: { 'X-SOVRA-DEEP-LOCK': lock, 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: stats.totalEarnings, currency: 'USD' })
      });
      alert('Withdrawal Protocol Initiated. Verification Pulse Sent to Sovereign Ledger.');
    } catch (e) {
      console.error('[Withdrawal] Fault:', e);
    } finally {
      setIsWithdrawing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 p-4 md:p-12 overflow-x-hidden relative">
      
      {/* Dynamic SOVRA Aura */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 blur-[120px] bg-[radial-gradient(circle_at_top_right,_rgba(0,240,255,0.2),_transparent_50%),_radial-gradient(circle_at_bottom_left,_rgba(139,92,246,0.1),_transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Creator Header: Institutional SOVRA */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-16">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
               <div className="w-12 h-12 bg-gradient-to-br from-cyan-glow/20 to-purple-600/10 rounded-2xl border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-cyan-glow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                  </svg>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-glow font-mono">Nano_Banana_2.0</span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Institutional Creator Suite</span>
               </div>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tightest leading-none">
              Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-glow/80 to-purple-400">Yield.</span>
            </h1>
            <p className="text-white/40 font-medium text-base max-w-xl italic leading-relaxed">
              Autonomous 0.01% viral engineering for the SOVRA-X elite creator network. Verifiably grounded in the Sovereign Ledger.
            </p>
          </div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/5 backdrop-blur-3xl p-8 rounded-[40px] border border-white/10 flex gap-10 items-center shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-right relative z-10">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mb-2">Sovereign_Liquidity</p>
              <p className="text-4xl font-black text-white tracking-tightest italic">${stats.totalEarnings.toLocaleString()}</p>
            </div>
            <button 
              onClick={handleWithdraw}
              disabled={isWithdrawing || stats.totalEarnings <= 0}
              className="px-10 py-5 bg-cyan-glow text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all active:scale-95 shadow-[0_10px_40px_rgba(0,240,255,0.2)] disabled:opacity-30 disabled:grayscale"
            >
              {isWithdrawing ? 'PROCESSING...' : 'WITHDRAW'}
            </button>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-20 h-20 border-2 border-cyan-glow/10 border-t-cyan-glow rounded-full animate-spin"></div>
            <p className="mt-8 text-cyan-glow/40 font-mono text-[10px] uppercase tracking-[0.8em] animate-pulse">Synchronizing_Oracle_Pulse</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
            
            {/* Main Viral Feed: The Production Line */}
            <div className="xl:col-span-8 space-y-16">
              
              <section className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black italic tracking-tighter flex items-center gap-4">
                    <span className="w-1.5 h-8 bg-cyan-glow rounded-full shadow-[0_0_15px_#00f0ff]"></span>
                    Neural Hook Architect
                  </h2>
                  <div className="hidden md:flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl">
                    <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping"></span>
                    <span className="text-[10px] font-black text-white/40 tracking-[0.3em] font-mono uppercase">V30.0_APEX_INTENSITY</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence>
                    {hooks.map((hook, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 backdrop-blur-2xl p-10 rounded-[48px] border border-white/5 hover:border-cyan-glow/30 transition-all duration-700 group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-8">
                          <span className="px-4 py-1.5 bg-black/40 border border-white/10 rounded-xl text-[10px] font-black uppercase text-white/40 tracking-widest group-hover:text-cyan-glow transition-colors">{hook.platform}</span>
                          <div className="text-[10px] font-black text-cyan-glow/80 uppercase tracking-widest">{hook.viralProbability}% VIRAL_INDEX</div>
                        </div>
                        <p className="text-2xl font-black leading-tight text-white/90 group-hover:text-white transition-colors">&quot;{hook.hook}&quot;</p>
                        
                        {generatedAds[hook.hook] ? (
                          <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                             <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-3xl">
                                <img src={generatedAds[hook.hook].imageUrl} alt="Ad Creative" className="w-full aspect-square object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                   <p className="text-[10px] font-black uppercase text-cyan-glow tracking-[0.4em] mb-2">APEX_X_CREATIVE</p>
                                   <p className="text-sm font-bold text-white/90 leading-relaxed italic line-clamp-3">&quot;{generatedAds[hook.hook].copy}&quot;</p>
                                </div>
                             </div>
                             <button 
                               onClick={() => window.open(`/ads/${generatedAds[hook.hook].adId}`, '_blank')}
                               className="w-full py-6 bg-gradient-to-r from-cyan-glow to-purple-600 text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-[24px] hover:shadow-[0_20px_40px_rgba(0,240,255,0.3)] transition-all active:scale-95"
                             >
                                Deploy To Apex Network
                             </button>
                          </div>
                        ) : (
                          <div className="mt-12 flex flex-col gap-4">
                            <button 
                              onClick={() => {
                                copyToClipboard(hook.hook);
                                alert('Signal Copied.');
                              }}
                              className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl transition-all"
                            >
                              Copy Neural Script
                            </button>
                            <button 
                              onClick={() => generateAdSet(hook)}
                              disabled={generatingAd === hook.hook}
                              className={`w-full py-5 bg-cyan-glow/10 hover:bg-cyan-glow/20 border border-cyan-glow/30 text-cyan-glow font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl transition-all ${generatingAd === hook.hook ? 'opacity-50 cursor-wait' : ''}`}
                            >
                              {generatingAd === hook.hook ? 'Synthesizing Asset...' : 'Engineering Ad Set'}
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              {/* Affiliate Bridge: The Yield Engine */}
              <section className="space-y-8 pb-20">
                <h2 className="text-2xl font-black italic tracking-tighter flex items-center gap-4">
                  <span className="w-1.5 h-8 bg-purple-400 rounded-full shadow-[0_0_15px_#c084fc]"></span>
                  Affiliate Rapid Bridge
                </h2>
                <div className="space-y-4">
                  {deals.map((deal, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="bg-white/5 backdrop-blur-3xl p-8 rounded-[32px] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center font-black text-white/10 uppercase text-xs tracking-tighter group-hover:text-cyan-glow/20 transition-colors uppercase">{deal.merchant}</div>
                        <div>
                          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mb-1">{deal.category}</p>
                          <h4 className="text-2xl font-black italic tracking-tight">{deal.product}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-10 w-full md:w-auto">
                        <div className="text-right flex-1 md:flex-none">
                          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] mb-1">Commission_Index</p>
                          <p className="text-3xl font-black text-purple-400 tracking-tighter">${deal.commission}</p>
                        </div>
                        <button 
                          onClick={() => window.open(deal.affiliateUrl, '_blank')}
                          className="px-12 py-5 bg-purple-400 text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all active:scale-95 shadow-[0_10px_30px_rgba(192,132,252,0.2)]"
                        >
                          Bridge Deal
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
             </div>

             {/* ─── MAXX — Creo Intelligence ─── */}
             <div className="xl:col-span-4 space-y-12 sticky top-4">
               
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <span className="w-1.5 h-8 bg-cyan-glow rounded-full shadow-[0_0_15px_#00f0ff]" />
                    <h3 className="text-xs font-black uppercase tracking-[0.5em] text-cyan-glow">Maxx_Creo_Intelligence</h3>
                 </div>
                 <div className="rounded-[48px] overflow-hidden border border-white/5 shadow-2xl">
                    <MaxxCreoChat />
                 </div>
               </div>

               <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[48px] border border-white/5 space-y-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6">
                     <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">Market_Sentinel_v3.1</span>
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/40">Network Performance</h3>
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <p className="text-[11px] font-black italic text-white/40 tracking-widest uppercase">Nodes_Saturated</p>
                           <p className="text-[11px] font-mono text-cyan-glow font-black">{stats.activeNodes} / 5,000</p>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((stats.activeNodes / 5000) * 100, 100)}%` }}
                              transition={{ duration: 2, ease: "easeOut" }}
                              className="h-full bg-cyan-glow shadow-[0_0_20px_#00f0ff]"
                           ></motion.div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <p className="text-[11px] font-black italic text-white/40 tracking-widest uppercase">Council_Consensus</p>
                           <p className="text-[11px] font-mono text-purple-400 font-black">{stats.consensus}</p>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: stats.consensus }}
                              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                              className="h-full bg-purple-400 shadow-[0_0_20px_#c084fc]"
                           ></motion.div>
                        </div>
                     </div>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                     <p className="text-[10px] font-mono text-white/10 leading-relaxed uppercase tracking-[0.2em]">
                        Warning: High-theta traffic detected. Ensure audit handshakes are verifiably grounded before scaling node saturation.
                     </p>
                  </div>
               </div>
             </div>

          </div>
        )}

        <footer className="pt-32 pb-16 border-t border-white/5 flex justify-between items-center text-[11px] font-mono text-white/10 uppercase tracking-[0.4em]">
          <p>&copy; 2026 APEX SOVEREIGN LLC // NANO BANANA 2.0</p>
          <div className="hidden md:flex gap-12">
            <span className="text-cyan-glow/40">SECURE_CREATOR_PULSE_01</span>
            <span>VERIFIED_INTEGRITY: 100/100</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
