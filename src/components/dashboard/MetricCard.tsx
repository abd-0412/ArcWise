import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'danger';
  className?: string;
}

export default function MetricCard({ title, value, unit, icon: Icon, status = 'normal', className }: MetricCardProps) {
  const statusColors = {
    normal: 'text-brand-900',
    warning: 'text-warning-dark',
    danger: 'text-danger-dark',
  };

  const iconColors = {
    normal: 'text-blue-500 bg-blue-50',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  };

  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={cn("p-2 rounded-lg", iconColors[status])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-1 mt-auto">
        <span className={cn("text-3xl font-bold tracking-tight", statusColors[status])}>
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}
