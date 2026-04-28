'use client';

import { useState, useEffect } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Opportunity {
  pair: string;
  source: string;
  target: string;
  spread: number;
  confidence: number;
  potentialProfit: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const CHANNELS = ['CoinGecko-Global', 'SOVRA-Mesh', 'DeepL-Sync'];

// ─── Components ────────────────────────────────────────────────────────────────
function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-[#00FFFF]/30 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FFFF]/5 blur-3xl rounded-full translate-x-12 -translate-y-12" />
      
      <div className="flex justify-between items-start mb-4 relative">
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-[#00FFFF] transition-colors">{opp.pair}</h3>
          <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">
            {opp.source} → {opp.target}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-black text-[#00FFFF]">{opp.spread}%</div>
          <div className="text-[9px] text-[#00FFFF]/60 uppercase tracking-widest">Spread Detected</div>
        </div>
      </div>

      <div className="space-y-4 relative">
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500">Confidence</span>
          <span className="text-white font-mono">{opp.confidence}%</span>
        </div>
        <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00FFFF] to-[#7B2FBE] transition-all duration-1000" 
            style={{ width: `${opp.confidence}%` }} 
          />
        </div>
        
        <div className="pt-4 border-t border-white/[0.04]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Est. Net Profit</span>
            <span className="text-lg font-black text-white">{opp.potentialProfit}</span>
          </div>
        </div>

        <button className="w-full py-3 bg-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00FFFF]/10 transition-all mt-2">
          Execute Sovereign Swap
        </button>
      </div>
    </div>
  );
}

// ─── Main Arbitrage Terminal ────────────────────────────────────────────────────
export default function ArbitrageTerminal() {
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    // Simulated institutional scanner logic
    const interval = setInterval(() => {
      const pairs = ['BTC/ETH', 'SOL/USDT', 'ARB/USDC', 'TIA/USDT', 'LINK/ETH'];
      const newOpps: Opportunity[] = pairs.map(p => ({
        pair: p,
        source: ['Binance', 'Coinbase', 'Kraken'][Math.floor(Math.random() * 3)],
        target: ['Uniswap', 'Jupiter', 'Raydium'][Math.floor(Math.random() * 3)],
        spread: parseFloat((Math.random() * 2 + 0.1).toFixed(2)),
        confidence: Math.floor(Math.random() * 20 + 75),
        potentialProfit: `$${(Math.random() * 450 + 50).toFixed(2)}`
      })).sort((a, b) => b.spread - a.spread);
      
      setOpps(newOpps);
      setScanning(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#06060c] text-white p-4 sm:p-8 selection:bg-[#00FFFF]/30" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 255, 255, 0.1); border-radius: 10px; }
      `}</style>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00FFFF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7B2FBE]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/[0.04] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="px-2 py-0.5 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded text-[9px] font-black text-[#00FFFF] uppercase tracking-widest">
                SOVRA Sovereign Tech
              </div>
              <div className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[9px] font-black text-red-400 uppercase tracking-widest">
                DeepLock Secured
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">
              Arbitrage <span className="text-[#00FFFF]">Terminal</span>
            </h1>
            <p className="text-zinc-600 text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold mt-2">
              Cross-Exchange Decentralized Wealth Engine
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:w-auto">
            {CHANNELS.map(ch => (
              <div key={ch} className="px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] animate-pulse" />
                <span className="text-[10px] text-white font-bold uppercase tracking-widest">{ch}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">
              {scanning ? 'Initializing Neural Scanner...' : 'Active Opportunities Detected'}
            </h2>
            <div className="text-[10px] text-[#00FFFF] uppercase tracking-widest font-bold">
              Scan Rate: 1.2ms · Integrity: 100%
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scanning ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-white/[0.02] border border-white/[0.06] rounded-2xl animate-pulse" />
              ))
            ) : (
              opps.map((opp, i) => <OpportunityCard key={i} opp={opp} />)
            )}
          </div>
        </section>

        <footer className="pt-12 border-t border-white/[0.04]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold mb-4">Sentinel Health</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Latency</span>
                  <span className="text-[#00FFFF]">8ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Node Status</span>
                  <span className="text-green-500">PROXIMAL</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 flex items-center justify-center py-8">
              <div className="text-[9px] text-zinc-700 uppercase tracking-[0.6em] font-black text-center">
                Autonomous Digital Wealth Protocol · Owner: Anthony Oxendine · © 2026 SOVRA
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold mb-4">Infrastructure</div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-1 bg-[#00FFFF]/20 rounded-full" />
                <div className="w-6 h-1 bg-[#00FFFF]/40 rounded-full" />
                <div className="w-8 h-1 bg-[#00FFFF] rounded-full" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
