'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { Camera, Zap, Image, Sun, Calendar, TrendingUp } from 'lucide-react';

export default function WardrobeAiPage() {
  const stats = [
    { label: 'Outfits Generated', value: '4.2M', icon: <Zap size={10} /> },
    { label: 'Closets Scanned', value: '85K', icon: <Camera size={10} /> },
    { label: 'Trend Score', value: 'A+', icon: <TrendingUp size={10} /> }
  ];

  const features = [
    {
      title: 'Actual Inventory Sync',
      desc: 'Scan your actual closet tranches to build a digital twin of your wardrobe for AI-driven outfit composition.',
      icon: <Image size={20} />
    },
    {
      title: 'Weather-Event HUD',
      desc: 'Automatic outfit suggestions that sync with local weather forecasts and your digital calendar events.',
      icon: <Sun size={20} />
    },
    {
      title: 'Color Theory Engine',
      desc: 'Proprietary chromatic matching algorithms to ensure every suggested outfit is institutional-grade perfection.',
      icon: <Calendar size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Vibe Closet"
      category="AI // FASHION"
      description="The definitive AI wardrobe architect. Syncing your actual closet tranches with weather, event, and trend telemetry for absolute fashion finality."
      heroImage="/assets/apps/wardrobe-ai.png"
      stats={stats}
      features={features}
      ctaText="Scan My Closet"
      tranchePrice="$19 / Month"
    />
  );
}
