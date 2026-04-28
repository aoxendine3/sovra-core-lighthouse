"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

/**
 * SOVRA_PRIME_ACCESSORY_CONCIERGE (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * MISSION: CONVERSION_POLISH_SATURATION
 * Protocol: ACCESSORY_INGRESS_v1.0
 */
export default function CustomerSurveyPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [ecosystem, setEcosystem] = useState('ALL');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('sovra_concierge_completed');
    if (hasSubmitted) return;

    // Trigger after 8 seconds (Optimized for 0.01% elite retention)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleLaunchJoin = async () => {
    if (!email || !email.includes('@')) return;
    setIsLoading(true);

    try {
      // PROVISIONING_PULSE: Acquire authorized server-side handshake
      const lock = await generateHandshake();
      
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-SOVRA-DEEP-LOCK': lock 
        },
        body: JSON.stringify({ 
          email, 
          source: 'APEX_CONCIERGE',
          metadata: { 
            ecosystem, 
            ingress: 'DESKTOP_POPUP',
            version: 'v16.0_SENTINEL'
          }
        })
      });
      
      if (res.ok) {
        setSubmitted(true);
        localStorage.setItem('apex_concierge_completed', 'true');
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (err) {
      console.error('[Concierge] Transmission Fault:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeConcierge = () => {
    setIsVisible(false);
    localStorage.setItem('apex_concierge_completed', 'dismissed');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="fixed bottom-6 right-6 w-[420px] z-[999] overflow-hidden rounded-[40px] border border-white/10 glass-apex-elite p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          {/* Institutional Decor */}
          <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-cyan-glow/10 blur-[100px]"></div>
          
          <button 
            onClick={closeConcierge}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all font-light"
          >
            ×
          </button>

          {!submitted ? (
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                   <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#F59E0B]" />
                   <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 font-mono italic">SOVRA Prime</h4>
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-white leading-tight italic">
                  Institutional <br/>ACCESSORY <span className="text-amber-500">CONCIERGE</span>
                </h3>
              </div>
              
              <p className="text-[13px] text-white/40 leading-relaxed font-light italic">
                Strategic optimization for the elite Apple ecosystem. Claim early access to next-gen hardware tranches and sovereign firmware.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {['IPHONE', 'MAC', 'WATCH', 'OPTIMIZER'].map(eco => (
                  <button
                    key={eco}
                    onClick={() => setEcosystem(eco)}
                    className={`py-4 rounded-2xl border text-[9px] font-black tracking-widest transition-all duration-500 ${ecosystem === eco ? 'bg-cyan-glow/20 border-cyan-glow/40 text-cyan-glow shadow-[0_0_20px_rgba(0,240,255,0.1)]' : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'}`}
                  >
                    {eco}
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <div className="relative group">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="INSTITUTIONAL_ROOT_EMAIL"
                    className="w-full bg-[#030303] border border-white/5 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-white/10 outline-none focus:border-amber-500/40 transition-all font-mono"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-amber-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-700" />
                </div>
                
                <button
                  onClick={handleLaunchJoin}
                  disabled={isLoading || !email.includes('@')}
                  className="w-full py-5 bg-white text-black font-black text-[11px] rounded-2xl hover:bg-amber-500 transition-all duration-700 uppercase tracking-[0.3em] shadow-2xl disabled:opacity-20 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <span className="relative z-10">{isLoading ? 'GROUNDING PULSE...' : 'Deploy Early Access'}</span>
                  {isLoading && (
                    <motion.div 
                      className="absolute inset-0 bg-amber-500"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 text-center py-16 space-y-6">
              <div className="w-20 h-20 bg-cyan-glow/10 border border-cyan-glow/20 rounded-full mx-auto flex items-center justify-center">
                 <div className="w-3 h-3 bg-cyan-glow rounded-full animate-ping" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white italic tracking-tight">Handshake Synchronized</h4>
                <p className="text-[10px] font-mono text-cyan-glow/40 uppercase tracking-[0.4em] font-bold">Institutional Node Active</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
