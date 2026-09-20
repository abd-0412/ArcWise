'use client';

import React, { useState } from 'react';
import { useArcwise } from '@/components/providers/ArcwiseProvider';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { History, Search, Filter } from 'lucide-react';
import { EventSeverity } from '@/types/arcwise';

export default function EventHistoryPage() {
  const { events } = useArcwise();
  const [filter, setFilter] = useState<EventSeverity | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(e => {
    if (filter !== 'ALL' && e.severity !== filter) return false;
    if (searchTerm && !e.description.toLowerCase().includes(searchTerm.toLowerCase()) && !e.type.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Event History</h1>
          <p className="text-sm text-slate-500 mt-1">Complete log of system events, anomalies, and safety interventions.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
        
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
            <Filter className="w-4 h-4 text-slate-400 mr-1" />
            {(['ALL', 'INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${filter === f ? 'bg-brand-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <History className="w-12 h-12 mb-2 opacity-50" />
              <p>No events found matching your criteria.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8">
              {filteredEvents.map(event => (
                <div key={event.id} className="relative pl-6 md:pl-8">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white ${
                    event.severity === 'CRITICAL' ? 'bg-danger-dark' :
                    event.severity === 'HIGH' ? 'bg-danger' :
                    event.severity === 'MEDIUM' ? 'bg-warning-dark' :
                    event.severity === 'LOW' ? 'bg-warning' : 'bg-blue-500'
                  }`} />
                  
                  <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge 
                          status={
                            event.severity === 'CRITICAL' ? 'danger' :
                            event.severity === 'HIGH' || event.severity === 'MEDIUM' ? 'warning' :
                            'info'
                          } 
                          text={event.type.replace(/_/g, ' ')} 
                        />
                        <span className="text-sm font-semibold text-brand-900">{new Date(event.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                        Action: {event.actionTaken}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-700 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <div className="text-slate-400 mb-0.5">Contact State</div>
                        <div className="font-semibold text-brand-900">{event.contactState.replace('_', ' ')}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-0.5">CHI / TRI</div>
                        <div className="font-semibold text-brand-900">{event.chi}% / {event.tri}%</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-0.5">Temperature</div>
                        <div className="font-semibold text-brand-900">{event.temperature}°C</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-0.5">Acoustic / Current</div>
                        <div className="font-semibold text-brand-900">{event.acousticLevel}% / {event.current}A</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
