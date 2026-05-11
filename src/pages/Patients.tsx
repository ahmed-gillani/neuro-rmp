// // src/pages/Patients.tsx
import { useState } from 'react';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types';
import PatientCard from '../components/common/PatientCard';
import Button from '../components/common/Button';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Patients() {
  const [patients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  return (
    /* Globally forcing font-sans on the entire container */
    <div className="w-full space-y-4 font-sans animate-in fade-in duration-500 selection:bg-blue-100">

      {/* Header with Compact Responsive Button */}
      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm gap-2">
        <div className="min-w-0">
          <h1 className="text-[16px] font-medium text-[#1e293b] uppercase tracking-widest leading-none">
            Patients
          </h1>
          <p className="text-slate-400 text-[12px] sm:text-[12px] font-bold text-[#1e293b] uppercase tracking-tighter">
            {patients.length} active records
          </p>
        </div>

        <Button
          onClick={() => navigate('/onboarding')}
          // Minimalist and responsive button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-none border-none 
                     px-2 py-1 sm:px-4 sm:py-1.5 
                     text-[10px] sm:text-[11px] 
                     w-fit shrink-0 font-bold flex items-center gap-1 transition-all"
        >
          <Plus className="w-2 h-2 sm:w-4 sm:h-4" />
          <span className="whitespace-nowrap uppercase tracking-tighter sm:tracking-normal">
            New Patient
          </span>
        </Button>
      </div>

      {/* Search Bar - Matching Dashboard Theme */}
      <div className="relative max-w-md w-full px-0.5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, phone or provider..."
          className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-10 pr-4 text-xs font-sans 
                     text-[#1e293b] placeholder:text-slate-400
                     focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid - Standard Responsive Behavior */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="font-sans">
            <PatientCard
              patient={patient}
              onView={() => navigate(`/patients/${patient.id}`)}
            />
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12 font-sans">
          <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest italic">
            No matching records found
          </p>
        </div>
      )}
    </div>
  );
}