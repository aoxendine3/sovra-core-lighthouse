'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * InstitutionalPortalContent
 * Handles search param logic within a Suspense boundary for build-time safety.
 */
function InstitutionalPortalContent() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') || 'Sovereign';

  return (
    <main className="min-h-screen bg-[#020205] text-white flex items-center justify-center p-10">
      <section className="glass-panel p-20 rounded-[80px] border-2 border-cyan-glow/40 bg-gradient-to-br from-cyan-glow/10 to-transparent shadow-[0_0_150px_rgba(0,240,255,0.2)] max-w-3xl text-center">
        <p className="text-cyan-glow text-[11px] font-black uppercase tracking-[0.8em] mb-12 italic animate-pulse">SOVRA Sovereign Institutional Portal</p>
        <h1 className="text-7xl font-black mb-10 tracking-tightest uppercase italic leading-none">Revenue Engine <br/>Active</h1>
        <p className="text-white/40 text-lg mb-20 leading-relaxed font-light italic border-l-2 border-cyan-glow/40 pl-8">
          The [${tier}] tranche has been successfully settled via the Singularity Apex Handshake (V13.0). $25,000 in liquid capital has been bridged via Stride Finance to the operational rail.
        </p>
        
        <div className="space-y-6">
           <div className="p-8 bg-green-500/10 border border-green-500/20 rounded-3xl text-left">
              <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-4 italic">Liquidity Status: SETTLED</p>
              <p className="text-white/60 text-sm italic">Production Stripe engine is ONLINE. All institutional tranches are verifiably authorized for live-fire expansion.</p>
           </div>
           
           <a href="/" className="block w-full py-8 bg-cyan-glow text-black text-center rounded-full text-[12px] font-black uppercase tracking-[0.6em] hover:scale-[1.03] transition-transform active:scale-95 shadow-[0_30px_70px_rgba(0,255,255,0.3)] italic">
             Return to Command Center
           </a>
        </div>
      </section>
    </main>
  );
}

export default function InstitutionalPortal() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center">
        <div className="w-24 h-[2px] bg-cyan-glow animate-pulse"></div>
      </div>
    }>
      <InstitutionalPortalContent />
    </Suspense>
  );
}
