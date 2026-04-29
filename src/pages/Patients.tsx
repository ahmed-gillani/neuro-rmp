//src/pages/Patients.tsx
import { useState } from 'react';
import { mockPatients, mockReadings, mockDevices } from '../data/mockData';
import type { Patient } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Search, ArrowLeft } from 'lucide-react';

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

const tabComponents = {
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
  const [activeTab, setActiveTab] = useState<'overview' | 'readings' | 'monitoring' | 'alerts' | 'notes' | 'devices' | 'billing' | 'documents'>('overview');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.primaryProvider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="space-y-6">
      {!selectedPatient ? (
        /* === Patient List View === */
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Patients</h1>
              <p className="text-gray-600">Manage all enrolled patients</p>
            </div>
            <Button>New Patient Onboarding</Button>
          </div>

          <Card>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients or providers..."
                className="w-full pl-11 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className="p-6 border border-gray-200 rounded-2xl hover:border-primary-300 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl font-semibold text-primary-600">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-xl group-hover:text-primary-600">{patient.name}</p>
                      <p className="text-gray-500">{patient.primaryProvider}</p>
                    </div>
                  </div>
                  <Badge status={patient.status} />
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        /* === Patient Detail View with Tabs === */
        <div>
          <button
            onClick={() => setSelectedPatient(null)}
            className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Patients
          </button>

          <Card className="p-8">
            <PatientHeader patient={selectedPatient} />

            <PatientTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-8">
              <ActiveTabComponent patient={selectedPatient} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}