import React from 'react';
import { Beaker } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DemoModeBadgeProps {
  className?: string;
}

export default function DemoModeBadge({ className }: DemoModeBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-sm text-xs font-bold uppercase tracking-wide',
        className
      )}
      title="Hardware is not connected. System is using simulated data."
    >
      <Beaker className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Demo / Simulation Mode</span>
      <span className="sm:hidden">Demo Mode</span>
    </div>
  );
}
