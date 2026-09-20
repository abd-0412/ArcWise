'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Activity, HeartPulse, ShieldAlert, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: LayoutDashboard },
  { name: 'Monitor', href: '/monitoring', icon: Activity },
  { name: 'Health', href: '/health', icon: HeartPulse },
  { name: 'Safety', href: '/safety', icon: ShieldAlert },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
];

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden flex bg-white border-t border-slate-200 pb-safe shrink-0">
      <ul className="flex w-full justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center py-3 text-xs gap-1 transition-colors',
                  isActive
                    ? 'text-brand-700 font-semibold'
                    : 'text-slate-500 hover:text-brand-600'
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-brand-600")} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
