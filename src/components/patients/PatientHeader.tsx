// src/components/patients/PatientHeader.tsx
import type { Patient } from '../../types';
import Badge from '../common/Badge';

export default function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <div className="px-5 sm:px-7 pt-5 pb-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500
                        flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0">
          {patient.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight text-white">{patient.name}</h1>
            <Badge status={patient.status} />
          </div>
          <p className="text-slate-400 text-xs mt-0.5">ID: {patient.id}</p>

          {/* Info row */}
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <div>
              <span className="text-slate-400">Phone: </span>
              <span className="font-medium text-slate-200">{patient.phone}</span>
            </div>
            <div>
              <span className="text-slate-400">Provider: </span>
              <span className="font-medium text-slate-200">{patient.primaryProvider}</span>
            </div>
            <div>
              <span className="text-slate-400">Enrolled: </span>
              <span className="font-medium text-slate-200">{patient.enrollmentDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}