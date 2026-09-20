'use client';

import React from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import { BarChart as BarChartIcon, Zap, AlertTriangle, HeartPulse, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  const { events, history } = useArcwise();

  // Calculations
  const totalEvents = events.length;
  const highSeverityEvents = events.filter(e => e.severity === 'HIGH' || e.severity === 'CRITICAL').length;
  const isolationEvents = events.filter(e => e.type === 'LOAD_ISOLATED').length;
  
  const currentChi = history.length > 0 ? history[history.length - 1].chi : 100;
  const avgChi = history.length > 0 
    ? Math.round(history.reduce((sum, s) => sum + s.chi, 0) / history.length) 
    : 100;
    
  const peakTemp = history.length > 0 
    ? Math.max(...history.map(s => s.temperature)) 
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900">System Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Key performance and safety metrics for the ARCWISE prototype</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">Total Events</h3>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
              <BarChartIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-brand-900">{totalEvents}</div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">High-Severity Events</h3>
            <div className="p-2 rounded-lg bg-orange-50 text-orange-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-brand-900">{highSeverityEvents}</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">Isolation Interventions</h3>
            <div className="p-2 rounded-lg bg-danger/10 text-danger-dark">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-brand-900">{isolationEvents}</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500">Average CHI (Recent)</h3>
            <div className="p-2 rounded-lg bg-healthy/10 text-healthy-dark">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-brand-900">{avgChi}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-brand-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-500" />
            Contact Performance Summary
          </h3>
          <ul className="space-y-4 divide-y divide-slate-100">
            <li className="pt-4 flex justify-between items-center">
              <span className="text-sm text-slate-600">Current Health (CHI)</span>
              <span className="font-semibold text-brand-900">{currentChi}%</span>
            </li>
            <li className="pt-4 flex justify-between items-center">
              <span className="text-sm text-slate-600">Peak Temperature Observed</span>
              <span className="font-semibold text-brand-900">{peakTemp.toFixed(1)}°C</span>
            </li>
            <li className="pt-4 flex justify-between items-center">
              <span className="text-sm text-slate-600">Maintenance Recommendation</span>
              <span className="font-semibold text-brand-900 max-w-[60%] text-right">
                {currentChi > 80 ? 'No maintenance action currently indicated.' : 
                 currentChi > 50 ? 'Inspect contact tightness and thermal behaviour.' : 
                 'Immediate inspection required before returning to normal operation.'}
              </span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-slate-400">
          <BarChartIcon className="w-12 h-12 mb-3 text-slate-300" />
          <p className="font-medium">Historical Frequency Analysis</p>
          <p className="text-xs text-slate-400 mt-1">Requires cloud backend to aggregate long-term trends</p>
        </div>
      </div>
    </div>
  );
}
