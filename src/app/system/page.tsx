'use client';

import React from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import { Settings, Wifi, Server, Cpu, Database, Cloud, Zap, Activity } from 'lucide-react';
import StatusBadge from '@/components/dashboard/StatusBadge';

export default function SystemPage() {
  const { system } = useArcwise();

  if (!system) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900">System & Device Status</h1>
        <p className="text-sm text-slate-500 mt-1">Hardware and communication interface diagnostics</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <Settings className="w-5 h-5 text-brand-600" />
          <h2 className="font-semibold text-brand-900">ARCWISE Edge Controller</h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">Device Target</span>
            </div>
            <span className="text-sm font-semibold text-brand-900">ESP32 — SIMULATED</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">Operating Mode</span>
            </div>
            <StatusBadge status="info" text={system.operatingMode} />
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">Sensors</span>
            </div>
            <span className="text-sm font-semibold text-slate-500">SIMULATED</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">Communication</span>
            </div>
            <span className="text-sm font-semibold text-slate-500">SIMULATED (No MQTT)</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">SSR Control</span>
            </div>
            <span className="text-sm font-semibold text-slate-500">SIMULATED</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">Cloud Backend</span>
            </div>
            <span className="text-sm font-semibold text-slate-500">NOT CONNECTED</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">PWA Status</span>
            </div>
            <StatusBadge status="normal" text="READY / OFFLINE CAPABLE" />
          </div>

        </div>
      </div>
    </div>
  );
}
