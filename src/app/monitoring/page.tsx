'use client';

import React from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, Thermometer, Zap } from 'lucide-react';

export default function MonitoringPage() {
  const { history, sensor } = useArcwise();

  if (!sensor || history.length === 0) return null;

  // Format data for recharts
  const chartData = history.map(s => ({
    time: new Date(s.timestamp).toLocaleTimeString([], { second: '2-digit', minute: '2-digit' }),
    temperature: s.temperature,
    current: s.current,
    acoustic: s.acousticLevel
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900">Live Monitoring</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time telemetry and temporal electro-acoustic analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-brand-900 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-brand-500" />
              Contact Temperature
            </h3>
            <span className="text-2xl font-bold text-brand-900">{sensor.temperature}°C</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} minTickGap={30} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                />
                <ReferenceLine y={45} stroke="#f59e0b" strokeDasharray="3 3" />
                <ReferenceLine y={55} stroke="#ef4444" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="temperature" stroke="#0f172a" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-brand-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-500" />
              Electrical Current
            </h3>
            <span className="text-2xl font-bold text-brand-900">{sensor.current} A</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} minTickGap={30} />
                <YAxis domain={[0, 'auto']} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="stepAfter" dataKey="current" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Acoustic Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-brand-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-500" />
              Acoustic Activity (Normalized %)
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-500">{sensor.acousticState.replace('_', ' ')}</span>
              <span className="text-2xl font-bold text-brand-900">{sensor.acousticLevel}%</span>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} minTickGap={30} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <ReferenceLine y={40} stroke="#f59e0b" strokeDasharray="3 3" />
                <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="acoustic" stroke="#8b5cf6" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
