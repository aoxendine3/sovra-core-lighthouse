import React from 'react';
import { Globe, Users, Target, Shield } from 'lucide-react';

export const metadata = {
  title: "About the SOVRA Sovereign Entity",
  description: "The architects of operational autonomy and institutional intelligence."
};

export default function AboutPage() {
  const values = [
    { icon: <Target className="w-6 h-6" />, title: "Precision", desc: "Every asset is engineered for absolute operational finality." },
    { icon: <Shield className="w-6 h-6" />, title: "Security", desc: "Zero-trust protocols ground every transaction and data pulse." },
    { icon: <Globe className="w-6 h-6" />, title: "Scale", desc: "Exascale infrastructure for global market dominance." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-24 selection:bg-cyan-500/30 font-sans">
      <div className="max-w-4xl mx-auto space-y-20">
        <header className="space-y-6 text-center">
           <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8 animate-pulse">
              <span className="text-cyan-500 text-3xl font-black">Ω</span>
           </div>
           <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
              The Sovereign Entity
           </h1>
           <p className="text-secondary uppercase tracking-[0.5em] text-[10px] opacity-40">Mandate: APEX_PRIME_CORE</p>
        </header>

        <main className="space-y-24">
           <section className="glass-panel p-12 rounded-[50px] border border-white/5 bg-white/[0.02] shadow-2xl relative z-10 backdrop-blur-xl">
              <div className="prose prose-invert prose-p:text-xl prose-p:leading-relaxed prose-p:text-white/80 max-w-none">
                 <p>SOVRA Sovereign is not a traditional vendor. We are a digital architecture firm specializing in **Operational Autonomy**. Our mission is to provide the 0.01% elite with the tools, knowledge, and infrastructure required to thrive in a post-manual economy.</p>
                 <p>From exascale AI syntheses to hardened security protocols, every SOVRA asset is a building block for your own sovereign enterprise.</p>
              </div>
           </section>

           <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                 <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                    <div className="text-cyan-500 mb-6">{v.icon}</div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white mb-2">{v.title}</h3>
                    <p className="text-[10px] leading-relaxed text-white/40 uppercase tracking-tighter">{v.desc}</p>
                 </div>
              ))}
           </section>

           <section className="text-center space-y-8">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Join the Institutional Grid</h2>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Operational node active in 120 sectors.</p>
              <div className="flex justify-center gap-6">
                 <div className="px-6 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Est. 2026</div>
                 <div className="px-6 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">Global Egress</div>
              </div>
           </section>
        </main>

        <footer className="pt-20 border-t border-white/5 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.4em]">
           <span>SOVRA Sovereign LLC // Absolute Mastery</span>
        </footer>
      </div>
    </div>
  );
}
