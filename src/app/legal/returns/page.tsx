import React from 'react';
import { ShieldCheck, ArrowLeft, RefreshCcw } from 'lucide-react';

export const metadata = {
  title: "Returns & Refund Policy | SOVRA Sovereign",
  description: "Institutional guidelines for asset reversals and credit tranches."
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-24 selection:bg-cyan-500/30 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6">
           <a href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Terminal
           </a>
           <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
              Returns & Refunds
           </h1>
           <p className="text-secondary uppercase tracking-[0.5em] text-[10px] opacity-40">Protocol: SOVRA_LEGAL_V1.0</p>
        </header>

        <main className="glass-panel p-12 rounded-[50px] border border-white/5 bg-white/[0.02] shadow-2xl relative z-10 backdrop-blur-xl">
           <div className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-white/60 max-w-none space-y-12">
              <section>
                 <h2 className="text-xl font-black uppercase tracking-widest text-white mb-4">1. Institutional Finality</h2>
                 <p>Due to the digital and intellectual nature of SOVRA Sovereign assets (eBooks, Software, Strategic Briefs), all sales are final upon delivery. Once a digital pulse is initiated and the asset is anchored to your infrastructure, reversal is technically and legally prohibited.</p>
              </section>

              <section>
                 <h2 className="text-xl font-black uppercase tracking-widest text-white mb-4">2. Technical Fault Resolution</h2>
                 <p>If an asset is verifiably corrupted or fails to initialize within your environment due to a manufacturing defect in the code, SOVRA Sovereign will issue a replacement pulse within 24 hours of reported fault.</p>
              </section>

              <section>
                 <h2 className="text-xl font-black uppercase tracking-widest text-white mb-4">3. Credit Tranches</h2>
                 <p>In exceptional cases of billing errors, a credit tranche will be applied to your account for future asset acquisition. No cash-out reversals are permitted under the Sovereign mandate.</p>
              </section>

              <div className="mt-20 p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-6">
                 <ShieldCheck className="w-8 h-8 text-cyan-500 flex-shrink-0" />
                 <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white mb-2">Institutional Verification</h3>
                    <p className="text-xs opacity-50">This policy is cryptographically bound to the SOVRA Sovereign LLC legal framework. Continuous auditing is performed by the Aegis Sentinel.</p>
                 </div>
              </div>
           </div>
        </main>

        <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-20 text-[9px] font-mono uppercase tracking-[0.4em]">
           <span>© 2026 SOVRA Sovereign LLC // Legal_Node</span>
           <span>Last Audit: 2026-04-24</span>
        </footer>
      </div>
    </div>
  );
}
