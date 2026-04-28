'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';
import { Shield, Lock, Cpu, Zap, ArrowRight, Gauge } from 'lucide-react';

/**
 * SOVRA_SECURITY: ZERO_POINT_INGRESS (v60.0_SENTINEL)
 * ─────────────────────────────────────────────────────────────
 * MISSION: SECURITY_PERIMETER_ENFORCEMENT
 * Protocol: DEEP_LOCK_v2026.11
 */
export default function SOVRAZeroPoint() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'DEPLOYING' | 'SECURED'>('IDLE');
  const [pulseId, setPulseId] = useState('SENTINEL-INIT');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseId('SENTINEL-' + Math.random().toString(36).substring(7).toUpperCase());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  async function handleEnterpriseAccess(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('DEPLOYING');

    try {
      const lock = await generateHandshake();
      
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 
          'X-SOVRA-DEEP-LOCK': lock,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          email, 
          source: 'ZERO_POINT_COMMAND',
          name: 'ENTERPRISE_LEAD_ZERO_POINT',
          isWhale: true 
        })
      });

      if (res.ok) {
        setStatus('SECURED');
      } else {
        setStatus('IDLE');
        alert('Institutional Authorization Required.');
      }
    } catch (err) {
      console.error('[ZeroPoint] Pulse Failure:', err);
      setStatus('IDLE');
    }
  }

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden relative">
      
      {/* Dynamic Deep-Lock Aura */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 blur-[120px] bg-[radial-gradient(circle_at_50%_0%,_#F59E0B05_0%,_transparent_70%)]"></div>
      
      {/* Navbar: Modular Security Bridge */}
      <nav className="relative z-10 px-10 py-8 flex justify-between items-center border-b border-white/5 backdrop-blur-3xl bg-black/10">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href='/'}>
           <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">S</div>
           <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter italic">SOVRA Security™</span>
              <span className="text-[9px] font-mono tracking-[0.4em] text-amber-500 uppercase font-bold">{pulseId}</span>
           </div>
        </div>
        <div className="hidden md:flex gap-10 items-center">
          <a href="#" className="text-[11px] font-bold text-white/40 hover:text-white transition-colors tracking-widest uppercase">SDK Core</a>
          <a href="#" className="text-[11px] font-bold text-white/40 hover:text-white transition-colors tracking-widest uppercase">Institutional</a>
          <button className="px-6 py-2.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[11px] font-black tracking-widest uppercase hover:bg-amber-500 hover:text-black transition-all">Deploy SDK</button>
        </div>
      </nav>

      {/* Hero: The Absolute Perimiter */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 text-center flex flex-col items-center space-y-12">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase"
        >
          Total DOM-to-Edge API Encryption
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tightest leading-[0.9] max-w-5xl uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-white to-white/40">
          KILL API SCRAPERS <br/>
          IN ONE SECOND.
        </h1>

        <p className="text-xl md:text-2xl font-black text-white/40 max-w-2xl leading-relaxed italic uppercase tracking-tighter">
          Behavioral WAFs rely on guessing. SOVRA Zero-Point uses dynamic 1,000ms cryptographic hashing. Absolute market finality.
        </p>

        <div className="w-full max-w-xl bg-white/5 border border-white/5 p-2 rounded-[32px] backdrop-blur-3xl shadow-3xl">
          <form onSubmit={handleEnterpriseAccess} className="flex flex-col md:flex-row gap-3">
            <input 
              type="email" 
              placeholder="CTO_ENTERPRISE_IDENT"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={status !== 'IDLE'}
              className="flex-1 bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-sm font-mono tracking-widest text-white/90 focus:border-amber-500/30 transition-all outline-none disabled:opacity-30"
            />
            <button 
              type="submit"
              disabled={status !== 'IDLE'}
              className={`px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl ${status === 'SECURED' ? 'bg-green-500 text-white' : 'bg-amber-500 text-black shadow-amber-500/20 hover:scale-105'}`}
            >
              {status === 'IDLE' ? 'Request SDK' : status === 'DEPLOYING' ? 'ENCRYPTING...' : 'ACCESS GRANTED'}
            </button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black tracking-[0.2em] text-white/20 uppercase italic">
          <span className="flex items-center gap-3 font-black"><Shield className="w-3 h-3 text-amber-500" /> No Middleware Required</span>
          <span className="flex items-center gap-3 font-black"><Gauge className="w-3 h-3 text-amber-500" /> Native WebCrypto API</span>
          <span className="flex items-center gap-3 font-black"><Lock className="w-3 h-3 text-amber-500" /> Sub-Second Tolerances</span>
        </div>
      </section>

      {/* Pricing: Selective Isolation */}
      <section className="relative z-10 bg-black/40 border-y border-white/5 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Startup Tier */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/5 rounded-[48px] p-12 space-y-10 hover:border-white/10 transition-colors relative overflow-hidden group"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">Series A / Startups</span>
              <h3 className="text-6xl font-black tracking-tightest leading-none italic">$999<span className="text-lg text-white/20 font-medium">/MO</span></h3>
              <p className="text-sm text-white/40 leading-relaxed italic">Secure your LLM endpoints or proprietary GraphQL structures natively.</p>
            </div>
            <div className="h-px bg-white/5" />
            <ul className="space-y-4 text-sm font-black text-white/60 italic uppercase tracking-tighter">
              <li className="flex items-center gap-4 group-hover:text-white transition-colors"><span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> 1M Secure API Validations</li>
              <li className="flex items-center gap-4 group-hover:text-white transition-colors"><span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> React/Next.js Native Integration</li>
              <li className="flex items-center gap-4 group-hover:text-white transition-colors"><span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> 5-Second Latency Window</li>
            </ul>
            <button className="w-full py-5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">Initiate Deployment</button>
          </motion.div>

          {/* Enterprise Tier */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/30 rounded-[48px] p-12 space-y-10 shadow-[0_30px_60px_rgba(245,158,11,0.1)] relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
            <div className="space-y-4">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] italic text-glow_amber">Enterprise Isolation</span>
              <h3 className="text-6xl font-black tracking-tightest leading-none italic uppercase speculative-text">$499,000<span className="text-lg text-white/20 font-medium">/LIFETIME</span></h3>
              <p className="text-sm text-white/40 leading-relaxed italic">The Sovereign Shield SDK. Absolute 120/1 institutional protection.</p>
            </div>
            <div className="h-px bg-amber-500/20" />
            <ul className="space-y-4 text-sm font-black text-white/80 italic uppercase tracking-tighter">
              <li className="flex items-center gap-4 font-black text-amber-500"><Zap className="w-4 h-4" /> Unlimited API Validations</li>
              <li className="flex items-center gap-4 font-black"><Zap className="w-4 h-4 text-amber-500" /> Instant 1000ms Latency Window</li>
              <li className="flex items-center gap-4 font-black"><Zap className="w-4 h-4 text-amber-500" /> Dedicated Apex Executive Channel</li>
            </ul>
            <button className="w-full py-5 bg-amber-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-amber-500/20 active:scale-95 transition-all outline-none border-none">Secure SDK Access</button>
          </motion.div>

        </div>
      </section>

      {/* Footer: Institutional Credit */}
      <footer className="relative z-10 py-20 px-6 text-center text-[10px] font-black text-white/10 tracking-[0.8em] uppercase italic">
        &copy; 2026 SOVRA Sovereign | GLOBAL SECURITY FINALITY
      </footer>

      <style jsx>{`
        .tracking-tightest { letter-spacing: -0.08em; }
        .text-glow_amber { text-shadow: 0 0 20px rgba(245,158,11,0.4); }
      `}</style>
    </main>
  );
}
