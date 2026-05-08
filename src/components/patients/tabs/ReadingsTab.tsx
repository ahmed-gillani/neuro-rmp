// src/components/patients/tabs/ReadingsTab.tsx
import Card from '../../common/Card';
import Button from '../../common/Button';
import ReadingChart from '../../common/ReadingChart';
import { Plus, History } from 'lucide-react';

export default function ReadingsTab({ patient }: { patient: any }) {
  return (
    <div className="space-y-3 font-sans animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Vital Trends & Analytics</h3>
        </div>
        <Button size="sm" className="bg-blue-600 text-white text-[12px] h-7 px-3 border-none shadow-sm">
          <Plus size={12} className="mr-1.5" /> Manual Entry
        </Button>
      </div>

      <Card noPadding className="border-slate-100 shadow-none">
        <div className="px-4 py-3 border-b border-slate-50 flex items-center gap-2">
          <History size={12} className="text-blue-500" />
          <span className="text-[12px] font-medium text-slate-700 uppercase tracking-tight">Blood Pressure Trend (Last 30 Days)</span>
        </div>
        <div className="p-4 h-[300px] md:h-[400px]">
          <ReadingChart />
        </div>
      </Card>

      <Card noPadding title="Clinical Reading Log" className="border-slate-100 shadow-none">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[11px] text-slate-400 uppercase tracking-widest font-sans">
              <tr>
                <th className="p-3 font-medium">Timestamp</th>
                <th className="p-3 font-medium">Metric</th>
                <th className="p-3 font-medium text-center">Reading</th>
                <th className="p-3 font-medium text-right">Observation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-sans">
              {[
                { date: "07 May, 14:20", type: "BP", val: "128/84", status: "Normal" },
                { date: "07 May, 09:15", type: "SpO2", val: "94%", status: "Out of Range" },
              ].map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 text-[12px] font-medium text-slate-600">{r.date}</td>
                  <td className="p-3 text-[12px] font-medium text-slate-400 uppercase tracking-tighter">{r.type}</td>
                  <td className="p-3 text-[12px] font-medium text-[#1e293b] text-center">{r.val}</td>
                  <td className="p-3 text-right">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase tracking-tight ${r.status === "Normal" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}