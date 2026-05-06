//src/pages/Dashboard.tsx
import React from 'react';
import { Users, Activity, AlertCircle, Calendar } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import Card from '../components/common/Card';
import ReadingChart from '../components/common/ReadingChart';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="hero-title font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-600 mt-1 text-lg">
            Welcome back, Dr. Ahmed • Here's what's happening today
          </p>
        </div>

        <div className="text-sm text-gray-500 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Live System • Updated just now
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value="1,284"
          icon={Users}
          trend={{ value: 12, isUp: true }}
          className="shadow-sm border border-gray-100"
        />
        <StatCard
          title="Active Monitoring"
          value="842"
          icon={Activity}
          color="#10b981"
          trend={{ value: 8, isUp: true }}
          className="shadow-sm border border-gray-100"
        />
        <StatCard
          title="Critical Alerts"
          value="12"
          icon={AlertCircle}
          color="#ef4444"
          trend={{ value: 3, isUp: false }}
          className="shadow-sm border border-gray-100"
        />
        <StatCard
          title="Today's Appointments"
          value="48"
          icon={Calendar}
          color="#f59e0b"
          trend={{ value: 5, isUp: true }}
          className="shadow-sm border border-gray-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Health Trends Chart */}
        <Card title="Patient Health Trends" className="lg:col-span-8">
          <div className="h-[380px] mt-4">
            <ReadingChart />
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity" className="lg:col-span-4">
          <div className="space-y-6 mt-2">
            {[
              { patient: "Linda Garcia", action: "Blood Pressure reading stabilized", time: "2 hours ago", type: "success" },
              { patient: "Muhammad Ahmed", action: "High Glucose alert resolved", time: "4 hours ago", type: "warning" },
              { patient: "Fatima Khan", action: "Completed daily monitoring", time: "Yesterday", type: "success" },
              { patient: "Imran Malik", action: "Missed morning reading", time: "Yesterday", type: "danger" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center ${activity.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                  activity.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                  }`}>
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{activity.patient}</p>
                  <p className="text-sm text-gray-600 mt-0.5 leading-snug">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
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