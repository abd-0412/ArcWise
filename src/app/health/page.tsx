'use client';

import React from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { HeartPulse, ShieldAlert, Activity, Zap, Thermometer, Clock, AlertTriangle } from 'lucide-react';

export default function ContactHealthPage() {
  const { health, sensor, history } = useArcwise();

  if (!health || !sensor || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Activity className="w-8 h-8 mb-4 animate-pulse text-brand-500" />
        <p>Loading ARCWISE telemetry...</p>
      </div>
    );
  }
  const chartData = history.map(s => ({
    time: new Date(s.timestamp).toLocaleTimeString([], { second: '2-digit', minute: '2-digit' }),
    chi: s.chi,
    tri: s.tri,
  }));

  const getAcousticCondition = () => {
    if (sensor.acousticState === 'NORMAL') return 'NORMAL';
    if (sensor.acousticState === 'LOW_EVENT') return 'MINOR DISTURBANCE';
    return 'ABNORMAL';
  };

  const getElectricalCondition = () => {
    if (sensor.current > 1.2) return 'TRANSIENT DETECTED';
    if (sensor.current > 1.0) return 'ELEVATED';
    return 'STABLE';
  };

  const getTemperatureCondition = () => {
    if (sensor.temperature > 55) return 'CRITICAL';
    if (sensor.temperature > 45) return 'ELEVATED';
    return 'NORMAL';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Contact Health</h1>
          <p className="text-sm text-slate-500 mt-1">Detailed analysis of contact condition and degradation</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 flex items-center justify-end gap-1 mb-1">
            <Clock className="w-3 h-3" /> Last Updated
          </div>
          <div className="text-sm font-medium text-slate-700">
            {new Date(health.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main CHI Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">Contact Health Index</h3>
          <div className={`text-7xl font-bold mb-4 tracking-tighter ${health.chi < 50 ? 'text-danger-dark' : health.chi < 80 ? 'text-warning-dark' : 'text-brand-900'}`}>
            {health.chi}<span className="text-3xl text-slate-400 ml-1">%</span>
          </div>
          <StatusBadge 
            status={
              health.state === 'NORMAL' ? 'normal' : 
              health.state === 'EARLY_DEGRADATION' ? 'warning' :
              health.state === 'UNSTABLE_CONTACT' ? 'warning' :
              'danger'
            } 
            text={health.state.replace('_', ' ')} 
            className="text-base px-4 py-1.5"
          />
        </div>

        {/* Diagnostic Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-brand-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-500" />
              Diagnostic Breakdown
            </h3>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-sm text-slate-600 flex items-center gap-2"><Thermometer className="w-4 h-4 text-slate-400" /> Thermal Recovery (TRI)</span>
              <span className={`font-semibold ${health.tri < 60 ? 'text-danger-dark' : 'text-brand-900'}`}>{health.tri} / 100</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-sm text-slate-600 flex items-center gap-2"><Activity className="w-4 h-4 text-slate-400" /> Acoustic Condition</span>
              <span className="font-semibold text-brand-900">{getAcousticCondition()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-sm text-slate-600 flex items-center gap-2"><Zap className="w-4 h-4 text-slate-400" /> Electrical Condition</span>
              <span className="font-semibold text-brand-900">{getElectricalCondition()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-sm text-slate-600 flex items-center gap-2"><Thermometer className="w-4 h-4 text-slate-400" /> Temperature Condition</span>
              <span className="font-semibold text-brand-900">{getTemperatureCondition()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-slate-400" /> Degradation Evidence</span>
              <span className="font-semibold text-brand-900">{health.degradation > 20 ? 'HIGH' : health.degradation > 5 ? 'MEDIUM' : 'LOW'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Health Trend Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-semibold text-brand-900 mb-6 flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-brand-500" />
          Health & Recovery Trend (CHI / TRI)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} minTickGap={30} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Critical Threshold', fill: '#ef4444', fontSize: 12 }} />
              <ReferenceLine y={80} stroke="#f59e0b" strokeDasharray="3 3" />
              
              <Line type="monotone" name="Contact Health Index (CHI)" dataKey="chi" stroke="#0f172a" strokeWidth={3} dot={false} isAnimationActive={false} />
              <Line type="monotone" name="Thermal Recovery Index (TRI)" dataKey="tri" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
