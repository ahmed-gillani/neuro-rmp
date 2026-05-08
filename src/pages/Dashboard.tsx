// src/pages/Dashboard.tsx
import React from 'react';
import { Users, Activity, AlertCircle, Calendar } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import Card from '../components/common/Card';
import ReadingChart from '../components/common/ReadingChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4 font-sans animate-in fade-in duration-500">
      <div className="px-1">
        {/* font-bold ko font-medium kiya gaya hai visibility ke liye */}
        <h1 className="text-xl font-medium text-[#0f172a] tracking-tight leading-none">System Overview</h1>
        <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider mt-1.5">Live monitoring status</p>
      </div>

      {/* Grid for Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Patients" value="1,284" icon={Users} trend={{ value: 12, isUp: true }} />
        <StatCard title="Active" value="842" icon={Activity} color="#10b981" trend={{ value: 8, isUp: true }} />
        <StatCard title="Critical" value="12" icon={AlertCircle} color="#ef4444" trend={{ value: 3, isUp: false }} />
        <StatCard title="Today" value="48" icon={Calendar} color="#f59e0b" trend={{ value: 5, isUp: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart Section */}
        <Card title="Patient Health Trends" className="lg:col-span-8 border-slate-100 shadow-none">
          <div className="h-[300px] w-full -ml-4">
            <ReadingChart />
          </div>
        </Card>

        {/* Recent Activity Section */}
        <Card title="Recent Activity" className="lg:col-span-4 border-slate-100 shadow-none overflow-hidden">
          <div className="space-y-1 mt-1">
            {[
              { patient: "Linda Garcia", action: "BP stabilized", time: "2h ago", color: "emerald" },
              { patient: "Muhammad Ahmed", action: "Glucose alert", time: "4h ago", color: "amber" },
              { patient: "Fatima Khan", action: "Monitoring ok", time: "5h ago", color: "emerald" },
              { patient: "Imran Malik", action: "Missed reading", time: "8h ago", color: "rose" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors group">
                <div className={`w-1 h-6 rounded-full bg-${item.color}-500 shrink-0`} />
                <div className="flex-1 min-w-0 font-sans">
                  <p className="text-[12px] font-medium text-[#1e293b] truncate leading-tight group-hover:text-blue-600">{item.patient}</p>
                  <p className="text-[12px] font-medium text-slate-500 truncate mt-0.5">{item.action}</p>
                </div>
                <span className="text-[12px] font-medium text-slate-400 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;