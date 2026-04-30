// //src/pages/Dashboard.tsx
import React from 'react';
import { Users, Activity, AlertCircle, Calendar } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import Card from '../components/common/Card';
import ReadingChart from '../components/common/ReadingChart'; // As seen in your src.zip

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--text-h))]">Overview</h1>
        <p className="text-[rgb(var(--muted-foreground))] text-sm">Welcome back, Dr. Ahmed. Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value="1,284" 
          icon={Users} 
          trend={{ value: 12, isUp: true }} 
        />
        <StatCard 
          title="Active Monitoring" 
          value="842" 
          icon={Activity} 
          color="#10b981" // Green
        />
        <StatCard 
          title="Critical Alerts" 
          value="12" 
          icon={AlertCircle} 
          trend={{ value: 3, isUp: false }}
          color="#ef4444" // Red
        />
        <StatCard 
          title="Appointments" 
          value="48" 
          icon={Calendar} 
          color="#f59e0b" // Amber
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Patient Health Trends" className="lg:col-span-2">
          <div className="h-[350px] flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
             {/* Yahan aapka ReadingChart component aayega */}
             <ReadingChart />
          </div>
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-[rgb(var(--primary))]" />
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--text-h))]">Patient Update</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">John Doe's heart rate stabilized.</p>
                  <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;