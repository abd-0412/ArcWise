'use client';

import React from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import DemoControls from '@/components/common/DemoControls';
import { ShieldAlert, ZapOff, Cpu, AlertTriangle, ArrowRight } from 'lucide-react';
import { SafetyState } from '@/types/arcwise';

export default function SafetyPage() {
  const { health, system } = useArcwise();

  if (!health || !system) return null;

  const getSafetyConfig = (state: SafetyState) => {
    switch(state) {
      case 'SAFE': return { color: 'bg-healthy/10 text-healthy-dark border-healthy/20', icon: ShieldAlert };
      case 'MONITOR': return { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: ShieldAlert };
      case 'WARNING': return { color: 'bg-warning/10 text-warning-dark border-warning/20', icon: AlertTriangle };
      case 'HIGH_RISK': return { color: 'bg-orange-100 text-orange-800 border-orange-300', icon: AlertTriangle };
      case 'CRITICAL': return { color: 'bg-danger/10 text-danger-dark border-danger/20', icon: ZapOff };
    }
  };

  const safetyConfig = getSafetyConfig(system.safetyState);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900">Safety & Interception</h1>
        <p className="text-sm text-slate-500 mt-1">Simulated load isolation and ARCWISE intervention decision engine</p>
      </div>

      <DemoControls />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-xl border p-6 flex flex-col justify-center items-center text-center transition-colors duration-500 ${safetyConfig.color}`}>
          <safetyConfig.icon className="w-16 h-16 mb-4" />
          <h2 className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">Safety Status</h2>
          <div className="text-4xl font-bold tracking-tighter mb-2">{system.safetyState.replace('_', ' ')}</div>
          <p className="text-sm font-medium opacity-90 max-w-sm">
            {system.safetyState === 'SAFE' && 'Contact condition is within the configured healthy operating range.'}
            {system.safetyState === 'MONITOR' && 'Early degradation indicators detected. Continue monitoring.'}
            {system.safetyState === 'WARNING' && 'Repeated abnormal contact behaviour detected. Maintenance inspection recommended.'}
            {system.safetyState === 'HIGH_RISK' && 'PRE-ARC RISK DETECTED. Action: WARNING ISSUED.'}
            {system.safetyState === 'CRITICAL' && 'CRITICAL CONDITION. LOAD HAS BEEN ISOLATED.'}
          </p>
        </div>

        <div className="bg-brand-900 rounded-xl border border-brand-800 p-6 flex flex-col justify-center text-white shadow-lg">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-400 mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5" /> Simulated Interception Hardware
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-brand-300 text-sm mb-1">SSR Status — Simulation</div>
              <div className={`text-3xl font-bold ${system.ssrStatus === 'ON' ? 'text-green-400' : 'text-danger'}`}>
                {system.ssrStatus}
              </div>
            </div>
            <div>
              <div className="text-brand-300 text-sm mb-1">Load Status</div>
              <div className={`text-3xl font-bold ${system.loadStatus === 'CONNECTED' ? 'text-white' : 'text-danger'}`}>
                {system.loadStatus}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-800">
            <div className="text-brand-300 text-sm mb-1">Last Intervention Action</div>
            <div className="text-lg font-semibold">{system.latestAction}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <h3 className="font-semibold text-brand-900 mb-6">Safety State Machine</h3>
        <div className="flex items-center min-w-[600px] justify-between text-sm font-medium">
          {['NORMAL', 'EARLY_DEGRADATION', 'UNSTABLE_CONTACT', 'PRE_ARC_RISK', 'CRITICAL'].map((state, index, arr) => (
            <React.Fragment key={state}>
              <div className={`flex flex-col items-center gap-2 ${health.state === state ? 'text-brand-900 scale-110 font-bold' : 'text-slate-400'}`}>
                <div className={`w-4 h-4 rounded-full border-2 ${health.state === state ? 'bg-brand-500 border-brand-500' : 'border-slate-300 bg-white'}`} />
                {state.replace(/_/g, ' ')}
              </div>
              {index < arr.length - 1 && (
                <div className="flex-1 mx-2 relative">
                  <div className="h-0.5 bg-slate-200 w-full" />
                  <ArrowRight className="w-4 h-4 text-slate-300 absolute -top-1.5 right-0" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
