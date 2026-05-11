// src/pages/Admin.tsx
import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Edit2, Users, UserCheck, Activity, ShieldCheck, Mail, Phone, MapPin, Hash } from 'lucide-react';
import LocationManagement from './Locations';
import Staff from './Staff';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'organization' | 'locations' | 'staff' | 'providers' | 'statuses'>('organization');

  return (
    <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">

      {/* Page Header - Clean & Visible */}
      <div className="flex flex-col px-1">
        <h1 className="text-lg font-medium text-[#1e293b] tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 text-[13px] font-medium uppercase tracking-widest leading-none mt-1">Management Console</p>
      </div>

      {/* Stats Grid - Balanced Contrast */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Total Users', val: '100', icon: Users, color: '#3b82f6' },
          { label: 'Active', val: '100', icon: Activity, color: '#10b981' },
          { label: 'Providers', val: '14', icon: UserCheck, color: '#6366f1' },
          { label: 'Staff', val: '9', icon: ShieldCheck, color: '#a855f7' },
          { label: 'Patients', val: '68', icon: Users, color: '#f43f5e' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tight truncate leading-none">{stat.label}</p>
                <p className="text-xl font-medium text-[#1e293b] mt-2 leading-none">{stat.val}</p>
              </div>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon size={14} style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Tabs - Medium Weight & Blue Accent */}
      <div className="flex justify-center w-full pt-1">
        <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/40 w-fit overflow-x-auto no-scrollbar flex-nowrap">
          {['organization', 'locations', 'staff', 'providers', 'statuses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-1.5 text-[12px] font-medium rounded-lg transition-all uppercase tracking-normal whitespace-nowrap ${activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/40'
                  : 'text-slate-500 hover:text-slate-800 font-normal'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Organization Card - Vibrant Restoration */}
      <div className="mt-2 transition-all duration-300">
        {activeTab === 'organization' && (
          <div className="flex justify-start font-sans">
            <Card noPadding className="w-fit min-w-[450px] max-w-full border-slate-100 shadow-sm overflow-hidden">
              <div className="p-3.5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between gap-12 font-sans">
                <div className="flex items-center gap-3">
                  {/* Fixed: Icon back to Vibrant Blue */}
                  <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-medium text-base shadow-sm">H</div>
                  <div className="shrink-0">
                    <h2 className="text-sm font-medium text-[#1e293b] leading-tight tracking-tight">HealthCare RPM Network</h2>
                    <p className="text-[12px] font-medium text-blue-500 uppercase tracking-widest leading-none mt-1">Main Organization</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8 px-3 text-[14px] font-medium border-slate-200 text-slate-600 shrink-0">
                  <Edit2 size={11} className="mr-1.5" /> Edit Info
                </Button>
              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                {[
                  { label: 'Facility Name', val: 'HealthCare RPM Network', icon: ShieldCheck },
                  { label: 'Reg Number', val: 'HCN-2024-001', icon: Hash },
                  { label: 'Contact', val: '+1 (555) 100-2000', icon: Phone },
                  { label: 'Email', val: 'admin@healthcarerpm.com', icon: Mail },
                  { label: 'Address', val: '123 Medical Plaza, San Francisco, CA', icon: MapPin, full: true },
                ].map((item, i) => (
                  <div key={i} className={`flex items-start gap-2.5 ${item.full ? 'sm:col-span-2' : ''}`}>
                    <div className="mt-0.5 text-slate-700 shrink-0"><item.icon size={12} /></div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-slate-500 uppercase tracking-tight mb-0.5 leading-none">{item.label}</p>
                      <p className="text-[13px] font-normal text-slate-700 leading-snug">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'locations' && <LocationManagement />}
        {activeTab === 'staff' && <Staff />}
      </div>
    </div>
  );
};

export default Admin;