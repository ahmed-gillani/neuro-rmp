// src/components/common/PatientCard.tsx
import type { Patient } from '../../types';
import Badge from './Badge';

interface PatientCardProps {
  patient: Patient;
  onView: (patient: Patient) => void;
}

export default function PatientCard({ patient, onView }: PatientCardProps) {
  const initials = patient.name.split(' ').map(n => n[0]).join('');

  return (
    <div
      className="bg-white border border-slate-100 rounded-xl p-3 hover:border-teal-500 hover:shadow-md transition-all duration-200 cursor-pointer group font-sans"
      onClick={() => onView(patient)}
    >
      {/* Top row: Avatar + Name + Badge */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0 shadow-sm">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-800 truncate leading-tight">{patient.name}</p>
          <p className="text-[13px] font-medium text-slate-400 truncate mt-0.5">{patient.phone}</p>
        </div>
        {/* Badge: Solid & Vibrant colors to match icons */}
        <Badge status={patient.status} className="text-[8px] px-1.5 py-0.5 font-bold uppercase tracking-tighter opacity-100 shadow-sm" />
      </div>

      {/* Info rows - High Density */}
      <div className="space-y-1 border-t border-slate-50 pt-2">
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">Provider</span>
          <span className="text-[12px] font-bold text-slate-700 truncate max-w-[60%]">{patient.primaryProvider}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">Enrolled</span>
          <span className="text-[12px] font-bold text-slate-700">{patient.enrollmentDate}</span>
        </div>
      </div>
    </div>
  );
}