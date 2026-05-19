// src/components/dashboard/OorQueueWidget.tsx
import Card from '../common/Card';
import { AlertCircle, ArrowRight } from 'lucide-react';
import type { OorReading } from '../../types/rpm';

interface Props {
  readings: OorReading[];
  onAcknowledge: (id: string) => void;
  onViewPatient: (patientId: string) => void;
}

export default function OorQueueWidget({ readings, onAcknowledge, onViewPatient }: Props) {
  return (
    <Card title="OUT-OF-RANGE QUEUE" className="h-auto">
      <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
        {readings.map((r) => (
          <div key={r.id} className="flex gap-3 p-3 bg-white border border-rose-100 rounded-xl hover:border-rose-200 group">
            <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-slate-900 truncate pr-2">{r.patientName}</p>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{r.timestamp}</span>
              </div>
              <p className="text-sm font-mono text-rose-500 mt-0.5">
                {r.metric}: <span className="">{r.value} {r.unit}</span>
              </p>
            </div>

            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button
                onClick={() => onViewPatient(r.patientId)}
                className="text-[10px] px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md flex items-center gap-1 text-nowrap"
              >
                View <ArrowRight size={12} />
              </button>
              <button
                onClick={() => onAcknowledge(r.id)}
                className="text-[10px] px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md"
              >
                Ack
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[10px] text-slate-400 mt-4 font-medium">
        {readings.length} unreviewed • Updated just now
      </div>
    </Card>
  );
}