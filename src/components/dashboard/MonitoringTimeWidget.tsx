// src/components/dashboard/MonitoringTimeWidget.tsx
import Card from '../common/Card';
import type { CptLog } from '../../types/rpm';

interface Props {
  logs: CptLog[];
}

export default function MonitoringTimeWidget({ logs }: Props) {
  return (
    <Card title="MONITORING TIME (CPT)" className="h-auto">
      <div className="space-y-5 pt-2">
        {logs.map((log, i) => {
          const percent = Math.min(Math.round((log.minutesToday / log.targetMonthly) * 100), 100);
          return (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-900">{log.code}</span>
                  <span className="text-slate-500 ml-2 text-[11px]">{log.description}</span>
                </div>
                <div className="font-medium text-emerald-600 text-right">
                  {log.minutesToday} / {log.targetMonthly} min
                </div>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-700 rounded-full"
                  style={{ width: `${percent}%`, backgroundColor: log.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-[10px] text-slate-400 mt-5 pt-3 border-t">
        May 2026 • Billing window opens in 11 days
      </div>
    </Card>
  );
}