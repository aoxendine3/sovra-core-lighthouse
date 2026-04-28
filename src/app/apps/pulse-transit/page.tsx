'use client';

import React from 'react';
import AppLandingTemplate from '@/components/layout/AppLandingTemplate';
import { Map, Zap, Signal, Users, Compass, Truck } from 'lucide-react';

export default function PulseTransitPage() {
  const stats = [
    { label: 'Active Beacons', value: '12K', icon: <Signal size={10} /> },
    { label: 'Routes Mapped', value: '450', icon: <Compass size={10} /> },
    { label: 'Reliability', value: '94%', icon: <Zap size={10} /> }
  ];

  const features = [
    {
      title: 'Crowdsourced GPS',
      desc: 'Passive location beaconing from passengers using the route to provide real-time GPS tracking for those waiting at nodes.',
      icon: <Map size={20} />
    },
    {
      title: 'Wait-Time Prediction',
      desc: 'Social verification algorithms that calculate average wait-times even in areas with zero digital transit infrastructure.',
      icon: <Users size={20} />
    },
    {
      title: 'Route Optimizer',
      desc: 'Dynamic re-routing for local rural haulers to maximize passenger pick-up and reduce fuel tranches.',
      icon: <Truck size={20} />
    }
  ];

  return (
    <AppLandingTemplate 
      title="Pulse Transit"
      category="LOGISTICS // RURAL_COMMUNITY"
      description="The definitive crowdsourced rural transit solution. Turning every passenger into a real-time GPS beacon to eliminate wait-times in remote areas."
      heroImage="/assets/apps/pulse-transit.png"
      stats={stats}
      features={features}
      ctaText="Locate My Bus"
      tranchePrice="$0.00 / Free Tier"
    />
  );
}
