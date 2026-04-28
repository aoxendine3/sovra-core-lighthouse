'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Globe, 
  Cpu, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2,
  Lock,
  Bitcoin,
  Coins
} from 'lucide-react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

/**
 * SOVRA_BINANCE_INSTITUTIONAL (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: CRYPTO_LIQUIDITY_APEX
 * Aesthetic: NOCTURNAL_GOLD (Gold/Black/Deep Amber)
 */
export default function BinanceInstitutionalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const lock = await generateHandshake();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'X-SOVRA-DEEP-LOCK': lock, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, asset: 'BINANCE_INSTITUTIONAL' })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('[Sovereign] Crypto Grounding Fault');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020205] text-white font-sans selection:bg-amber-500/30 selection:text-black overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-amber-500/5 blur-[150px] rounded-full" />
      </div>

      <nav className="relative z-50 flex justify-between items-center px-12 py-10 border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center font-black text-black italic text-xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">BI</div>
          <div className="flex flex-col">
             <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Binance Institutional</span>
             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] italic">SOVRA_DIGITAL_CUSTODY</span>
          </div>
        </div>
        <button 
           className="px-8 py-3 rounded-full border border-amber-500/40 bg-amber-500/5 text-amber-500 text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all italic"
        >
          Secure Custody Access
        </button>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-12 pt-32 pb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
          >
             <Bitcoin className="w-3 h-3 text-amber-500 animate-pulse" />
             <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/60">v77.2_LIQUIDITY_SWARM</span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
            Digital<br />
            <span className="text-amber-500 not-italic">Custody</span>
          </h1>

          <p className="text-2xl text-white/40 font-light leading-relaxed italic max-w-xl">
            Authorize the deployment of exascale liquidity. Unparalleled digital asset custody for sovereign wealth funds and institutional 0.01% leaders.
          </p>

          <div className="grid grid-cols-2 gap-8">
             <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-4">
                <Coins className="w-6 h-6 text-amber-500" />
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Liquidity</div>
                <div className="text-3xl font-black italic">$100B+</div>
             </div>
             <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] space-y-4">
                <Shield className="w-6 h-6 text-amber-500" />
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Vault Security</div>
                <div className="text-3xl font-black italic">COLD_STORAGE</div>
             </div>
          </div>
        </div>

        <div className="relative">
           <AnimatePresence mode="wait">
             {!submitted ? (
               <motion.form 
                 onSubmit={handleLeadCapture}
                 className="relative p-12 rounded-[56px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl space-y-8"
               >
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black italic uppercase tracking-tight">Institutional Ingress</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Provide corporate credentials for asset verification.</p>
                 </div>
                 <input name="company" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-amber-500/40 outline-none transition-all" placeholder="CORPORATION NAME" />
                 <input name="email" type="email" required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-amber-500/40 outline-none transition-all" placeholder="OFFICIAL@CORP.BIZ" />
                 <button 
                   className="w-full py-8 bg-amber-500 text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-3xl hover:bg-white transition-all active:scale-95 italic"
                 >
                   Authorize Vault Pulse
                 </button>
                 <div className="flex items-center justify-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-widest italic">
                    <Lock className="w-3 h-3" />
                    SECURE_QUANTUM_HANDSHAKE_ACTIVE
                 </div>
               </motion.form>
             ) : (
               <motion.div className="relative p-16 rounded-[56px] border border-amber-500/40 bg-amber-500/5 backdrop-blur-3xl shadow-2xl text-center space-y-10">
                  <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto" />
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">Vault Authorized</h2>
                  <p className="text-lg text-white/60 italic">Your institutional request has been grounded in the Sovereign Ledger.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
