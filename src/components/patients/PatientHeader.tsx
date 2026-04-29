import type { Patient } from '../../types';
import Badge from '../common/Badge';

interface PatientHeaderProps {
  patient: Patient;
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-10">
      <div className="w-24 h-24 bg-primary-100 rounded-3xl flex items-center justify-center text-5xl font-bold text-primary-600 flex-shrink-0">
        {patient.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-bold">{patient.name}</h1>
        <p className="text-gray-600 mt-1">{patient.phone}</p>
        <p className="text-sm text-gray-500 mt-1">{patient.primaryProvider}</p>
      </div>
      <Badge status={patient.status} className="text-lg px-8 py-3 self-start md:self-center" />
    </div>
  );
}