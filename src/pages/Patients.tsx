// //src/pages/Patients.tsx
import { useState } from 'react';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Search, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Tab Components
import PatientHeader from '../components/patients/PatientHeader';
import PatientTabs from '../components/patients/PatientTabs';
import OverviewTab from '../components/patients/tabs/OverviewTab';
import ReadingsTab from '../components/patients/tabs/ReadingsTab';
import MonitoringTab from '../components/patients/tabs/MonitoringTab';
import AlertsTab from '../components/patients/tabs/AlertsTab';
import NotesTab from '../components/patients/tabs/NotesTab';
import DevicesTab from '../components/patients/tabs/DevicesTab';
import BillingTab from '../components/patients/tabs/BillingTab';
import DocumentsTab from '../components/patients/tabs/DocumentsTab';

const tabComponents: any = {
  overview: OverviewTab,
  readings: ReadingsTab,
  monitoring: MonitoringTab,
  alerts: AlertsTab,
  notes: NotesTab,
  devices: DevicesTab,
  billing: BillingTab,
  documents: DocumentsTab,
};

export default function Patients() {
  const [patients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const navigate = useNavigate();

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.primaryProvider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="space-y-6">
      {!selectedPatient ? (
        <>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-[rgb(var(--text-h))]">Patients</h1>
              <p className="text-[rgb(var(--muted-foreground))] text-sm">Manage and monitor all enrolled patients</p>
            </div>
            <Button onClick={() => navigate('/onboarding')}>
              <Plus className="w-4 h-4 mr-2" /> New Patient Onboarding
            </Button>
          </div>

          <Card className="border-none shadow-sm">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search patients or providers..."
                className="w-full pl-12 py-3 bg-[rgb(var(--muted))] border-none rounded-[var(--radius-btn)] focus:ring-2 focus:ring-[rgb(var(--primary)/0.2)] outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className="p-4 border border-[rgb(var(--border))] rounded-[var(--radius-btn)] hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--primary)/0.02)] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[rgb(var(--primary)/0.1)] rounded-xl flex items-center justify-center text-lg font-bold text-[rgb(var(--primary))]">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-[rgb(var(--text-h))] group-hover:text-[rgb(var(--primary))]">{patient.name}</p>
                      <p className="text-xs text-[rgb(var(--muted-foreground))]">{patient.primaryProvider}</p>
                    </div>
                  </div>
                  <Badge status={patient.status} />
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setSelectedPatient(null)}
            className="mb-6 flex items-center gap-2 text-[rgb(var(--primary))] hover:underline font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Patients
          </button>

          <Card className="p-0 overflow-hidden border-none shadow-sm">
            <div className="p-8">
              <PatientHeader patient={selectedPatient} />
              <div className="mt-8 border-b border-[rgb(var(--border))]">
                <PatientTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              <div className="mt-8">
                {ActiveTabComponent && <ActiveTabComponent patient={selectedPatient} />}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}