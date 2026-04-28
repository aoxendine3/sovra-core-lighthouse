'use client';

import React from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import { ExecutiveDashboard } from '@/components/dashboard/ExecutiveDashboard';

/**
 * INSTITUTIONAL SINGULARITY PAGE (v1.0)
 * 0.01% Standard Executive Orchestration
 */
export default function SingularityPage() {
  return (
    <SovereignLayout>
        <ExecutiveDashboard />
    </SovereignLayout>
  );
}
