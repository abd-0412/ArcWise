import React from 'react';
import { Event } from '@/types/arcwise';
import StatusBadge from './StatusBadge';

interface EventPreviewProps {
  events: Event[];
}

export default function EventPreview({ events }: EventPreviewProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-slate-500 min-h-[200px]">
        <p>No recent events</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-brand-900">Recent Events</h3>
        <span className="text-xs text-brand-500 font-medium cursor-pointer hover:text-brand-700">View All</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-slate-100">
          {events.map((event) => (
            <li key={event.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <StatusBadge 
                  status={
                    event.severity === 'CRITICAL' ? 'danger' :
                    event.severity === 'HIGH' || event.severity === 'MEDIUM' ? 'warning' :
                    'info'
                  } 
                  text={event.type.replace(/_/g, ' ')} 
                />
                <span className="text-xs text-slate-400">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-2">{event.description}</p>
              {event.temperature && (
                <div className="mt-2 text-xs font-medium text-slate-500">
                  Peak Temp: <span className="text-slate-700">{event.temperature}°C</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
