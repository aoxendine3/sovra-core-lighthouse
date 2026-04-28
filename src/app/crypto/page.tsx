'use client';
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

interface CryptoSignal {
  symbol: string;
  asset: string;
  price: number;
  change24h: number;
  signalType: string;
  reasoning: string;
  aiConfidence: number;
  platform: string;
}

export default function TreasuryNode() {
  const [signals, setSignals] = useState<CryptoSignal[]>([]);
  const [primeAsset, setPrimeAsset] = useState<CryptoSignal | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState('');
  const [jitterPrices, setJitterPrices] = useState<Record<string, number>>({});
  const [vault, setVault] = useState({ balance: 0, valuation: 0, liquidReserve: 0 });

  const fetchSignals = async () => {
    try {
      const handshake = await generateHandshake();
      const res = await fetch('/api/crypto/maneuver', { 
        method: 'POST',
        headers: { 'X-SOVRA-DEEP-LOCK': handshake }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.signals) {
          const SOVRA_APEX = data.signals.find((s: CryptoSignal) => s.symbol.toLowerCase() === 'SOVRA_APEX');
          setPrimeAsset(SOVRA_APEX || data.signals[0]);
          setSignals(data.signals.filter((s: CryptoSignal) => s.symbol.toLowerCase() !== 'SOVRA_APEX'));
          setLastSync(new Date().toLocaleTimeString());
          
          if (data.vault) setVault(data.vault);

          const baselines: Record<string, number> = {};
          data.signals.forEach((s: CryptoSignal) => {
            baselines[s.symbol] = s.price;
          });
          setJitterPrices(baselines);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const executeManeuver = async (symbol: string, type: string) => {
    try {
      const handshake = await generateHandshake();
      const res = await fetch('/api/crypto/maneuver', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-SOVRA-DEEP-LOCK': handshake 
        },
        body: JSON.stringify({ symbol, type })
      });
      if (res.ok) {
        console.log(`[Terminal] MANEUVER_SYNC: ${type} executed for ${symbol}.`);
        fetchSignals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSovereignSync = async () => {
     try {
       const handshake = await generateHandshake();
       await fetch('/api/metrics', { headers: { 'X-SOVRA-DEEP-LOCK': handshake }});
       fetchSignals();
     } catch (err) {
       console.error(err);
     }
  };

  useEffect(() => {
    fetchSignals();
    const syncInterval = setInterval(fetchSignals, 15000);
    
    const jitterInterval = setInterval(() => {
      setJitterPrices(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(symbol => {
          const multiplier = 1 + (Math.random() * 0.0001 - 0.00005);
          next[symbol] = next[symbol] * multiplier;
        });
        return next;
      });
    }, 100);

    return () => {
      clearInterval(syncInterval);
      clearInterval(jitterInterval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-obsidian-gradient text-white font-mono p-0 overflow-x-hidden selection:bg-cyan-500/40">
      
      {/* Real-Time Ticker */}
      <div className="h-12 bg-black border-b border-white/10 flex items-center overflow-hidden relative z-50">
        <div className="flex whitespace-nowrap animate-ticker gap-16 px-6">
          {[primeAsset, ...signals].filter(Boolean).map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase">{s!.symbol}</span>
              <span className={`text-[11px] font-black ${s!.change24h >= 0 ? 'text-cyan-glow' : 'text-alert-red'}`}>
                ${(jitterPrices[s!.symbol] || s!.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 md:px-16 py-12 space-y-12 max-w-[2400px] mx-auto">
        <header className="flex justify-between items-end border-b-2 border-white/5 pb-12">
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-[-0.08em] flex items-center gap-6 italic">
              TREASURY <span className="text-cyan-glow leading-none">APEX_NODE</span>
              <span className="text-[10px] bg-cyan-glow/10 text-cyan-glow px-4 py-1.5 rounded-full border-2 border-cyan-glow/20 tracking-[0.4em] font-black not-italic ml-4">APEX_ACTIVE</span>
            </h1>
          </div>
          <div className="flex gap-6">
            <button onClick={handleSovereignSync} className="glass-panel px-8 py-3 rounded-2xl border-2 border-white/5 hover:border-cyan-glow/60 transition-all">
                <p className="text-sm font-black text-white/60">RE-SYNC LEDGER</p>
            </button>
          </div>
        </header>

        {loading && signals.length === 0 ? (
          <div className="h-[65vh] flex flex-col items-center justify-center space-y-10">
              <p className="text-[11px] font-black text-cyan-glow animate-pulse">SOVRA Sovereign LLC — Neural Arbitrage Pulse</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Vault Stats */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="glass-panel p-10 rounded-[48px] border-2 border-white/5 bg-gradient-to-br from-white/10 to-transparent">
                    <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">Verified Net Density</p>
                    <p className="text-5xl font-black text-white tracking-tighter">${vault.balance.toLocaleString()}</p>
                </div>
                <div className="glass-panel p-10 rounded-[48px] border-2 border-cyan-glow/40 bg-gradient-to-br from-cyan-glow/10 to-transparent shadow-[0_0_100px_rgba(0,240,255,0.04)]">
                    <p className="text-[11px] font-black text-cyan-glow/40 uppercase tracking-[0.3em] mb-6">Apex Valuation (12x)</p>
                    <p className="text-5xl font-black text-cyan-glow tracking-tighter">${vault.valuation.toLocaleString()}</p>
                </div>
                <div className="glass-panel p-10 rounded-[48px] border-2 border-white/5 bg-gradient-to-br from-white/10 to-transparent">
                    <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">Liquid Reserves (30%)</p>
                    <p className="text-5xl font-black text-white tracking-tighter">${vault.liquidReserve.toLocaleString()}</p>
                </div>
                <div className="glass-panel p-10 rounded-[48px] border-2 border-alert-gold/20 bg-gradient-to-br from-alert-gold/5 to-transparent">
                    <p className="text-[11px] font-black text-alert-gold/40 uppercase tracking-[0.3em] mb-6">Safety Gate Threshold</p>
                    <p className="text-5xl font-black text-alert-gold tracking-tighter">$250K</p>
                </div>
            </div>

            {/* Prime Asset Hero */}
            <div className="lg:col-span-12">
               {primeAsset && (
                 <div className="glass-panel p-16 rounded-[64px] border-2 border-white/10 relative overflow-hidden group shadow-[0_50px_150px_rgba(0,0,0,0.8)]">
                    <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-20">
                       <div className="space-y-10 flex-1 w-full">
                          <div className="flex items-center gap-8">
                             <div className="w-24 h-24 bg-black rounded-[32px] border-2 border-cyan-glow/50 flex items-center justify-center">
                                <span className="text-4xl font-black text-white italic">SOVRA</span>
                             </div>
                             <div>
                                <h2 className="text-7xl font-black tracking-[-0.08em] uppercase italic">Sovereign_Protocol</h2>
                             </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-20 border-y-2 border-white/5 py-12">
                             <div className="space-y-2">
                                <p className="text-[11px] text-white/20 uppercase tracking-[0.4em] font-black">Alpha Tranche Price</p>
                                <p className="text-7xl font-black text-white font-mono tracking-[-0.05em]">
                                  ${(jitterPrices[primeAsset.symbol] || primeAsset.price).toLocaleString(undefined, { minimumFractionDigits: 4 })}
                                </p>
                             </div>
                          </div>
                          <div className="flex flex-col md:flex-row gap-6 pt-6">
                             <button onClick={() => executeManeuver(primeAsset.symbol, 'ACCUMULATE')} className="flex-1 py-8 bg-cyan-glow text-black font-black uppercase text-[11px] tracking-[0.5em] rounded-3xl">Execute Absolute Accumulation</button>
                          </div>
                       </div>
                    </div>
                 </div>
               )}
            </div>

            {/* Oracle Grid */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
               {signals.map((signal, idx) => {
                  const isUp = signal.change24h >= 0;
                  return (
                    <div key={idx} className="glass-panel p-10 rounded-[48px] border-2 border-white/5 space-y-10 group relative overflow-hidden">
                       <div className="flex justify-between items-start relative z-10">
                          <div className="flex gap-5">
                             <div className="w-16 h-16 bg-white/5 rounded-[22px] border-2 border-white/10 flex items-center justify-center font-black text-sm">{signal.symbol.slice(0, 3)}</div>
                             <div>
                                <h4 className="text-2xl font-black uppercase italic">{signal.asset}</h4>
                             </div>
                          </div>
                       </div>
                       <div className="flex justify-between items-end border-b-2 border-white/5 pb-8 relative z-10">
                          <div className="space-y-2">
                             <p className="text-3xl font-black font-mono tracking-tighter">
                                ${(jitterPrices[signal.symbol] || signal.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
                             </p>
                          </div>
                          <div className="text-right space-y-2">
                             <p className={`text-xl font-black ${isUp ? 'text-cyan-glow' : 'text-alert-red'}`}>
                                {isUp ? '+' : ''}{signal.change24h.toFixed(2)}%
                             </p>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-6 relative z-10">
                          <button onClick={() => executeManeuver(signal.symbol, 'LIQUIDATE')} className="py-5 bg-white/5 border-2 border-white/10 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl">Liquidate</button>
                          <button onClick={() => executeManeuver(signal.symbol, 'ARBITRAGE')} className="py-5 bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl">Arbitrage</button>
                       </div>
                    </div>
                  );
               })}
            </div>
          </div>
        )}
      </div>

      <footer className="py-20 border-t border-white/5 text-center opacity-20">
         <p className="text-[8px] uppercase tracking-[0.5em] font-black">© 2026 SOVRA Sovereign LLC</p>
      </footer>

      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 40s linear infinite; }
        .glass-panel { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); }
      `}</style>
    </main>
  );
}
