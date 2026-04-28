'use client';

import React, { useState } from 'react';

const MT4PredictiveTerminal: React.FC = () => {
  const [confidence] = useState(94.2);
  const [signals] = useState([
    { token: 'BTC/USD', signal: 'LONG', conf: 98, status: 'APEX_ENTRY' },
    { token: 'SOL/USD', signal: 'LONG', conf: 92, status: 'TRAJECTORY_ACQUIRE' },
    { token: 'WLFI/USDC', signal: 'NEUTRAL', conf: 85, status: 'TREASURY_PULSE' },
  ]);

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 selection:bg-[#cd9d3f]/30">
      {/* Institutional Top Bar */}
      <div className="flex justify-between items-center mb-8 border-b border-[#cd9d3f]/20 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-[#cd9d3f] italic">SOVRA // NEURAL_CORE</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Institutional Prime Brokerage Gateway [SOVRA_v15.0]</p>
        </div>
        <div className="text-right font-mono">
          <div className="text-[#cd9d3f] text-xs font-bold">SOVEREIGN_VAULT: ACTIVE</div>
          <div className="text-gray-600 text-[10px] uppercase">Sovereign Lock: 100% Integrity</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Confidence Matrix */}
        <div className="p-6 rounded-xl bg-gray-900/50 border border-[#cd9d3f]/30 backdrop-blur-md relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-tighter">Neural Confidence Matrix</h2>
            <div className="text-6xl font-black text-[#cd9d3f] italic">{confidence}%</div>
            <p className="text-[10px] text-[#cd9d3f]/60 mt-2 uppercase font-mono">Institutional alpha probability engine</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#cd9d3f]/10 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
        </div>

        {/* LIQUIDITY_BRIDGE_STATUS (Wealth transmission) */}
        <div className="p-6 rounded-xl bg-gray-900/50 border border-[#ffdfa1]/30 backdrop-blur-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#ffdfa1] text-xs font-bold uppercase tracking-tighter flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffdfa1] animate-pulse"></span>
                Sovereign Liquidity Bridge
              </h2>
              <span className="text-[10px] text-[#ffdfa1]/60 font-mono">STATUS: TRANSITTING</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#ffdfa1] animate-[rebalance_2s_infinite]" style={{ width: '45%' }}></div>
              </div>
              <div className="text-xl font-black text-[#ffdfa1] italic">$14.5k</div>
            </div>
            <p className="text-[10px] text-[#ffdfa1]/60 mt-2 uppercase font-mono">Vault-to-Treasury Rebalance active</p>
          </div>
        </div>

        {/* TRUMP_HALO_PULSE (Treasury discovery) */}
        <div className="p-6 rounded-xl bg-gray-900/50 border border-yellow-500/30 backdrop-blur-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-yellow-500 text-xs font-bold uppercase tracking-tighter flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                TRUMP_HALO_PULSE
              </h2>
              <span className="text-[10px] text-yellow-500/60 font-mono">MAP_ID: HALO-001</span>
            </div>
            <div className="text-4xl font-black text-yellow-500 italic">$1.2B</div>
            <p className="text-[10px] text-yellow-500/60 mt-2 uppercase font-mono">Unknown Institutional Treasury Gate Detected</p>
            <div className="mt-4 pt-4 border-t border-yellow-500/20">
              <div className="flex justify-between text-[10px] font-mono">
                <span>SIGNAL_VELOCITY:</span>
                <span className="text-yellow-400">0.94 Hz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Signal Forensics */}
        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-md lg:col-span-2">
          <h2 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-tighter">Live Signal Forensics</h2>
          <div className="space-y-4">
            {signals.map((s) => (
              <div key={s.token} className="flex items-center justify-between p-3 rounded bg-black/40 border border-gray-800 hover:border-[#cd9d3f]/50 transition-all cursor-crosshair">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm min-w-[80px]">{s.token}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${s.signal === 'LONG' ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                    {s.signal}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-600 font-mono uppercase">{s.status}</div>
                    <div className="text-xs font-black text-[#cd9d3f] tracking-tighter">{s.conf}% CONF</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Aegis Audit Node */}
        <div className="p-6 rounded-xl bg-gray-900/50 border border-[#cd9d3f]/40 backdrop-blur-md lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-[#cd9d3f] text-xs font-bold uppercase tracking-tighter flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#cd9d3f] animate-pulse"></span>
                Institutional Audit Node
              </h2>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Real-time Cryptographic Compliance for SOVRA Partners</p>
            </div>
            <button 
              onClick={() => alert(`SOVRA HANDSHAKE VERIFIED: [SOVRA-${Math.random().toString(36).substr(2, 9).toUpperCase()}]`)}
              className="px-4 py-2 bg-[#cd9d3f]/10 border border-[#cd9d3f]/50 hover:bg-[#cd9d3f]/20 text-[#cd9d3f] text-xs font-bold rounded-lg transition-all"
            >
              VERIFY HANDSHAKE
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded bg-black/40 border border-[#cd9d3f]/20">
              <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">SOVRA_LOCK_STATUS</div>
              <div className="text-green-400 font-black text-sm tracking-tighter">SOVRA_HARDENED</div>
            </div>
            <div className="p-3 rounded bg-black/40 border border-[#cd9d3f]/20">
              <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">ESCROW_INTEGRITY</div>
              <div className="text-[#cd9d3f] font-black text-sm tracking-tighter">100.00% SECURE</div>
            </div>
            <div className="p-3 rounded bg-black/40 border border-[#cd9d3f]/20">
              <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">APEX_HANDSHAKE</div>
              <div className="text-[#cd9d3f] font-black text-sm tracking-tighter">SYNCHRONIZED</div>
            </div>
            <div className="p-3 rounded bg-black/40 border border-[#cd9d3f]/20">
              <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">AUTH_PULSE</div>
              <div className="flex gap-1 mt-1 items-center h-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-3 w-1 bg-[#cd9d3f]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Ticker row */}
      <div className="mt-8 p-3 bg-black/80 border-t border-b border-[#cd9d3f]/20 overflow-hidden">
        <div className="flex gap-8 items-center text-[10px] animate-ticker whitespace-nowrap">
           <span className="text-yellow-500 font-black px-2 py-0.5 border border-yellow-500/50">ALERT</span>
           <span className="text-gray-400 font-mono uppercase">Institutional Handshake with APEX GROUP confirmed... $3.5T liquidity gateway detected... WLFI 102% utilization signal in progress... SOVRA Kernel is at APEX status...</span>
        </div>
      </div>
    </div>
  );
};

export default MT4PredictiveTerminal;
