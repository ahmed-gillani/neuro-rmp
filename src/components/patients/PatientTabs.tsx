// src/components/patients/PatientTabs.tsx
import { 
  User, Activity, Clock, AlertTriangle, 
  FileText, Monitor, CreditCard, Folder 
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
    <div className="flex border-b mb-8 overflow-x-auto pb-1 hide-scrollbar bg-white sticky top-0 z-10">
      {tabConfig.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center gap-3 px-7 py-4 font-semibold whitespace-nowrap border-b-2 transition-all duration-200 min-w-[120px] ${
              isActive 
                ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-200'
            }`}
          >
            <Icon 
              className={`w-5 h-5 transition-transform ${isActive ? 'text-blue-600' : 'group-hover:scale-110'}`} 
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}