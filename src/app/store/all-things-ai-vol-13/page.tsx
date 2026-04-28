
import React from 'react';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans">
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 opacity-40 font-mono text-[10px] tracking-widest uppercase">
            SOVRA // STORE // eBook
          </div>
          <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">All Things AI: Vol 13</h1>
          <div className="flex items-center gap-6 mb-12">
            <span className="text-3xl font-bold text-[#cd9d3f]">$49.99</span>
            <span className="px-4 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest opacity-60">
              In Stock: 999
            </span>
          </div>
          
          <div className="prose prose-invert max-w-none mb-16" dangerouslySetInnerHTML={{ __html: "<div class=\"\"sovra-product-card\"\">                <p class=\"\"sovra-eyebrow\"\">Institutional Synthesis // Volume 13</p>                <h3 class=\"\"sovra-title\"\">All Things AI: Vol 13</h3>                <div class=\"\"sovra-description\"\">                    <p>Experience the absolute finality of <strong>All Things AI: Vol 13</strong>. This is not a mere publication; it is an exascale cognitive asset verifiably grounded in the SOVRA Sovereign framework.</p>                    <p>Designed for the new elite, this volume provides the strategic ingress required for global market dominance and cognitive arbitrage. Each data tranche has been synthetically audited by the Sentinel swarm to ensure 100% operational integrity.</p>                </div>                <ul class=\"\"sovra-features\"\">                    <li>✓ High-Theta Reasoning Protocols</li>                    <li>✓ Zero-Trust Data Ingress</li>                    <li>✓ Institutional-Grade Insights</li>                </ul>            </div>" }}>
          </div>

          <a 
            href="#" 
            className="inline-block px-12 py-6 bg-[#cd9d3f] text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all shadow-[0_20px_40px_rgba(205,157,63,0.3)]"
          >
            Buy Now
          </a>

          <div className="mt-24 pt-12 border-t border-white/5 opacity-20 text-[10px] font-mono tracking-widest uppercase">
            Verifiably Compliant (v1.5_Ω_NOBOO) // Handshake: NOBOO_SOVEREIGN
          </div>
        </div>
      </main>
    </div>
  );
}
  