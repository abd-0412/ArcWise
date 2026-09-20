'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Activity, HeartPulse, History, ShieldAlert, Settings, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Live Monitoring', href: '/monitoring', icon: Activity },
  { name: 'Contact Health', href: '/health', icon: HeartPulse },
  { name: 'Event History', href: '/events', icon: History },
  { name: 'Safety & Interception', href: '/safety', icon: ShieldAlert },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'System / Device', href: '/system', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-brand-900 text-slate-300 border-r border-brand-800">
      <div className="h-16 flex items-center px-6 border-b border-brand-800">
        <h1 className="text-xl font-bold tracking-widest text-white flex items-center gap-2">
          <Activity className="text-blue-400" /> ARCWISE
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium',
                    isActive
                      ? 'bg-brand-800 text-white'
                      : 'hover:bg-brand-800 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-brand-800">
        <div className="text-xs text-brand-500 text-center">
          Predictive Arc-Fault System v0.1
        </div>
      </div>
    </aside>
  );
}
