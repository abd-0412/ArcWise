'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { ArcwiseEngine, DemoScenario } from '@/lib/simulation/arcwise-engine';
import { SensorData, ContactHealth, SystemStatus, Event } from '@/types/arcwise';

export interface ArcwiseSnapshot extends SensorData {
  chi: number;
  tri: number;
}

interface ArcwiseContextType {
  sensor: SensorData | null;
  health: ContactHealth | null;
  system: SystemStatus | null;
  history: ArcwiseSnapshot[];
  events: Event[];
  actions: {
    setScenario: (scenario: DemoScenario) => void;
    reset: () => void;
  };
}

const ArcwiseContext = createContext<ArcwiseContextType | null>(null);

export function ArcwiseProvider({ children }: { children: React.ReactNode }) {
  const engineRef = useRef<ArcwiseEngine | null>(null);
  
  const [sensor, setSensor] = useState<SensorData | null>(null);
  const [health, setHealth] = useState<ContactHealth | null>(null);
  const [system, setSystem] = useState<SystemStatus | null>(null);
  const [history, setHistory] = useState<ArcwiseSnapshot[]>([]);
  const [events, setEvents] = useState<Event[]>(() => [{
    id: `evt-start`,
    timestamp: Date.now(),
    type: 'SYSTEM_INITIALIZED',
    severity: 'INFO',
    description: 'ARCWISE System Initialized in DEMO Mode',
    actionTaken: 'System Startup',
    contactState: 'NORMAL',
    temperature: 42.6,
    current: 0.82,
    acousticLevel: 5,
    chi: 98,
    tri: 95,
    loadStatus: 'CONNECTED'
  }]);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new ArcwiseEngine();
    }

    const engine = engineRef.current;

    const unsubscribe = engine.subscribe((s, h, sys, newEvent) => {
      setSensor(s);
      setHealth(h);
      setSystem(sys);
      
      setHistory(prev => {
        const newSnapshot: ArcwiseSnapshot = { ...s, chi: h.chi, tri: h.tri };
        const newHistory = [...prev, newSnapshot];
        if (newHistory.length > 60) newHistory.shift();
        return newHistory;
      });

      if (newEvent) {
        setEvents(prev => [newEvent, ...prev]);
      }
    });

    const interval = setInterval(() => {
      engine.tick();
    }, 1000); // 1 tick per second

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const value = {
    sensor,
    health,
    system,
    history,
    events,
    actions: {
      setScenario: (scenario: DemoScenario) => engineRef.current?.setScenario(scenario),
      reset: () => engineRef.current?.reset(),
    }
  };

  return (
    <ArcwiseContext.Provider value={value}>
      {children}
    </ArcwiseContext.Provider>
  );
}

export function useArcwise() {
  const context = useContext(ArcwiseContext);
  if (!context) {
    throw new Error('useArcwise must be used within an ArcwiseProvider');
  }
  return context;
}
