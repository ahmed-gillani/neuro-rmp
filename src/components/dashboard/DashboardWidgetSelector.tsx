// src/components/dashboard/DashboardWidgetSelector.tsx
import { useState } from 'react';
import { ChevronDown, LayoutDashboard } from 'lucide-react';

import OorQueueWidget from './OorQueueWidget';
import DailiesQueueWidget from './DailiesQueueWidget';
import MonitoringTimeWidget from './MonitoringTimeWidget';
import PatientAlertsWidget from './PatientAlertsWidget';
import AiInsightPanel from './AiInsightPanel';

const widgets = [
  { id: 'all', label: 'All Widgets' },
  { id: 'oor', label: 'Out-of-Range Queue' },
  { id: 'dailies', label: "Today's Readings" },
  { id: 'monitoring', label: 'Monitoring Time (CPT)' },
  { id: 'alerts', label: 'Active Patient Alerts' },
  { id: 'ai', label: 'AI Clinical Summary' },
];

interface Props {
  oorReadings: any[];
  dailies: any[];
  alerts: any[];
  aiInsight: any;
  cptLogs: any[];
  onViewPatient: (id: string) => void;
  acknowledgeOor: (id: string) => void;
  markDailyReviewed: (id: string) => void;
  bulkAcknowledgeDailies: (ids: string[]) => void;
  onResolveAlert?: (id: string) => void;
}

export default function DashboardWidgetSelector({
  oorReadings,
  dailies,
  alerts,
  aiInsight,
  cptLogs,
  onViewPatient,
  acknowledgeOor,
  markDailyReviewed,
  bulkAcknowledgeDailies,
  onResolveAlert,
}: Props) {
  const [selectedWidget, setSelectedWidget] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = widgets.find(w => w.id === selectedWidget)?.label || 'All Widgets';

  const renderWidget = () => {
    switch (selectedWidget) {
      case 'oor':
        return <OorQueueWidget readings={oorReadings} onAcknowledge={acknowledgeOor} onViewPatient={onViewPatient} />;
      case 'dailies':
        return <DailiesQueueWidget readings={dailies} onMarkReviewed={markDailyReviewed} onBulkAcknowledge={bulkAcknowledgeDailies} />;
      case 'monitoring':
        return <MonitoringTimeWidget logs={cptLogs} />;
      case 'alerts':
        return <PatientAlertsWidget alerts={alerts} onViewPatient={onViewPatient} onResolveAlert={onResolveAlert} />;
      case 'ai':
        return <AiInsightPanel insight={aiInsight} />;
      case 'all':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <OorQueueWidget readings={oorReadings} onAcknowledge={acknowledgeOor} onViewPatient={onViewPatient} />
            <DailiesQueueWidget readings={dailies} onMarkReviewed={markDailyReviewed} onBulkAcknowledge={bulkAcknowledgeDailies} />
            <MonitoringTimeWidget logs={cptLogs} />
            <PatientAlertsWidget alerts={alerts} onViewPatient={onViewPatient} onResolveAlert={onResolveAlert} />
            <AiInsightPanel insight={aiInsight} />
          </div>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Dropdown Selector */}
      <div className="relative w-full max-w-xs">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white border border-slate-200 hover:border-slate-300 rounded-2xl px-5 py-3 text-left shadow-sm transition-all"
        >
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-slate-800">{selectedLabel}</span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2 max-h-80 overflow-auto">
            {widgets.map((widget) => (
              <button
                key={widget.id}
                onClick={() => {
                  setSelectedWidget(widget.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3 hover:bg-slate-100 flex items-center gap-3 transition-colors text-slate-700 ${
                  selectedWidget === widget.id 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'hover:text-slate-900'
                }`}
              >
                {widget.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Render Selected Widget(s) */}
      {renderWidget()}
    </div>
  );
}