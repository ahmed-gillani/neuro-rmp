// src/components/patients/tabs/OverviewTab.tsx
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import { TrendingUp, AlertCircle, User } from 'lucide-react';
import type { Patient } from '../../../types';

interface OverviewTabProps {
  patient: Patient;
}

export default function OverviewTab({ patient }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Vital Signs - Optimized for Mobile */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[
          { label: 'WEIGHT', value: '153 lbs', change: -2, color: 'text-emerald-600' },
          { label: 'BLOOD PRESSURE', value: '129/87', change: 3, color: 'text-amber-600' },
          { label: 'HEART RATE', value: '80 bpm', change: 0, color: 'text-teal-600' },
          { label: 'SpO₂', value: '94%', change: -1, color: 'text-red-600' },
        ].map((v, i) => (
          <Card key={i} className="text-center p-4 sm:p-6 hover:-translate-y-1 transition-all">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
              {v.label}
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 text-slate-900">
              {v.value}
            </p>
            <div className={`flex items-center justify-center gap-1 mt-2 text-xs font-medium ${v.color}`}>
              <TrendingUp className={`w-3.5 h-3.5 ${v.change < 0 ? 'rotate-180' : ''}`} />
              {v.change > 0 ? '+' : ''}{v.change}%
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Critical Alerts */}
        <div className="lg:col-span-7">
          <Card>
            <div className="p-5 border-b flex items-center justify-between bg-red-50">
              <h3 className="font-semibold flex items-center gap-2 text-red-700 text-base">
                <AlertCircle className="w-5 h-5" /> Critical Alerts
              </h3>
              <Badge status="OOR">2 Active</Badge>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="bg-white border border-red-100 p-4 rounded-2xl">
                Blood pressure above critical threshold — 145/92 mmHg (2 min ago)
              </div>
              <div className="bg-white border border-red-100 p-4 rounded-2xl">
                SpO₂ dropped below 95% — 93% (30 min ago)
              </div>
            </div>
          </Card>
        </div>

        {/* Patient Summary */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-blue-600">Patient Summary</h3>
                  <p className="text-xs text-slate-500">Last updated 2 days ago</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-[14.5px]">
                This is a patient with a history of Type 2 Diabetes Mellitus and cardiovascular concerns. 
                They are enrolled in both remote patient monitoring (RPM) and chronic care management (CCM).
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}