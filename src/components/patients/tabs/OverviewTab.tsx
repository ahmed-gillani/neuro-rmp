// src/components/patients/tabs/OverviewTab.tsx
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import { AlertCircle, TrendingUp, User } from 'lucide-react';
import type { Patient } from '../../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OverviewTabProps {
  patient: Patient;
}

const vitals = [
  { label: 'WEIGHT', value: '153 lbs', change: -2 },
  { label: 'BLOOD PRESSURE', value: '129/87', change: 3 },
  { label: 'HEART RATE', value: '80 bpm', change: 0 },
  { label: 'SpO2', value: '94%', change: -1 },
];

const spo2Trend = [
  { date: '1 Mar', value: 92 }, { date: '15 Mar', value: 94 }, { date: '29 Mar', value: 93 },
  { date: '12 Apr', value: 95 }, { date: '26 Apr', value: 92 }, { date: '3 May', value: 90 },
  { date: '10 May', value: 94 }, { date: '17 May', value: 95 }, { date: '24 May', value: 94 },
  { date: '31 May', value: 91 },
];

const weeklySpo2 = [
  { day: '18 May', value: 88 }, { day: '19 May', value: 90 }, { day: '20 May', value: 91 },
  { day: '21 May', value: 90 }, { day: '22 May', value: 92 }, { day: '23 May', value: 91 },
  { day: '24 May', value: 89 }, { day: '25 May', value: 88 }, { day: '26 May', value: 88 },
  { day: '27 May', value: 89 },
];

export default function OverviewTab({ patient }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Vitals Cards - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {vitals.map((v, i) => (
          <Card key={i} className="p-5">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">{v.label}</p>
            <p className="text-2xl font-black text-black mt-2">{v.value}</p>
            
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${v.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 ${v.change < 0 ? 'rotate-180' : ''}`} />
              {v.change > 0 ? '+' : ''}{v.change}%
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Critical Alerts */}
        <div className="lg:col-span-7">
          <Card>
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" /> Critical Alerts
              </h3>
              <Badge variant="error">2 Active</Badge>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-black">
                Blood pressure reading above critical threshold — 145/92 mmHg (2 min ago)
              </div>
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-black">
                SpO2 dropped below 95% — 93% (30 min ago)
              </div>
            </div>
          </Card>
        </div>

        {/* Patient Summary */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-black">Patient Summary</h3>
                  <p className="text-xs text-gray-500">Last updated 2 days ago</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                This is a patient with a history of Type 2 Diabetes Mellitus and cardiovascular concerns. 
                They are enrolled in both remote patient monitoring (RPM) and chronic care management (CCM).
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* SpO2 Trend */}
      <Card>
        <div className="p-5 border-b">
          <h3 className="font-bold text-black">SpO₂ Trend • 3 Months</h3>
        </div>
        <div className="h-72 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spo2Trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Line type="natural" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Weekly SpO2 - Restored */}
      <Card>
        <div className="p-5 border-b">
          <h3 className="font-bold text-black">Weekly SpO₂</h3>
        </div>
        <div className="h-64 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklySpo2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" />
              <YAxis domain={[85, 95]} />
              <Tooltip />
              <Line type="natural" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}