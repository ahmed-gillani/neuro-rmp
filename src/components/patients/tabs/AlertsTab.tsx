// src/components/patients/tabs/AlertsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { AlertCircle, AlertTriangle, Phone } from 'lucide-react';
import { useReadingsStore } from '../../../stores/useReadingsStore';
import type { Patient } from '../../../types';

interface AlertsTabProps {
  patient: Patient;
}

export default function AlertsTab({ patient }: AlertsTabProps) {
  const { markAsReviewed } = useReadingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Critical' | 'Warnings'>('All');

  const alertsData = [
    { id: 'a1', type: 'Blood Pressure', message: 'Blood pressure above critical threshold — 145/92 mmHg', time: '2 min ago', severity: 'CRITICAL' },
    { id: 'a2', type: 'Glucose', message: 'Glucose spike detected — 210 mg/dL', time: '8 min ago', severity: 'WARNING' },
    { id: 'a3', type: 'SpO2', message: 'SpO2 dropped below 95% — 93%', time: '30 min ago', severity: 'CRITICAL' },
  ];

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' ||
      (activeFilter === 'Critical' && alert.severity === 'CRITICAL') ||
      (activeFilter === 'Warnings' && alert.severity === 'WARNING');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">Alerts</h3>
          <p className="text-slate-700">Critical notifications for this patient</p>
        </div>
        <input
          type="text"
          placeholder="Search alerts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-slate-200 rounded-2xl px-5 py-3 w-full md:w-80 focus:border-teal-400 outline-none"
        />
      </div>

      <div className="flex gap-2">
        {['All', 'Critical', 'Warnings'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as any)}
            className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all ${activeFilter === filter
                ? 'bg-red-100 text-red-700'
                : 'bg-slate-100 hover:bg-slate-200'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <Card key={alert.id} className={`border-l-4 ${alert.severity === 'CRITICAL' ? 'border-l-red-500 bg-red-50' : 'border-l-amber-500 bg-amber-50'}`}>
            <div className="flex gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                {alert.severity === 'CRITICAL' ? <AlertCircle size={28} /> : <AlertTriangle size={28} />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{alert.message}</p>
                <p className="text-sm text-slate-700 mt-1">{alert.time}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Badge status="OOR" />
                <Button variant="outline" size="sm" className="text-red-600">Mark Read</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}