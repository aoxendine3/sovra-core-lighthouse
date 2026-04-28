'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { Truck, Cpu, Recycle, ArrowRight, DollarSign, Package } from 'lucide-react';

export default function SecondLifePage() {
  const stats = [
    { label: 'Items Upcycled', value: '840K', icon: <Recycle size={10} /> },
    { label: 'Hauler Network', value: '12K', icon: <Truck size={10} /> },
    { label: 'Resale Value', value: '$2.4M', icon: <DollarSign size={10} /> }
  ];

  const features = [
    {
      title: 'AI Value ID',
      desc: 'Scan bulky items with AI to instantly identify repurposing potential and estimated resale value.',
      icon: <Cpu size={20} />
    },
    {
      title: 'Repurposing Network',
      desc: 'Connecting you with professional upcyclers and artists who turn your trash into institutional assets.',
      icon: <Package size={20} />
    },
    {
      title: 'Zero-Waste Routing',
      desc: 'Optimized logistics to ensure every collected item avoids the landfill and enters the circular economy.',
      icon: <ArrowRight size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Second Life"
      category="SAAS // UTILITY"
      description="The definitive 'Uber for Junk'. Weaponizing AI to identify repurposing value and route bulky items to local upcycling nodes for maximum sustainability."
      heroImage="/assets/apps/second-life.png"
      stats={stats}
      features={features}
      ctaText="Bust My Junk"
      tranchePrice="$49 / Collection"
    />
  );
}
