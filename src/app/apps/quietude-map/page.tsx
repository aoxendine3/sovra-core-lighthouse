'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { Map, Zap, Info, Shield, Compass, Heart } from 'lucide-react';

export default function QuietudeMapPage() {
  const stats = [
    { label: 'Silent Nodes', value: '128K', icon: <Compass size={10} /> },
    { label: 'Tourist Filter', value: 'ENABLED', icon: <Shield size={10} /> },
    { label: 'Zen Score', value: '4.9/5', icon: <Heart size={10} /> }
  ];

  const features = [
    {
      title: 'Real-Time Noise Aura',
      desc: 'Live noise telemetry data used to map the most silent and peaceful hidden gems in any city.',
      icon: <Info size={20} />
    },
    {
      title: 'Anti-Traffic Logic',
      desc: 'Algorithms that intentionally route you away from tourist-dense nodes to preserve local culture.',
      icon: <Map size={20} />
    },
    {
      title: 'Hidden Handshake',
      desc: 'Unlock exclusive local nodes verified by the community to ensure zero tourist-trap ingress.',
      icon: <Zap size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Quietude Map"
      category="TRAVEL // CULTURE"
      description="The definitive anti-tourist travel guide. Mapping real-time quietude and hidden local nodes using sophisticated noise telemetry and local verification."
      heroImage="/assets/apps/quietude-map.png"
      stats={stats}
      features={features}
      ctaText="Find Silence"
      tranchePrice="$14.99 / Year"
    />
  );
}
