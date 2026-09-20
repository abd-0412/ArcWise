'use client';

import React from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import { Play, AlertTriangle, ZapOff, RotateCcw, Activity } from 'lucide-react';

export default function DemoControls() {
  const { actions, system } = useArcwise();
  
  if (!system) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="font-semibold text-brand-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-500" />
          Demo Control Panel
        </h3>
        <span className="text-xs font-medium px-2 py-1 bg-brand-100 text-brand-700 rounded-md">
          {system.operatingMode}
        </span>
      </div>
      
      <div className="p-4 flex flex-wrap gap-3">
        <button 
          onClick={() => actions.setScenario('NORMAL')}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors border border-slate-300"
        >
          <Play className="w-4 h-4" /> Normal
        </button>
        
        <button 
          onClick={() => actions.setScenario('EARLY_DEGRADATION')}
          className="flex items-center gap-2 px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg transition-colors border border-yellow-200"
        >
          <AlertTriangle className="w-4 h-4" /> Early Degradation
        </button>

        <button 
          onClick={() => actions.setScenario('UNSTABLE')}
          className="flex items-center gap-2 px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-medium rounded-lg transition-colors border border-orange-200"
        >
          <AlertTriangle className="w-4 h-4" /> Unstable Contact
        </button>

        <button 
          onClick={() => actions.setScenario('PRE_ARC')}
          className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-lg transition-colors border border-red-200"
        >
          <AlertTriangle className="w-4 h-4" /> Pre-Arc Risk
        </button>

        <button 
          onClick={() => actions.setScenario('CRITICAL')}
          className="flex items-center gap-2 px-3 py-2 bg-brand-900 hover:bg-black text-white text-sm font-medium rounded-lg transition-colors border border-brand-900"
        >
          <ZapOff className="w-4 h-4" /> Critical Event
        </button>

        <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block"></div>

        <button 
          onClick={() => actions.reset()}
          className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium rounded-lg transition-colors border border-slate-200 ml-auto"
        >
          <RotateCcw className="w-4 h-4" /> Reset System
        </button>
      </div>
    </div>
  );
}
