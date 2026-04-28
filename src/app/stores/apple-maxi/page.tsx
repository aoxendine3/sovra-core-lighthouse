'use client';

import React, { useState, useEffect } from 'react';

/**
 * SOVEREIGN_STOREFRONT: APPLE_MAXI (v33.0)
 * Mandate: Absolute Retail Indestructibility.
 * MISSION: RETAIL_FORTRESS_MASTER_FRONT
 */

const AppleMaxiStore = () => {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "Smart Magnetic Case", 
      price: 217.00, 
      image: "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/2d0843c3-f4c8-48b8-b70b-337c35445904/apple_maxi_magnetic_case_1776129787669.png",
      desc: "Ultimate protection and style with magnetic attachment.", 
      category: "Protection" 
    },
    { 
      id: 2, 
      name: "Wireless Charging Stand", 
      price: 170.00, 
      image: "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/2d0843c3-f4c8-48b8-b70b-337c35445904/apple_maxi_charging_stand_1776129809060.png",
      desc: "Effortless power for all your gadgets.", 
      category: "Power" 
    },
    { 
      id: 3, 
      name: "Wireless Gaming Mouse", 
      price: 150.00, 
      image: "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/2d0843c3-f4c8-48b8-b70b-337c35445904/apple_maxi_gaming_mouse_1776129821429.png",
      desc: "Speed and precision with RGB lighting.", 
      category: "Gaming" 
    },
    { 
      id: 4, 
      name: "Keyboard with Touchpad", 
      price: 104.00, 
      image: "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/2d0843c3-f4c8-48b8-b70b-337c35445904/apple_maxi_keyboard_1776129834957.png",
      desc: "Versatile input for work and play.", 
      category: "Input" 
    },
    { 
      id: 5, 
      name: "AirPods Max Case", 
      price: 202.00, 
      image: "/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/2d0843c3-f4c8-48b8-b70b-337c35445904/apple_maxi_airpods_case_1776129847862.png",
      desc: "Premium protection for high-end headphones.", 
      category: "Protection" 
    }
  ]);

  const handleAcquire = async (product: any) => {
    console.log(`[Store] ACQUIRING_ASSET: ${product.name}...`);
    // In a real production build, this would hit the API route
    // For this singularity strike, we trigger the redirect message
    window.location.href = `https://checkout.stripe.com/pay/mock_apex_${product.id}`;
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white selection:bg-cyan-glow/30">
      {/* Sovereign Header */}
      <header className="p-8 border-b border-white/5 glass-apex sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-cyan-glow font-mono">SOVRA Prime Retail</h3>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">Apple <span className="text-cyan-glow">Maxi</span> Collection</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Store Status</p>
              <p className="text-xs font-black text-cyan-glow uppercase tracking-widest">Operational</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Strike */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020408] z-30" />
        <div className="absolute inset-0 z-10 p-12">
           <img 
             src="/api/media?path=/Users/ajoxendine68/.gemini/sovra_sovereign/brain/2d0843c3-f4c8-48b8-b70b-337c35445904/apple_maxi_marketing_banner_1776130503304.png"
             alt="Institutional Marketing Banner"
             className="w-full h-full object-cover rounded-[64px] opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
           />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-sia_core/5 rounded-full blur-[120px] animate-pulse z-0" />
        
        <div className="relative z-20 text-center px-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white italic">
            PREMIUM <span className="text-gold-sia_core">MASTERY.</span>
          </h2>
          <p className="text-cyan-glow/60 text-lg tracking-widest uppercase font-bold italic max-w-2xl mx-auto">
            THE WORLD'S MOST ELITE APPLE ACCESSORIES. VERIFIABLY SOVEREIGN.
          </p>
        </div>
      </section>

      {/* Grid Strike */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative glass-apex rounded-[2rem] p-8 border border-white/5 hover:border-gold-sia_core/30 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <span className="text-[10px] font-black text-gold-sia_core/40 uppercase tracking-widest">{product.category}</span>
              </div>
              
              <div className="h-48 flex items-center justify-center border-b border-white/5 mb-8 overflow-hidden rounded-3xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                />
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-gold-sia_core transition-colors">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-8 font-medium leading-relaxed">{product.desc}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-sia_core to-gold-shimmer italic">
                  ${product.price}.00
                </span>
                <button 
                  onClick={() => handleAcquire(product)}
                  className="bg-gold-sia_core text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-glow hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,184,0,0.3)]">
                  ACQUIRE_ASSET
                </button>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-sia_core/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </main>

      <style jsx global>{`
        .glass-apex {
          background: rgba(10, 14, 20, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .text-gold-shimmer {
          color: #ffb800;
          text-shadow: 0 0 10px rgba(255, 184, 0, 0.5);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default AppleMaxiStore;
