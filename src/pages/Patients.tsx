// src/pages/Patients.tsx
import { useState } from 'react';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types';
import Card from '../components/common/Card';
import PatientCard from '../components/common/PatientCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PatientDetailView from '../components/patients/PatientDetailView';

export default function Patients() {
  const [patients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm) ||
    p.primaryProvider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPatient) {
    return (
      <PatientDetailView
        patient={selectedPatient}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
        <div>
          <h1 className="hero-title font-bold tracking-tight text-slate-900">Patients</h1>
          <p className="text-slate-600 mt-2 text-lg">Caring for {patients.length} lives</p>
        </div>
        <Button
          onClick={() => navigate('/onboarding')}
          className="btn-primary mt-6 sm:mt-0 text-lg px-8 py-3.5"
        >
          <Plus className="mr-2 w-5 h-5" /> New Patient
        </Button>
      </div>

      <Card className="p-2 mb-10 shadow-sm">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone or provider..."
            className="w-full pl-16 py-5 bg-white border border-slate-200 rounded-3xl text-lg focus:outline-none focus:border-teal-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} onClick={() => setSelectedPatient(patient)}>
            <PatientCard patient={patient} onView={() => setSelectedPatient(patient)} />
          </div>
        ))}
      </div>
    </div>
  );
}