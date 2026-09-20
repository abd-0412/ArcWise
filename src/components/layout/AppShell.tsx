import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import MobileNavigation from './MobileNavigation';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-6 lg:p-8">
          {children}
          
          <footer className="mt-12 mb-4 text-center">
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              ARCWISE is currently operating in <strong className="font-semibold text-slate-500">DEMO / SIMULATION MODE</strong>. Sensor readings and load-isolation actions shown in this prototype are simulated and are not connected to physical hardware.
            </p>
          </footer>
        </main>
        <MobileNavigation />
      </div>
    </div>
  );
}
