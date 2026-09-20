import React from 'react';
import { ShieldCheck } from 'lucide-react';
import DemoModeBadge from '../common/DemoModeBadge';

export default function TopHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm shrink-0">
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
        <h2 className="text-sm font-semibold text-brand-900 hidden md:flex items-center gap-2">
          Predictive Arc-Fault & Contact Overheating Interception
        </h2>
        <h2 className="text-sm font-semibold text-brand-900 md:hidden flex items-center gap-2">
          ARCWISE System
        </h2>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <DemoModeBadge />
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-md border border-green-200">
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden lg:inline">System Active</span>
        </div>
      </div>
    </header>
  );
}
