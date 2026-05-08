// src/components/patients/tabs/AlertsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { AlertCircle, AlertTriangle, Search } from 'lucide-react';
import { useReadingsStore } from '../../../stores/useReadingsStore';
import type { Patient } from '../../../types';

export default function AlertsTab({ patient }: { patient: Patient }) {
  const { markAsReviewed } = useReadingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'CRITICAL' | 'WARNING'>('All');

  const alertsData = [
    { id: 'a1', type: 'Blood Pressure', message: 'Blood pressure above critical threshold — 145/92 mmHg', time: '2 min ago', severity: 'CRITICAL' },
    { id: 'a2', type: 'Glucose', message: 'Glucose spike detected — 210 mg/dL', time: '8 min ago', severity: 'WARNING' },
    { id: 'a3', type: 'SpO2', message: 'SpO2 dropped below 95% — 93%', time: '30 min ago', severity: 'CRITICAL' },
  ];

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || alert.severity === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4 font-sans animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between gap-3 px-1">
        <div className="flex gap-1.5">
          {['All', 'CRITICAL', 'WARNING'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all border
                ${activeFilter === filter ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 font-sans"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filteredAlerts.map(alert => (
          <Card key={alert.id} noPadding className={`border-l-4 ${alert.severity === 'CRITICAL' ? 'border-l-rose-500 bg-rose-50/30' : 'border-l-amber-500 bg-amber-50/30'}`}>
            <div className="flex items-center gap-3 p-3">
              <div className={`p-2 rounded-lg shrink-0 ${alert.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                {alert.severity === 'CRITICAL' ? <AlertCircle size={18} /> : <AlertTriangle size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-900 leading-tight">{alert.message}</p>
                <p className="text-[13px] text-slate-500 mt-1 uppercase font-sans tracking-tight">{alert.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge status="OOR" className="text-[8px] text-slate-600 font-medium" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAsReviewed(alert.id)}
                  className="text-[12px] h-7 border-slate-200 text-rose-600 hover:bg-rose-50 font-medium"
                >
                  Mark Read
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}