// src/components/patients/PatientTabs.tsx
import { 
  User, 
  Activity, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Monitor, 
  CreditCard, 
  Folder 
} from 'lucide-react';

interface PatientTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabConfig = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'readings', label: 'Readings', icon: Activity },
  { id: 'monitoring', label: 'Monitoring', icon: Clock },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'devices', label: 'Devices', icon: Monitor },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: Folder },
];

export default function PatientTabs({ activeTab, setActiveTab }: PatientTabsProps) {
  return (
    <div className="px-6 md:px-8 pt-2 bg-white border-b border-slate-200 overflow-x-auto hide-scrollbar">
      <div className="flex gap-2 pb-4">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-200 font-medium text-base min-w-fit
                ${isActive 
                  ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-100' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-800'
                }`}
            >
              <Icon 
                className={`w-5 h-5 transition-all ${isActive ? 'text-teal-600' : 'group-hover:text-slate-700'}`} 
              />
              <span>{tab.label}</span>
              
              {isActive && (
                <div className="ml-1 w-1.5 h-1.5 bg-teal-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}