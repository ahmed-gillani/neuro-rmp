interface PatientTabsProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function PatientTabs({ activeTab, setActiveTab }: PatientTabsProps) {
  const tabs = [
    'overview', 'readings', 'monitoring', 'alerts', 
    'notes', 'devices', 'billing', 'documents'
  ];

  return (
    <div className="flex border-b mb-8 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-8 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === tab 
              ? 'border-primary-600 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}