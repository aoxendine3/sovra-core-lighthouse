'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowUpRight, 
  Wallet, 
  PieChart, 
  Activity,
  ChevronRight,
  Globe
} from 'lucide-react';

/**
 * SOVEREIGN ASSET APP (v1.0)
 * ─────────────────────────────────────────────────────────────
 * Reference: Coinbase (Security) + Webull (Metrics) + Robinhood (Simplicity)
 * Mandate: Absolute control over digital and physical capital tranches.
 */
export default function SovereignApp() {
  const [balance, setBalance] = useState(124204502.42);
  const [isLive, setIsLive] = useState(true);

  // Simulated real-time price pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + (Math.random() - 0.48) * 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const assets = [
    { name: 'Sovereign AI (SOVRA)', value: '$84,204,502.12', change: '+12.4%', trend: 'up' },
    { name: 'Bitcoin (BTC)', value: '$32,104.00', change: '-2.1%', trend: 'down' },
    { name: 'Ethereum (ETH)', value: '$2,405.80', change: '+0.5%', trend: 'up' },
    { name: 'SOVRA Security Node', value: '$7,495,000.00', change: '+1.2%', trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-500/30">
      
      {/* Navigation Ingress */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <span className="text-cyan-500 font-black">Ω</span>
             </div>
             <span className="text-xs font-black uppercase tracking-[0.4em] italic">Sovereign App</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Live_Pulse</span>
            </div>
            <Wallet className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Portfolio & Charts */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Main Portfolio Value */}
          <section className="space-y-4">
             <p className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Total Value Locked (TVL)</p>
             <h1 className="text-6xl md:text-8xl font-black tracking-tightest tabular-nums italic">
               ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </h1>
             <div className="flex items-center gap-3 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-black uppercase tracking-widest">+$4,204,502.12 (3.5%) ALL TIME</span>
             </div>
          </section>

          {/* Simulated Portfolio Chart (CSS Only) */}
          <section className="h-64 relative flex items-end gap-1 px-2 group">
             <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent rounded-3xl border border-white/5"></div>
             {[40, 65, 45, 80, 55, 90, 70, 85, 100, 95, 110, 105, 120, 115, 130].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="flex-1 bg-gradient-to-t from-cyan-500/40 to-cyan-400/10 rounded-t-sm"
                />
             ))}
          </section>

          {/* Asset List */}
          <section className="space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Institutional Tranches</h3>
                <span className="text-[10px] font-black uppercase text-cyan-500 cursor-pointer">View All Assets</span>
             </div>
             <div className="space-y-3">
                {assets.map((asset, i) => (
                   <div key={i} className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                            <Zap className="w-5 h-5 text-white/40 group-hover:text-cyan-500" />
                         </div>
                         <div>
                            <p className="text-sm font-black uppercase tracking-widest">{asset.name}</p>
                            <p className="text-[10px] text-white/20 uppercase tracking-tighter">Verified Node Ingress</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-black italic">{asset.value}</p>
                         <p className={`text-[10px] font-black uppercase ${asset.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                           {asset.change}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
          </section>
        </div>

        {/* Right Column: Actions & Global Stats */}
        <div className="lg:col-span-4 space-y-12">
           
           {/* Primary Actions Card */}
           <section className="glass-panel p-8 rounded-[40px] border border-cyan-500/20 bg-cyan-500/5 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 blur-[80px] rounded-full"></div>
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-cyan-500" />
                    <h3 className="text-xs font-black uppercase tracking-widest">Sovereign Vault</h3>
                 </div>
                 <div className="space-y-4">
                    <button className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-cyan-400 transition-all shadow-xl">
                       Initialize Trade
                    </button>
                    <button className="w-full py-5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-white/5 transition-all">
                       Vault Transfer
                    </button>
                 </div>
              </div>
           </section>

           {/* Verification Vault */}
           <section className="space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Verification Vault</h3>
                 <span className="text-[10px] font-black uppercase text-green-500">120/100 Integrity</span>
              </div>
              <div className="p-1 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent">
                 <div className="bg-[#050508] rounded-[31px] p-6 space-y-4">
                    {[
                      { name: "Sovereign_AI_Prompts.json", size: "4.2KB", hash: "9e10...f1" },
                      { name: "Sovereign_Security_Audit.md", size: "2.8KB", hash: "a3b2...c4" }
                    ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3">
                             <ShieldCheck className="w-4 h-4 text-green-500" />
                             <div>
                                <p className="text-[10px] font-black uppercase tracking-widest">{item.name}</p>
                                <p className="text-[8px] text-white/20 uppercase font-mono">{item.hash} // {item.size}</p>
                             </div>
                          </div>
                          <a 
                            href={`https://github.com/sovra-sovereign/sovra-core/blob/main/vault/${item.name}`}
                            target="_blank"
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                             <ArrowUpRight className="w-4 h-4 text-white/40" />
                          </a>
                       </div>
                    ))}
                 </div>
              </div>
              <button 
                onClick={() => window.open('https://github.com/sovra-sovereign/sovra-core/tree/main/vault', '_blank')}
                className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 rounded-xl hover:bg-white/5 transition-all"
              >
                 Open Institutional Archive
              </button>
           </section>

           {/* Market News / Log Pulse */}
           <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Intelligence Pulse</h3>
              <div className="space-y-6">
                 {[
                   { icon: <Globe className="w-4 h-4" />, text: "Global Market Arbitrage Pulse Detected (+4.2%)" },
                   { icon: <Activity className="w-4 h-4" />, text: "SOVRA Security Node Synchronized with Coinbase Prime" },
                   { icon: <Zap className="w-4 h-4" />, text: "High-Theta Ingress initiated for AI DevTools Tranche" }
                 ].map((log, i) => (
                    <div key={i} className="flex gap-4 items-start opacity-40 hover:opacity-100 transition-opacity cursor-default">
                       <div className="mt-1 text-cyan-500">{log.icon}</div>
                       <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">{log.text}</p>
                    </div>
                 ))}
              </div>
           </section>

           {/* App Footer Link */}
           <footer className="pt-12 border-t border-white/5 opacity-20 text-[9px] font-mono uppercase tracking-[0.4em] space-y-2">
              <p>© 2026 Sovereign LLC // App_v1.0</p>
              <p>Institutional Integrity Verified</p>
           </footer>
        </div>

      </main>

      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
