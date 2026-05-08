// src/components/patients/PatientDetailView.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import PatientHeader from './PatientHeader';
import PatientTabs from './PatientTabs';
import type { Patient } from '../../types';

import OverviewTab from './tabs/OverviewTab';
import ReadingsTab from './tabs/ReadingsTab';
import MonitoringTab from './tabs/MonitoringTab';
import AlertsTab from './tabs/AlertsTab';
import NotesTab from './tabs/NotesTab';
import DevicesTab from './tabs/DevicesTab';
import BillingTab from './tabs/BillingTab';
import DocumentsTab from './tabs/DocumentsTab';

interface PatientDetailViewProps {
  patient: Patient;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

export default function PatientDetailView({
  patient,
  activeTab,
  setActiveTab,
  onBack,
}: PatientDetailViewProps) {
  const tabComponents: Record<string, React.ComponentType<any>> = {
    overview: OverviewTab, readings: ReadingsTab, monitoring: MonitoringTab,
    alerts: AlertsTab, notes: NotesTab, devices: DevicesTab,
    billing: BillingTab, documents: DocumentsTab,
  };

  const ActiveTabComponent = tabComponents[activeTab] || OverviewTab;

  return (
    // Force w-full and font-sans everywhere
    <div className="bg-slate-50 font-sans min-h-screen w-full selection:bg-blue-100 overflow-x-hidden">
      {/* Zero max-width, zero horizontal padding on mobile, minimal on desktop */}
      <div className="w-full py-1 sm:py-2 px-0 sm:px-2">

        {/* Back Button - Compact & Aligned Left */}
        <div className="px-3 mb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-bold text-[12px] uppercase tracking-wider transition-all group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to List</span>
          </button>
        </div>

        {/* Main Fluid Container */}
        <div className="bg-white rounded-none sm:rounded-xl shadow-sm overflow-hidden border-y sm:border border-slate-200/60 w-full">
          <PatientHeader patient={patient} />
          <PatientTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content Area - Now fills 100% width */}
          <div className="p-3 sm:p-5 bg-slate-50/50 w-full min-h-[700px]">
            <div className="w-full max-w-none">
              <ActiveTabComponent patient={patient} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}