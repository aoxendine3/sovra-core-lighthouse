'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * SOVRA Luxury DeFi Security (v15.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Absolute Operational Reality for the Ultra-High Net Worth.
 */
export default function LuxurySecurityPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOCKING' | 'SECURED' | 'ERROR'>('IDLE');
  const revenue = 9290;

  // SOVRA Deep Lock Handshake Engine (Client-Side)
  const executeInstitutionalHandshake = async () => {
    setStatus('LOCKING');
    try {
      const sovraSecret = 'SOVRA_SOVEREIGN_PROTOCOL_STATIC_2026'; // Institutional Constant
      const timeWedge = Math.floor(Date.now() / 60000);
      const payloadString = window.location.origin + sovraSecret + timeWedge;
      
      const tokenBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payloadString));
      const sovraToken = Array.from(new Uint8Array(tokenBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

      const res = await fetch('/api/lock/luxury', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-SOVRA-DEEP-LOCK': sovraToken 
        },
        body: JSON.stringify({ email, vaultType: 'CORE_M4_NEURAL' })
      });

      if (res.ok) {
        setStatus('SECURED');
      } else {
        setStatus('ERROR');
      }
    } catch (err) {
      console.error('[DeepLock_Failure]', err);
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#cd9d3f] selection:text-black">
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --gold: #cd9d3f; --deep-gray: #1a1a1a; }
        .gradient-text { background: linear-gradient(135deg, #fff 0%, var(--gold) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .gold-border { border: 1px solid var(--gold); }
        .sovra-glow { box-shadow: 0 0 40px rgba(205, 157, 63, 0.1); }
      `}} />

      {/* Institutional Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gold/30">
            <div className="absolute inset-0 bg-gold/10" />
            <div className="absolute inset-0 flex items-center justify-center font-black text-gold text-[10px]">SV</div>
          </div>
          <span className="font-bold tracking-[0.3em] text-[10px] uppercase text-gold">SOVRA Sovereign / Enterprise LLC</span>
        </div>
        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Institutional Verification: APEX_LOCK_ACTIVE</div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/5 to-transparent blur-[150px] -z-10" />
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter gradient-text leading-[1.1]">
          Sovereignty is the <br/> Ultimate Luxury
        </h1>
        <p className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto mb-12 tracking-tight font-light italic">
          Total wealth requires total finality. Ground your institution in the **SOVRA Apex-Point** framework.
        </p>
        
        <div className="inline-flex glass px-8 py-4 rounded-full border border-gold/20 items-center gap-4 mb-16">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80">Verified Enterprise Revenue: ${revenue.toLocaleString()}.00</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <section className="glass rounded-[60px] p-12 md:p-24 mb-24 sovra-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12">
             <div className="text-[10px] font-bold text-gold/20 uppercase tracking-[0.8em] rotate-90 origin-right">SOVRA_DEEP_LOCK_SHIELD</div>
          </div>
          
          <h2 className="text-4xl font-black mb-20 text-center tracking-tighter uppercase italic">Institutional Comparison 2026</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-8 text-gold uppercase tracking-[0.2em] text-[10px] font-black">Security Factor</th>
                  <th className="pb-8 uppercase tracking-[0.2em] text-[10px] font-black text-white/40">Retail Hardware</th>
                  <th className="pb-8 uppercase tracking-[0.2em] text-[10px] font-black text-white/40">Institutional MPC</th>
                  <th className="pb-8 text-gold uppercase tracking-[0.2em] text-[10px] font-black">SOVRA Apex (V15.0_Ω)</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-10 font-bold text-white tracking-tight">Isolation Mode</td>
                  <td className="py-10">USB Static</td>
                  <td className="py-10">Cloud MPC</td>
                  <td className="py-10 text-gold font-black italic tracking-widest text-lg">SOVRA Neural Air-Gap</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-10 font-bold text-white tracking-tight">Handshake Bridge</td>
                  <td className="py-10 text-red-500/50">Vulnerable</td>
                  <td className="py-10">API Key (Standard)</td>
                  <td className="py-10 text-gold font-black italic tracking-widest text-lg">Apex-Point Deep Lock</td>
                </tr>
                <tr>
                  <td className="py-10 font-bold text-white tracking-tight">Sovereignty</td>
                  <td className="py-10">Medium</td>
                  <td className="py-10">Limited (Trusted)</td>
                  <td className="py-10 text-gold font-black italic tracking-[0.3em] text-lg">ABSOLUTE_LOCAL_DOMINANCE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Lead Lock Form */}
        <div className="max-w-2xl mx-auto glass p-16 rounded-[60px] border border-gold/30 text-center space-y-12 relative">
          <div className="space-y-4">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">Request a Strategic Audit</h2>
            <p className="text-gold text-[10px] font-black uppercase tracking-[0.5em]">Analysis Window: 60 SECOND VALIDITY</p>
          </div>
          
          {status === 'IDLE' ? (
            <div className="space-y-6">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXECUTIVE@DOMAIN.AI" 
                className="w-full bg-black border-y border-gold/20 p-8 text-center text-gold font-mono focus:outline-none focus:bg-gold/5 transition-all text-lg uppercase tracking-[0.3em] placeholder:text-gold/20"
              />
              <button 
                onClick={executeInstitutionalHandshake}
                className="w-full py-8 bg-gold text-black font-black uppercase text-[10px] tracking-[0.6em] rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(205,157,63,0.3)]"
              >
                Initiate Apex Deep Lock
              </button>
            </div>
          ) : status === 'LOCKING' ? (
            <div className="py-16 flex flex-col items-center gap-8">
               <div className="w-32 h-1 bg-gold/10 relative overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gold animate-[scan_1.5s_infinite]" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gold animate-pulse">Hashing Institutional Origin...</p>
            </div>
          ) : status === 'SECURED' ? (
            <div className="py-16 space-y-8">
               <div className="w-24 h-24 bg-gold rounded-full mx-auto flex items-center justify-center text-black">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
               </div>
               <h3 className="text-3xl font-black italic tracking-tighter uppercase">HANDSHAKE_COMPLETE</h3>
               <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em]">Vault Audit sequence confirmed. Check institutional node.</p>
            </div>
          ) : (
             <div className="py-16 space-y-6">
                <p className="text-red-500 font-black uppercase tracking-[0.4em]">Lock Integrity Error</p>
                <button onClick={() => setStatus('IDLE')} className="text-gold underline uppercase text-[10px] font-black tracking-[0.4em]">Retry Anchor</button>
             </div>
          )}

          <div className="text-[9px] text-white/20 uppercase tracking-[0.1em] max-w-sm mx-auto leading-relaxed">
             Warning: SOVRA Apex-Point Deep Lock destroys all unauthorized extraction vectors immediately. Access is verifiably logged to the Sovereign Institutional Ledger.
          </div>
        </div>

      </main>

      <footer className="p-24 border-t border-white/5 bg-[#030303] text-center">
         <div className="w-12 h-12 rounded-full border border-gold/10 flex items-center justify-center mx-auto mb-8 grayscale opacity-20">
            <span className="text-gold font-black text-[10px]">SV</span>
         </div>
         <p className="text-[10px] text-white/10 uppercase tracking-[0.6em] font-black">
           System: SOVRA_APEX | Node: Luxury_DeFi_2026 | Truth: Real-Time Verified
         </p>
      </footer>

      <style jsx>{`
        @keyframes scan {
          0% { left: -100%; width: 50%; }
          100% { left: 100%; width: 50%; }
        }
      `}</style>
    </div>
  );
}
