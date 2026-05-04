// // src/components/patients/PatientTabs.tsx
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
    <div className="flex border-b border-gray-200 bg-white overflow-x-auto hide-scrollbar">
      {tabConfig.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center gap-3 px-6 py-5 font-medium whitespace-nowrap border-b-2 transition-all duration-200 min-w-[110px] ${
              isActive
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon 
              className={`w-5 h-5 transition-all ${isActive ? 'text-blue-600' : 'group-hover:text-gray-700'}`} 
            />
            <span className="text-[15px]">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}