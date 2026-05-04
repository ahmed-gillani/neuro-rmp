// src/components/patients/PatientHeader.tsx
import type { Patient } from '../../types';
import Badge from '../common/Badge';

interface PatientHeaderProps {
  patient: Patient;
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-10">
      <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center text-5xl font-black text-blue-600 flex-shrink-0 shadow-inner">
        {patient.name.split(' ').map(n => n[0]).join('')}
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{patient.name}</h1>
        <p className="text-lg text-slate-800 mt-1">{patient.phone}</p>
        <p className="text-slate-800">{patient.primaryProvider}</p>
      </div>

      <div className="self-start md:self-center">
        <Badge
          variant={patient.status === 'OOR' ? 'error' : 'success'}
          className="text-lg px-8 py-3"
        >
          {patient.status}
        </Badge>
      </div>
    </div>
  );
}