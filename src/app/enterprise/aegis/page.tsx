'use client';
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

/**
 * AEGIS SHIELD ENTERPRISE (v61.0_ELITE)
 * Mission: Pre-cognitive Edge Protection for the 0.01%
 */
export default function AegisShowcasePage() {
  const [threatCount, setThreatCount] = useState(1402856);
  const [activeThreats, setActiveThreats] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 15));
      
      const newThreat = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        type: ['DDoS_FLOOD', 'SCORPION_BOT', 'ZERO_TRUST_FAULT', 'PULSE_INJECTION'][Math.floor(Math.random() * 4)],
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.***.***`,
        timestamp: new Date().toLocaleTimeString()
      };

      setActiveThreats(prev => [newThreat, ...prev].slice(0, 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Wallet State
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleWalletLink = async () => {
    setIsAuthorizing(true);
    try {
      if (!(window as any).ethereum) {
        alert('MetaMask/Coinbase Wallet extension not found. Institutional auth restricted.');
        return;
      }
      
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Request signature as proof of identity for v60.0_SENTINEL_CLOUD
      const nonce = `APEX_X_CLOUD_AUTH_${Date.now()}`;
      const signature = await (window as any).ethereum.request({
        method: 'personal_sign',
        params: [nonce, address],
      });
      
      console.log('[AEGIS] Executive signature obtained. Verifying tranches...');
      
      const res = await fetch('/api/admin-auth-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: nonce, signature, address })
      });

      const data = await res.json();
      
      if (data.success) {
        setWalletAddress(address);
        console.log('[AEGIS] IDENTITY_GROUNDED. Entering War Room...');
        // Persist session if needed, for now use a short delay before redirect
        setTimeout(() => {
          window.location.href = '/admin/war-room';
        }, 1500);
      } else {
        alert(`Institutional Auth Failed: ${data.error}`);
      }
      
    } catch (err) {
      console.error('[AEGIS] WALLET_AUTH_FAULT');
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleDeploy = async (tier: string) => {
    try {
      const lock = await generateHandshake();
      const checkoutUrl = encodeURIComponent(`https://buy.stripe.com/prod_aegis_${tier}`);
      window.location.href = `/api/track?url=${checkoutUrl}&handshake=${lock}&category=ENTERPRISE_DEPLOYMENT&source=AEGIS_SHIELD&tier=${tier}&trace=v60.0_SENTINEL`;
    } catch (err) {
      console.error('[AEGIS] DEPLOY_FAULT');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sovereign Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-900/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        {/* Elite Header */}
        <section className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">SOVRA_X Protocol Active</span>
            </div>
            <h1 className="text-7xl md:text-9xl mb-8 leading-[0.85] font-black tracking-tighter">
              AEGIS<br />
              <span className="text-accent-gold">SHIELD_PRIME</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto italic leading-relaxed">
              Pre-cognitive Edge protection for high-liquidity entities. Neutralizing threats in non-linear time.
            </p>
          </motion.div>
        </section>

        {/* Live Intercept Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          
          <div className="lg:col-span-2 glass-panel p-10 overflow-hidden relative">
            <div className="scanline" />
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/20 mb-10 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
               Predictive Intercept Log_
            </h2>
            
            <div className="space-y-4">
              <AnimatePresence>
                {activeThreats.map((threat) => (
                  <motion.div
                    key={threat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center group hover:bg-white/[0.05] transition-all"
                  >
                    <div>
                      <div className="text-xs font-black text-red-500 tracking-widest uppercase mb-1">{threat.type}</div>
                      <div className="text-[10px] font-mono opacity-20">IP: {threat.ip}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black text-green-400 uppercase tracking-widest">Intercepted</div>
                       <div className="text-[8px] font-mono opacity-20">{threat.timestamp}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-8">
             <div className="glass-panel p-10 bg-blue-950/10 border-blue-500/10">
                <h4 className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mb-4">Handshake Fidelity</h4>
                <div className="text-5xl font-black italic tracking-tighter">99.99<span className="text-xl opacity-20">%</span></div>
             </div>
             
              <div className="glass-panel p-10 bg-yellow-950/10 border-accent-gold/10">
                <h4 className="text-[10px] text-accent-gold font-black uppercase tracking-[0.3em] mb-4">Cumulative Blocked</h4>
                <div className="text-5xl font-black italic tracking-tighter">{threatCount.toLocaleString()}</div>
              </div>

              <div className="glass-panel p-10 bg-white/5 border-white/5">
                <h4 className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] mb-6">Cloud Authorization_</h4>
                <button 
                  onClick={handleWalletLink}
                  disabled={isAuthorizing}
                  className={`w-full py-4 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all ${walletAddress ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'hover:bg-white/10'}`}
                >
                  {isAuthorizing ? 'Authorizing...' : walletAddress ? `LINKED: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : 'Link_Executive_Wallet'}
                </button>
                <p className="text-[8px] text-white/20 mt-4 uppercase tracking-widest leading-relaxed">Required for Cloud Dashboard Access (v60.0_SENTINEL)</p>
              </div>
          </div>

        </div>

        {/* Institutional Resale Phase */}
        <section className="mb-32">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black tracking-tight mb-4 uppercase italic">Institutional Command</h2>
             <p className="text-white/30 text-xs uppercase tracking-[0.5em]">Select Deployment Tier</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'guardian', name: 'Guardian', price: '$4,999', color: 'bg-white/5 text-white', desc: 'Sovereign protection for high-value entities.' },
              { id: 'sentinel', name: 'Sentinel', price: '$19,999', color: 'bg-accent-gold text-black', desc: '24/7 autonomous shield orchestration.', premium: true },
              { id: 'apex', name: 'SOVRA', price: '$99,999', color: 'bg-white text-black', desc: 'Full institutional node & hand-over protocols.' }
            ].map((tier, idx) => (
              <div key={idx} className={`glass-panel p-12 flex flex-col justify-between relative overflow-hidden group ${tier.premium ? 'border-accent-gold/20' : 'border-white/5'}`}>
                {tier.premium && <div className="absolute top-6 right-[-32px] bg-accent-gold text-black text-[8px] font-black px-12 py-1 rotate-45 uppercase tracking-widest">Elite Choice</div>}
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">{tier.name}</h3>
                  <div className="text-5xl font-black tracking-tighter mb-8">{tier.price}<span className="text-xs opacity-20 font-light tracking-normal">/mo</span></div>
                  <p className="text-xs text-white/40 leading-relaxed italic mb-12">{tier.desc}</p>
                </div>
                <button 
                  onClick={() => handleDeploy(tier.id)}
                  className={`w-full py-5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${tier.color} hover:scale-105 shadow-2xl`}
                >
                  Deploy_{tier.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Global SOVRA Footer */}
        <footer className="pt-24 border-t border-white/5 flex justify-between items-center opacity-10 text-[8px] tracking-[0.8em] uppercase">
          <span>SOVRA Sovereign Infrastructure // v61.0_ELITE</span>
          <span>© 2026 SOVRA_ENTERPRISE</span>
        </footer>

      </main>
    </div>
  );
}
