// src/components/dashboard/DailiesQueueWidget.tsx
import Card from '../common/Card';
import { CheckCircle } from 'lucide-react';
import type { DailyReading } from '../../types/rpm';
import { useState } from 'react';

interface Props {
  readings: DailyReading[];
  onMarkReviewed: (id: string) => void;
  onBulkAcknowledge: (ids: string[]) => void;
}

export default function DailiesQueueWidget({ readings, onMarkReviewed, onBulkAcknowledge }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const metrics = ['All', 'Blood Pressure', 'Glucose', 'SpO2'];
  const filteredReadings = activeFilter === 'All' 
    ? readings 
    : readings.filter(r => r.metric === activeFilter);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <Card title="TODAY'S READINGS" className="h-auto">
      {/* Filter Pills */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {metrics.map(m => (
          <button
            key={m}
            onClick={() => setActiveFilter(m)}
            className={`px-4 py-1 text-xs rounded-full whitespace-nowrap transition-all ${
              activeFilter === m 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-[460px] overflow-auto pr-1">
        {filteredReadings.map((r) => (
          <div key={r.id} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-blue-200 group">
            <input
              type="checkbox"
              checked={selectedIds.includes(r.id)}
              onChange={() => toggleSelect(r.id)}
              className="accent-blue-600 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="font-medium truncate text-slate-600">{r.patientName}</p>
                <span className="text-xs text-slate-400">{r.timestamp}</span>
              </div>
              <p className="text-sm font-mono text-slate-700">
                {r.metric} • <span className="font-semibold">{r.value} {r.unit}</span>
              </p>
            </div>
            <button
              onClick={() => onMarkReviewed(r.id)}
              className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs bg-emerald-600 text-white rounded-lg flex items-center gap-1 transition-all"
            >
              <CheckCircle size={14} /> Mark
            </button>
          </div>
        ))}
      </div>

      {selectedIds.length > 0 && (
        <button
          onClick={() => { onBulkAcknowledge(selectedIds); setSelectedIds([]); }}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium"
        >
          Acknowledge {selectedIds.length} Selected
        </button>
      )}
    </Card>
  );
}