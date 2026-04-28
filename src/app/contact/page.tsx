import React from 'react';
import { Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: "Institutional Contact | SOVRA Sovereign",
  description: "Secure communication pulse for the SOVRA Sovereign entity."
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-24 selection:bg-cyan-500/30 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6">
           <a href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Terminal
           </a>
           <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
              Contact Sovereign
           </h1>
           <p className="text-secondary uppercase tracking-[0.5em] text-[10px] opacity-40">Channel: SOVRA_SECURE_INGRESS</p>
        </header>

        <main className="glass-panel p-12 rounded-[50px] border border-white/5 bg-white/[0.02] shadow-2xl relative z-10 backdrop-blur-xl">
           <div className="space-y-12">
              <p className="text-xl font-medium text-white/80 leading-relaxed">
                 Institutional communication is strictly audited for operational security. 
                 For inquiries regarding asset tranches, credit reversals, or exascale integration support, initiate a pulse via the channel below.
              </p>

              <div className="flex flex-col md:flex-row gap-8">
                 <div className="flex-1 p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                    <Mail className="w-6 h-6 text-cyan-500" />
                    <h3 className="text-xs font-black uppercase tracking-widest">General Egress</h3>
                    <p className="text-lg font-mono text-cyan-400">support@sovra.sovereign</p>
                 </div>
                 
                 <div className="flex-1 p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4 opacity-50">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                    <h3 className="text-xs font-black uppercase tracking-widest">Institutional Audit</h3>
                    <p className="text-lg font-mono">legal@sovra.sovereign</p>
                 </div>
              </div>

              <div className="p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/10">
                 <p className="text-[10px] uppercase tracking-[0.3em] leading-loose text-cyan-500/60 font-black italic">
                    Note: Communication drift may occur during high-theta exascale operations. Expected response latency: &lt; 4.2 Hours.
                 </p>
              </div>
           </div>
        </main>

        <footer className="pt-20 border-t border-white/5 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.4em]">
           <span>SOVRA Sovereign LLC // Operational Integrity</span>
        </footer>
      </div>
    </div>
  );
}
