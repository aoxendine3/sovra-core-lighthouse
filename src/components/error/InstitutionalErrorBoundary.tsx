'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class InstitutionalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[InstitutionalErrorBoundary] CRITICAL_UI_FAULT:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[400px] glass-apex p-12 text-center"
        >
          <div className="w-16 h-16 bg-alert-red/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-alert-red text-2xl font-black">!</span>
          </div>
          <h2 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Component Isolation Active</h2>
          <p className="text-silver-institutional/60 text-sm max-w-md mb-8">
            An institutional fault has been detected in this tranche. The error has been isolated to prevent global system failure.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-8 py-3 bg-cyan-glow text-black font-black uppercase text-[10px] rounded-lg tactile-hover"
          >
            Attempt Reconciliation
          </button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}
