'use client';

export async function generateStaticParams() {
  return [{ slug: 'SOVRA_APEX-alpha' }];
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { generateHandshakeHeaders } from '@/lib/auth/HandshakeClient';
import { ShieldCheck, Globe, Zap, Lock, ShoppingCart } from 'lucide-react';

export default function AdLandingPage() {
  const { slug } = useParams();
  const [adData, setAdData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const headers = await generateHandshakeHeaders();
        const res = await fetch(`/api/sovereign?handle=${slug}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setAdData(data.product);
        }
      } catch (e) {
        console.error('[AdLanding] Data Sync Fail');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center gap-6">
       <div className="w-12 h-12 rounded-2xl border-2 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
       <div className="text-cyan-500 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Decrypting Sovereign Signal...</div>
    </div>
  );

  if (!adData) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-8">
       <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">Institutional Fault: Asset Not Found</h1>
       <p className="text-white/40 text-xs uppercase tracking-widest">The requested product node is not verifiably grounded in the Sovereign Ledger.</p>
       <a href="/" className="mt-12 px-8 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5">Return to Terminal</a>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background FX */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(0,240,255,0.1),_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_rgba(167,139,250,0.1),_transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Visual Asset Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
              <img src={adData.image} alt={adData.name} className="w-full aspect-[4/5] object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
            
            {/* Status Pulse */}
            <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Node: {adData.status}</span>
              </div>
            </div>
          </div>

          {/* Copy & Conversion Section */}
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 opacity-40">
                 <Lock className="w-3 h-3" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em]">Institutional Asset // {adData.category}</p>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-tight uppercase italic">
                {adData.name.split(':')[0]} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{adData.name.split(':')[1] || ''}</span>
              </h1>
            </div>

            <p className="text-xl text-white/70 leading-relaxed font-medium">
              {adData.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-baseline gap-4">
                 <span className="text-4xl font-black italic">${adData.price}</span>
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-30 line-through">$199.99</span>
                 <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black uppercase text-cyan-500">75% Institutional Credit Applied</span>
              </div>

              <div className="space-y-4">
                 <a 
                   href={`https://sovra-15.myshopify.com/products/${slug}`}
                   target="_blank"
                   className="flex items-center justify-center gap-4 w-full py-6 bg-white text-black font-black uppercase text-sm tracking-[0.3em] rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,240,255,0.2)] hover:bg-cyan-400 transition-all group"
                 >
                   <ShoppingCart className="w-4 h-4" />
                   Secure Asset Ingress
                 </a>
                 <p className="text-center text-[9px] font-mono text-white/20 uppercase tracking-widest">Encrypted SSL Transfer // Shopify Secured Checkout</p>
              </div>
            </div>

            {/* Platform Metrics */}
            <div className="pt-12 border-t border-white/5 grid grid-cols-3 gap-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Ingress</p>
                  <p className="text-xs font-bold text-cyan-500">85K+</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Status</p>
                  <p className="text-xs font-bold text-white">Active</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Security</p>
                  <p className="text-xs font-bold text-white">Handshake_v1</p>
               </div>
            </div>
          </div>

            {/* Social Proof Signal */}
            <div className="pt-10 border-t border-white/5 flex items-center gap-8">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/20">U{i}</div>
                  ))}
               </div>
               <p className="text-xs font-bold text-white/40 tracking-tight">Join 85,000+ creators engineering their financial independence.</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
        }
      `}</style>
    </main>
  );
}
