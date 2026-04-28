"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Send, Lock } from 'lucide-react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // Simulate SIL Handshake Pulse
      await new Promise(r => setTimeout(r, 1200));

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-SOVRA-DEEP-LOCK': 'PULSE_IDENTITY_VERIFIED' // SIL Bridge
        },
        body: JSON.stringify({ email, name, source: 'LEAD_MAGNET_0.01_SINGULARITY' }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Lead capture failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group max-w-2xl mx-auto my-16">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[32px] blur-2xl group-hover:opacity-100 transition duration-1000 opacity-50" />
      
      <div className="relative bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/5 rounded-[32px] p-12 overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                   <h3 className="text-2xl font-black italic tracking-tighter text-white">
                    SOVEREIGN <span className="text-blue-400">LEDGER</span> ACCESS
                  </h3>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Institutional Scaling Framework v2026.04</p>
                </div>
              </div>

              <p className="text-sm text-white/50 leading-relaxed max-w-lg">
                Ingest our internal 0.01% tier roadmap for autonomous revenue saturation. 
                Requires a verified SIL handshake for transit.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    placeholder="INSTITUTIONAL NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-2xl text-xs font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all uppercase tracking-widest"
                    required
                  />
                  <input
                    type="email"
                    placeholder="SECURE EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-2xl text-xs font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/30 transition-all uppercase tracking-widest"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-2xl hover:bg-blue-400 hover:text-white transition-all duration-500 group flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                     <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>IGNITE ACCESS</span>
                      <Send className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
              
              <div className="flex items-center gap-2 opacity-30">
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                <span className="text-[8px] font-black uppercase tracking-widest leading-none text-white">Deep Lock Handshake Active</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10 text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black italic tracking-tighter text-white">
                  TRANSMISSION <span className="text-green-400">SECURED</span>
                </h3>
                <p className="text-xs text-white/40 uppercase tracking-widest">
                  The framework is being sharded into your inbox at {email}.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
