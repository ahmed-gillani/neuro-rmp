// src/components/patients/tabs/OverviewTab.tsx
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import { TrendingUp, AlertCircle, User } from 'lucide-react';
import type { Patient } from '../../../types';

export default function OverviewTab({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-3 font-sans animate-in fade-in duration-500">
      {/* Vitals - Hug Content Row */}
      <div className="flex flex-wrap gap-2.5">
        {[
          { label: 'Weight', value: '153', unit: 'lbs', change: -2, color: 'text-emerald-600' },
          { label: 'BP', value: '129/87', unit: 'mmHg', change: 3, color: 'text-amber-600' },
          { label: 'Heart Rate', value: '80', unit: 'bpm', change: 0, color: 'text-teal-600' },
          { label: 'SpO2', value: '94', unit: '%', change: -1, color: 'text-rose-600' },
        ].map((v, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl py-2 px-3.5 shadow-sm min-w-[130px] flex-1 sm:flex-none">
            <p className="text-[9px] font-medium uppercase tracking-widest text-slate-500 mb-0.5">{v.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-medium text-[#1e293b] leading-tight">{v.value}</span>
              <span className="text-[9px] text-slate-400 uppercase">{v.unit}</span>
            </div>
            <div className={`flex items-center gap-1 mt-0.5 text-[9px] font-medium ${v.color}`}>
              <TrendingUp size={10} className={v.change < 0 ? 'rotate-180' : ''} />
              {v.change > 0 ? '+' : ''}{v.change}%
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Critical Alerts - Functional Count */}
        <div className="lg:col-span-7">
          <Card noPadding className="border-rose-100 shadow-none">
            <div className="px-3 py-2 border-b border-rose-50 bg-rose-50/30 flex items-center justify-between">
              <h3 className="text-[10px] font-medium text-rose-700 uppercase tracking-tight flex items-center gap-1.5">
                <AlertCircle size={12} /> Active Notifications
              </h3>
              <Badge status="OOR" className="text-[8px] px-1.5 py-0 font-medium">2 Active</Badge>
            </div>
            <div className="p-2.5 space-y-1.5">
              {[
                "BP above critical threshold — 145/92 mmHg (2m ago)",
                "SpO2 dropped below 95% — 93% (30m ago)"
              ].map((alert, i) => (
                <div key={i} className="bg-white border border-rose-50 p-2 rounded-lg text-[10px] text-rose-800 leading-snug">
                  {alert}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Clinical Summary */}
        <div className="lg:col-span-5">
          <Card noPadding className="border-slate-100 shadow-none h-full">
            <div className="px-3 py-2 border-b border-slate-50 bg-slate-50/30">
              <h3 className="text-[10px] font-medium text-[#1e293b] uppercase tracking-tight font-sans">Patient Profile Summary</h3>
            </div>
            <div className="p-3">
              <p className="text-[11px] font-normal text-slate-600 leading-relaxed italic">
                {patient.name} has a history of Type 2 Diabetes and cardiovascular concerns. 
                Currently enrolled in RPM & CCM for proactive hypertension management.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}