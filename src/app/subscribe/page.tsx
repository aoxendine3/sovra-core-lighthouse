'use client';

import React, { useState } from 'react';
import { tiers } from '@/data/subscription_tiers.json';
import { createSOVRAToken } from '@/lib/auth/HandshakeClient';
import { motion } from 'framer-motion';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTier, setSelectedTier] = useState(tiers[1].id); // Default to Sentinel
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [handshake, setHandshake] = useState('');

  const currentTier = tiers.find(t => t.id === selectedTier) || tiers[1];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email, 
            name, 
            tierId: selectedTier,
            source: 'INSTITUTIONAL_PORTAL'
        })
      });

      const data = await res.json();
      if (res.ok) {
        setHandshake(data.handshakeId);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-obsidian-gradient text-white flex flex-col items-center py-20 px-4 relative overflow-hidden font-sans">
      
      {/* Sovereign Foreground Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[800px] h-[800px] bg-cyan-glow/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[800px] h-[800px] bg-sia_core-gold/5 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[#000] opacity-[0.95]"></div>
      </div>

      <div className="z-10 w-full max-w-7xl">
        <header className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
             <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500"></div>
             <h2 className="text-amber-500 font-mono tracking-[0.5em] text-[10px] uppercase font-black">SOVRA Sovereign LLC — Production v.007</h2>
             <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500"></div>
          </div>
          <h1 className="text-[120px] md:text-[180px] font-black tracking-[-0.08em] leading-none mb-10 bg-gradient-to-b from-white via-white to-amber-500/20 bg-clip-text text-transparent italic select-none">
            SOVRA
          </h1>
          <p className="text-white/40 max-w-3xl mx-auto text-[11px] leading-relaxed tracking-[0.3em] uppercase font-black">
            "Prophetic Ingress for Institutional Partners. Operational Finality active under Protocol v.007_SINGULARITY_EXASCALE."
          </p>
        </header>

        {status === 'success' ? (
          <section className="max-w-xl mx-auto p-12 rounded-[40px] border border-amber-500/30 bg-black/40 backdrop-blur-3xl text-center shadow-[0_0_50px_rgba(245,158,11,0.1)]">
             <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/40">
                <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
             </div>
             <h2 className="text-3xl font-black mb-4 uppercase italic italic tracking-tighter">Handshake Grounded</h2>
             <p className="text-white/60 mb-8 leading-relaxed uppercase font-bold text-[10px]">
               Welcome to the grid, <strong>{name || email}</strong>. Your institutional node is initializing under protocol {currentTier.name.toUpperCase()}.
             </p>
             <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-sm mb-8">
               <span className="text-white/40 block mb-1">SOVEREIGN_ID</span>
               <span className="text-amber-500 font-bold tracking-widest">{handshake}</span>
             </div>
             <button onClick={() => window.location.href = '/'} className="px-10 py-5 rounded-full bg-amber-500 text-black font-black uppercase tracking-widest hover:scale-105 transition-all text-xs">Enter Command Core</button>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Tier Selection */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`group relative p-10 rounded-[48px] text-left transition-all duration-700 border-2 ${
                    selectedTier === tier.id 
                      ? 'bg-amber-500/5 border-amber-500/60 shadow-[0_0_100px_rgba(245,158,11,0.1)] scale-[1.02]' 
                      : 'bg-white/[0.01] border-white/5 hover:border-white/20 shadow-2xl'
                  }`}
                  style={{ borderColor: selectedTier === tier.id ? '#f59e0b' : undefined }}
                >
                  <div className={`w-16 h-16 rounded-[22px] mb-8 flex items-center justify-center border-2 transition-transform duration-700 group-hover:rotate-[10deg] ${
                    selectedTier === tier.id ? `bg-amber-500/10 border-amber-500/40` : 'bg-white/5 border-white/10'
                  }`}
                  style={{ borderColor: selectedTier === tier.id ? '#f59e0b' : undefined }}>
                    {tier.id === 'guardian' && <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>}
                    {tier.id === 'sentinel' && <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>}
                    {tier.id === 'apex' && <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3 group-hover:translate-x-2 transition-transform uppercase tracking-tighter italic">{tier.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-black tracking-tighter tabular-nums">${tier.price}</span>
                    <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">COMMITMENT</span>
                  </div>
                  <p className="text-white/40 text-[10px] mb-8 leading-relaxed font-black uppercase tracking-widest italic">{tier.description}</p>
                  
                  <ul className="space-y-4 mb-6">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-4 text-[11px] text-white/50 font-bold uppercase tracking-widest">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                         {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-4 sticky top-12">
              <div className="p-10 rounded-[56px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_60px_150px_rgba(0,0,0,0.8)] border-t-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-50" />
                <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-10 text-center relative z-10 italic">Institutional Handshake (v.007)</h4>
                
                <form onSubmit={handleSubscribe} className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/40 uppercase ml-4 tracking-widest">Institutional Identity</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#f59e0b' }}
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="NAME_OR_ORG_INIT..."
                      required
                      className="w-full px-8 py-6 rounded-3xl bg-black/60 border border-white/5 focus:border-amber-500/50 outline-none transition-all placeholder:text-white/5 text-white font-mono text-xs tracking-[0.3em] uppercase"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/40 uppercase ml-4 tracking-widest">Secure Node Endpoint</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#f59e0b' }}
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="NODE@SOVRA.EMPIRE..."
                      required
                      className="w-full px-8 py-6 rounded-3xl bg-black/60 border border-white/5 focus:border-amber-500/50 outline-none transition-all placeholder:text-white/5 text-white font-mono text-xs tracking-[0.3em] uppercase"
                    />
                  </div>

                  <div className="pt-10 border-t border-white/5 mt-10">
                    <div className="flex justify-between items-center mb-12">
                      <span className="text-white/30 text-[11px] font-black uppercase tracking-widest italic">Total Tranche Value</span>
                      <motion.span 
                        key={currentTier.price}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black tracking-tighter tabular-nums"
                      >
                        ${currentTier.price}
                      </motion.span>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(245,158,11,0.2)' }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={status === 'loading'}
                      className={`w-full py-8 rounded-[32px] font-black tracking-[0.4em] text-[12px] uppercase flex items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${
                        status === 'loading' ? 'bg-white/5 cursor-not-allowed text-white/20 border border-white/5' : 'bg-amber-500 text-black hover:bg-white border border-transparent'
                      }`}
                    >
                      {status === 'loading' ? (
                        <div className="w-6 h-6 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Initiate Absolute Handshake
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </>
                      )}
                    </motion.button>
                    
                    {status === 'error' && (
                       <p className="text-alert-red text-[10px] mt-6 text-center font-black uppercase tracking-widest animate-pulse">CONNECTION_FAULT: Handshake Terminated.</p>
                    )}
                  </div>
                </form>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono text-white/20 tracking-widest uppercase">
                 <span className="w-2 h-2 rounded-full bg-green-500/40 animate-pulse"></span>
                 Encrypted Institutional Ingress
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
