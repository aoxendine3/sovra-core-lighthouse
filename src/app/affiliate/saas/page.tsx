'use client';
import React from 'react';
import { Shield, Zap, TrendingUp } from 'lucide-react';

export default function SAASPage() {
  return (
    <div className="min-h-screen bg-obsidian text-platinum p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex items-center gap-4">
          <Shield className="w-12 h-12 text-emerald-bright" />
          <h1 className="text-5xl serif-sia_core">HubSpot Enterprise CRM</h1>
        </header>
        
        <div className="glass-apex p-12 space-y-8">
          <p className="text-2xl text-platinum/70 leading-relaxed font-bold italic">
            "Empire Builders Trust the Architect of Business Excellence: Elevate Your Legacy with HubSpot Enterprise CRM."
          </p>
          
          <div className="flex justify-center">
            <a 
              href="/api/track?url=https://www.hubspot.com/partners/affiliates&source=CJ_SCALING_PULSE"
              className="px-12 py-6 bg-sia_core-gold text-obsidian font-black uppercase tracking-[0.5em] rounded-full hover:scale-110 transition-transform shadow-mesh"
            >
              Secure Institutional Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}