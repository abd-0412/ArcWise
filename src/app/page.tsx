'use client';

import React from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import MetricCard from '@/components/dashboard/MetricCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import EventPreview from '@/components/dashboard/EventPreview';
import DemoControls from '@/components/common/DemoControls';
import { Thermometer, Zap, Activity, Heart, ShieldAlert, Cpu } from 'lucide-react';

export default function DashboardPage() {
  const { sensor, health, system, events } = useArcwise();

  if (!sensor || !health || !system) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">System Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time status of electrical contacts and monitoring systems</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-sm font-medium text-slate-600">Contact Condition:</span>
          <StatusBadge 
            status={
              health.state === 'NORMAL' ? 'normal' : 
              health.state === 'EARLY_DEGRADATION' ? 'warning' :
              health.state === 'UNSTABLE_CONTACT' ? 'warning' :
              'danger'
            } 
            text={health.state.replace('_', ' ')} 
          />
        </div>
      </div>
      
      <DemoControls />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Contact Temperature" 
          value={sensor.temperature} 
          unit="°C" 
          icon={Thermometer} 
          status={sensor.temperature > 55 ? 'danger' : sensor.temperature > 45 ? 'warning' : 'normal'}
        />
        <MetricCard 
          title="Electrical Current" 
          value={sensor.current} 
          unit="A" 
          icon={Zap} 
          status={sensor.current > 1.1 ? 'warning' : 'normal'}
        />
        <MetricCard 
          title="Acoustic Activity" 
          value={sensor.acousticState.replace('_', ' ')}
          icon={Activity} 
          status={sensor.acousticState === 'NORMAL' ? 'normal' : sensor.acousticState === 'LOW_EVENT' ? 'warning' : 'danger'}
        />
        <MetricCard 
          title="Contact Health Index (CHI)" 
          value={health.chi} 
          unit="%" 
          icon={Heart} 
          status={health.chi < 50 ? 'danger' : health.chi < 80 ? 'warning' : 'normal'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Load Status
              </h3>
              <p className={`text-xl font-semibold ${system.loadStatus === 'ISOLATED' ? 'text-danger-dark' : 'text-brand-900'}`}>
                {system.loadStatus}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> SSR Status
              </h3>
              <p className={`text-xl font-semibold ${system.ssrStatus === 'OFF' ? 'text-slate-400' : 'text-brand-900'}`}>
                {system.ssrStatus}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Thermal Rec. (TRI)
              </h3>
              <p className={`text-xl font-semibold ${health.tri < 40 ? 'text-danger-dark' : health.tri < 80 ? 'text-warning-dark' : 'text-brand-900'}`}>
                {health.tri}%
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-start gap-2">
            <h3 className="text-sm font-medium text-slate-500">Latest Safety Action</h3>
            <div className="text-lg font-semibold text-brand-900">{system.latestAction}</div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <EventPreview events={events.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
