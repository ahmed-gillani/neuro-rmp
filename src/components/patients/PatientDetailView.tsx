// src/components/patients/PatientDetailView.tsx
import { ArrowLeft } from 'lucide-react';
import PatientHeader from './PatientHeader';
import PatientTabs from './PatientTabs';
import type { Patient } from '../../types';

// Import all tabs directly (recommended in React + TypeScript)
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

  // Tab mapping
  const tabComponents: Record<string, React.ComponentType<any>> = {
    overview: OverviewTab,
    readings: ReadingsTab,
    monitoring: MonitoringTab,
    alerts: AlertsTab,
    notes: NotesTab,
    devices: DevicesTab,
    billing: BillingTab,
    documents: DocumentsTab,
  };

  const ActiveTabComponent = tabComponents[activeTab] || OverviewTab;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 mb-8 text-slate-600 hover:text-teal-600 transition-colors group font-medium"
        >
          <div className="w-9 h-9 rounded-2xl border flex items-center justify-center group-hover:border-teal-200 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-lg">Back to All Patients</span>
        </button>

        {/* Main Patient Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Premium Patient Header */}
          <PatientHeader patient={patient} />

          {/* Modern Tabs */}
          <div className="sticky top-0 bg-white z-30 border-b border-slate-100">
            <PatientTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </div>

          {/* Content Area */}
          <div className="p-8 lg:p-12 bg-slate-50">
            <div className="max-w-5xl mx-auto">
              <ActiveTabComponent patient={patient} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}