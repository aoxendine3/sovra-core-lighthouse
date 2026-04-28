import React from 'react';
import { ShieldCheck, TrendingUp, Lock } from 'lucide-react';

export const metadata = {
  title: 'CrowdStrike Falcon Enterprise - Enterprise Deployment | SOVRA',
  description: 'Institutional analysis and deployment architecture for CrowdStrike Falcon Enterprise.'
};

export default function AffiliateNodePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8 md:p-24 selection:bg-amber-500/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Verifiably Compliant (v1.0_SOVRA)</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">
              CrowdStrike Falcon Enterprise
           </h1>
           <p className="text-sm font-mono text-white/40 uppercase tracking-widest border-l-2 border-amber-500 pl-4">
              Category: cybersecurity | Target Yield: $1,500
           </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-8">
              <div className="glass-panel p-10 rounded-[40px] border border-white/5 bg-white/[0.02] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full" />
                 <h2 className="text-sm font-black text-white/60 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Institutional Intelligence Report</h2>
                 <div className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-white/70 max-w-none">
                    <p>"Falcon Enterprise: The Paragon of Operational Velocity and Unyielding Security in the Modern Threat Landscape.<br/><br/>In an era where adversaries exploit vulnerabilities with unprecedented speed, Falcon Enterprise empowers organizations to maintain unwavering control. Leveraging cutting-edge AI-driven detection and advanced threat intelligence, this comprehensive solution provides unparalleled operational velocity, allowing teams to rapidly identify, respond, and remediate threats before they escalate.<br/><br/>With an unparalleled 99.9% accuracy rate for real-time threat detection, Falcon Enterprise ensures the unbreachable integrity of sensitive data. By integrating seamlessly with existing security infrastructure, this best-in-class solution enhances situational awareness, accelerates incident response, and fortifies the very fabric of modern cybersecurity."</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-8 rounded-[40px] border border-amber-500/20 bg-amber-500/[0.02] flex flex-col items-center text-center space-y-6 shadow-[0_0_50px_rgba(245,158,11,0.05)]">
                 <Lock className="w-12 h-12 text-amber-500" />
                 <div>
                    <h3 className="text-2xl font-black italic tracking-tight uppercase">Initiate Deployment</h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-2">Zero-Trust Routing Active</p>
                 </div>
                 
                 <div className="flex justify-between items-center w-full my-4 text-xs font-mono uppercase tracking-widest text-amber-500/70">
                   <span>Asset Quality:</span>
                   <div className="flex gap-2">
                     <a href={`/api/track?target=${encodeURIComponent('https://cj.com/link/cs-1001')}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=4k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">4K</a>
                     <a href={`/api/track?target=${encodeURIComponent('https://cj.com/link/cs-1001')}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=8k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">8K</a>
                     <a href={`/api/track?target=${encodeURIComponent("https://cj.com/link/cs-1001")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=4k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">4K</a>
                     <a href={`/api/track?target=${encodeURIComponent("https://cj.com/link/cs-1001")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=8k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">8K</a>
                     <a href={`/api/track?target=${encodeURIComponent("https://cj.com/link/cs-1001")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=12k`} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all">12K</a>
                   </div>
                 </div>

                 {/* This links to our Sovereign Tracking Proxy which then 302s to CJ Affiliate */}
                 <a 
                   href={`/api/track?target=${encodeURIComponent("https://cj.com/link/cs-1001")}&handshake=SOVRA_SOVEREIGN&category=AFFILIATE_NODE&q=default`}
                   className="w-full py-4 rounded-2xl bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                 >
                   Deploy Engine
                 </a>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}