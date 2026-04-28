'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { Coffee, ShieldCheck, Video, Truck, Users, Star } from 'lucide-react';

export default function P2PKitchenPage() {
  const stats = [
    { label: 'Verified Chefs', value: '8.4K', icon: <Users size={10} /> },
    { label: 'Hygiene Score', value: '100/100', icon: <ShieldCheck size={10} /> },
    { label: 'Avg Delivery', value: '18m', icon: <Truck size={10} /> }
  ];

  const features = [
    {
      title: 'Live Hygiene Feed',
      desc: 'Real-time video transparency of your neighbors kitchen. Verify sanitation and technique before you order.',
      icon: <Video size={20} />
    },
    {
      title: 'Home-Grown Ingredients',
      desc: 'Dedicated filtering for hyper-local ingredients sourced from within your own community nodes.',
      icon: <Coffee size={20} />
    },
    {
      title: 'Social Dining Table',
      desc: 'Join digital dining rooms with other neighbors ordering from the same kitchen to build community.',
      icon: <Star size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="P2P Kitchen"
      category="E-COM // LOCAL_FOOD"
      description="The definitive peer-to-peer home cooked delivery network. Connecting authentic home chefs with neighbors via live hygiene transparency feeds."
      heroImage="/assets/apps/p2p-kitchen.png"
      stats={stats}
      features={features}
      ctaText="Order Fresh"
      tranchePrice="$1.99 / Delivery"
    />
  );
}
