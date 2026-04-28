'use client';

import React, { useState } from 'react';
import MT4PredictiveTerminal from '../../components/terminal/MT4PredictiveTerminal';

export default function TerminalGateway() {
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);

  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLeadCaptured(true);
    // CRMAgent.processTerminalLeads() will be triggered via kernel heartbeat
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-[#cd9d3f]/30">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .hero-glow { background: radial-gradient(circle at center, rgba(205, 157, 63, 0.1) 0%, transparent 70%); }
        .surgical-border { border: 1px solid rgba(255, 255, 255, 0.1); }
      `}} />

      {/* Conversion Section */}
      <section className="relative pt-24 pb-12 hero-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic leading-none">
            Institutional DeFi Security <br/>
            <span className="text-[#cd9d3f]">at 100x Intuition.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-medium tracking-tight">
            The SOVRA Neural Terminal (v15.0_Ω) is the first intent-aware trading node engineered for $3.5T institutional prime brokerage. Front-run liquidity crunches with 94.2% confidence.
          </p>

          {!isLeadCaptured ? (
            <div className="max-w-md mx-auto p-1 bg-gradient-to-r from-[#cd9d3f]/50 to-[#ffdfa1]/50 rounded-xl">
              <form onSubmit={handleCapture} className="bg-[#0a0a0a] p-8 rounded-xl surgical-border">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-[#cd9d3f]">Request Institutional Access</h3>
                <input 
                  type="email" 
                  placeholder="executive@institutional-firm.com" 
                  className="w-full bg-black border border-white/10 p-4 rounded-lg mb-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#cd9d3f] transition-all font-mono"
                  required
                />
                <button className="w-full bg-white text-black py-4 rounded-lg font-black uppercase tracking-widest hover:bg-[#cd9d3f] hover:text-black transition-all">
                  Download Apex Audit Node
                </button>
                <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-tighter">
                  By clicking, you initiate a SOVRA-secured handshake for non-custodial asset mastery.
                </p>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-[#cd9d3f]/10 border border-[#cd9d3f]/50 p-12 rounded-xl text-center">
              <div className="w-16 h-16 bg-[#cd9d3f] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2">Alpha Restored.</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">Apex Institutional Audit download initiated.</p>
              <p className="text-xs text-[#cd9d3f] font-mono">Redirecting to Neural Core [SOVRA_v15.0]...</p>
            </div>
          )}
        </div>
      </section>

      {/* Terminal Preview Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surgical-border bg-[#050505] rounded-2xl shadow-2xl shadow-[#cd9d3f]/10 overflow-hidden">
            <div className="p-2 bg-white/5 border-b border-white/5 flex gap-1.5 px-6">
               <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
               <span className="ml-4 text-[10px] text-gray-500 uppercase tracking-widest font-black italic">Live Terminal Preview: SOVRA_v15.node</span>
            </div>
            <div className="scale-95 origin-top transition-all hover:scale-100 duration-700">
                <MT4PredictiveTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 bg-[#020202] text-center">
         <p className="text-[10px] text-gray-700 uppercase tracking-[0.4em] font-black">
           Sovereign Node: SOVRA SE | Intelligence: 100x Intuition | Status: Live Fire
         </p>
      </footer>
    </main>
  );
}
