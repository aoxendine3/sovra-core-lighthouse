import React from 'react';

/**
 * SOVRA Sovereign Ad Landing Page (v2.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * MISSION: AD_SATURATION_DOMINANCE
 * Style: Deep Obsidian + Gold Glow (Institutional Luxury)
 */
export default function SOVRAAdPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-[#cd9d3f] selection:text-black">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
      
      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-block px-4 py-1 border border-[#cd9d3f]/30 rounded-full text-[#cd9d3f] text-[10px] tracking-[0.4em] uppercase font-mono mb-8 animate-pulse">
          Limited Launch Window: 24 Hours Remaining
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 bg-gradient-to-b from-white to-[#555] bg-clip-text text-transparent">
          The Pain of <br /> Uncertainty Ends
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-white/50 mb-12">
          Most founders lose $500–$1,000 every month in bad decisions and wasted time. 
          Get one clear, cryptographically signed executive mandate distilled from 24 raw inputs.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <a 
            href="https://buy.stripe.com/cNibJ1con9cE6TU8ELa3u07" 
            className="group relative px-10 py-5 bg-[#cd9d3f] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all duration-500 shadow-[0_20px_40px_rgba(205,157,63,0.2)]"
          >
            Initialize Mandate ($79)
            <div className="absolute inset-0 rounded-full group-hover:scale-110 group-hover:opacity-0 transition-all duration-500 bg-[#cd9d3f]/50"></div>
          </a>
          <a 
            href="https://buy.stripe.com/28EeVd887bkMdii3kra3u08" 
            className="px-10 py-5 border border-[#cd9d3f]/30 text-[#cd9d3f] font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#cd9d3f]/10 transition-all duration-500"
          >
            3-Mandate Pack ($199)
          </a>
        </div>

        {/* Behavioral Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase">
            <span className="text-[#cd9d3f]">✓</span> 100% Clarity Guarantee
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase">
            <span className="text-[#cd9d3f]">✓</span> On-Chain Verified
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-red-500">
            Only 7 slots left at launch pricing
          </div>
        </div>
      </main>

      {/* Comparison Grid */}
      <section className="container mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid md:grid-columns-3 gap-12">
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#cd9d3f]/50 transition-all">
            <div className="text-[10px] font-mono text-[#cd9d3f] mb-6 tracking-widest uppercase">24 → 12 → 7 → 3 → 1</div>
            <h3 className="text-xl font-bold uppercase mb-4">Pyramidal Distillation</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              We don't "chat." We compress high-entropy market sours into single, signed commands.
            </p>
          </div>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#cd9d3f]/50 transition-all">
            <div className="text-[10px] font-mono text-[#cd9d3f] mb-6 tracking-widest uppercase">A2A_SWARM_HEALING</div>
            <h3 className="text-xl font-bold uppercase mb-4">Autonomous Healing</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Every failure mode is detected and repaired in sub-second cycles via the Healing Pulse.
            </p>
          </div>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#cd9d3f]/50 transition-all">
            <div className="text-[10px] font-mono text-[#cd9d3f] mb-6 tracking-widest uppercase">ED25519_VERIFIED</div>
            <h3 className="text-xl font-bold uppercase mb-4">On-Chain Ledger</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Every mandate is cryptographically anchored on Base and Solana. Publicly verifiable.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/5 opacity-20 text-[10px] tracking-[0.5em] uppercase font-mono">
        © 2026 SOVRA SOVEREIGN | INSTITUTIONAL INTELLIGENCE
      </footer>
    </div>
  );
}
