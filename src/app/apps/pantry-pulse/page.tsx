'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { ShoppingCart, Zap, RefreshCw, Smartphone, BarChart, CheckCircle } from 'lucide-react';

export default function PantryPulsePage() {
  const stats = [
    { label: 'Meals Optimised', value: '1.2M', icon: <Zap size={10} /> },
    { label: 'Zero-Waste Nodes', value: '45K', icon: <CheckCircle size={10} /> },
    { label: 'Sia-Link Sync', value: '100/100', icon: <Smartphone size={10} /> }
  ];

  const features = [
    {
      title: 'Freshness Ring Logic',
      desc: 'Visual telemetry indicating the real-time expiry and quality of every item in your pantry tranches.',
      icon: <BarChart size={20} />
    },
    {
      title: 'Autonomous Re-Fill',
      desc: 'AI-driven logistics that automatically restocks essentials exactly when you target the floor threshold.',
      icon: <ShoppingCart size={20} />
    },
    {
      title: 'Inverse Recipe Sync',
      desc: 'Generating high-theta recipes based exclusively on what is currently about to expire, minimizing waste tranches.',
      icon: <RefreshCw size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Pantry Pulse"
      category="AI // LOGISTICS"
      description="The definitive pantry management system. Using 'Freshness Ring' telemetry and autonomous restocking logic to achieve absolute kitchen sovereignty."
      heroImage="/assets/apps/pantry-pulse.png"
      stats={stats}
      features={features}
      ctaText="Optimize Pantry"
      tranchePrice="$29 / Month"
    />
  );
}
