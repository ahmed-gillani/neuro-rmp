// src/components/patients/PatientTabs.tsx
import { useEffect, useRef } from 'react';
import { 
  User, Activity, Clock, AlertTriangle, 
  FileText, Monitor, CreditCard, Folder 
} from 'lucide-react';

const tabConfig = [
  { id: 'overview',   label: 'Overview',   icon: User },
  { id: 'readings',   label: 'Readings',   icon: Activity },
  { id: 'monitoring', label: 'Monitoring', icon: Clock },
  { id: 'alerts',     label: 'Alerts',     icon: AlertTriangle },
  { id: 'notes',      label: 'Notes',      icon: FileText },
  { id: 'devices',    label: 'Devices',    icon: Monitor },
  { id: 'billing',    label: 'Billing',    icon: CreditCard },
  { id: 'documents',  label: 'Documents',  icon: Folder },
];

export default function PatientTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabElement = document.getElementById(`tab-${activeTab}`);
    if (activeTabElement && scrollRef.current) {
      activeTabElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeTab]);

  return (
    <div 
      ref={scrollRef}
      className="bg-white border-b border-slate-200/60 w-full overflow-x-auto scroll-smooth"
      style={{ 
        scrollbarWidth: 'none', // Firefox ke liye
        msOverflowStyle: 'none' // IE/Edge ke liye
      }}
    >
      {/* Inline style for Chrome/Safari scrollbar hide */}
      <style>{`
        div::-webkit-scrollbar { display: none; } 
      `}</style>

      <div className="flex px-2 md:px-8 gap-0.5 min-w-max">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 md:gap-1.5 px-2.5 md:px-5 py-2 md:py-3.5 border-b-2 transition-all duration-200 whitespace-nowrap
                ${isActive 
                  ? 'border-blue-600 text-blue-600 bg-blue-50/10 font-medium' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 font-normal'
                }`}
            >
              <Icon size={12} strokeWidth={isActive ? 2 : 1.5} className="md:w-4 md:h-4" />
              <span className="text-[9px] md:text-[11px] uppercase tracking-normal font-sans">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}