'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * APEX SOVEREIGN COMPLIANCE BANNER (v15.0)
 * Mission: Global Legal Handshake (GDPR / CCPA / APAC)
 */
export default function ComplianceBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('APEX_LEGAL_HANDSHAKE');
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('APEX_LEGAL_HANDSHAKE', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-[1000] p-1 shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#050510]/95 backdrop-blur-3xl border border-white/5 rounded-3xl"></div>
          
          <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent rounded-3xl">
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 rounded-2xl bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-cyan-glow">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-cyan-glow/60 uppercase tracking-[0.4em] italic leading-none">Global Compliance Handshake</h4>
                  <p className="text-white/60 text-xs max-w-xl leading-relaxed">
                    SOVRA Sovereign LLC uses cryptographic cookies and node-pacing to verifiably ensure absolute security and operational performance. By continuing your institutional ingress, you accept our <a href="/legal/privacy" className="text-white hover:text-cyan-glow transition-colors font-bold underline underline-offset-4 decoration-white/20">Privacy Matrix</a> and <a href="/legal/terms" className="text-white hover:text-cyan-glow transition-colors font-bold underline underline-offset-4 decoration-white/20">Terms</a>.
                  </p>
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsVisible(false)}
                  className="px-6 py-3 text-[10px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Decline
                </button>
                <button 
                  onClick={handleAccept}
                  className="px-10 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-cyan-glow hover:text-white transition-all transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Authorize Node
                </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
