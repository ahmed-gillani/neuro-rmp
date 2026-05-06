// src/components/patients/PatientHeader.tsx
import Badge from '../common/Badge';
import type { Patient } from '../../types';

interface PatientHeaderProps {
  patient: Patient;
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <div className="patient-hero px-6 sm:px-10 py-8 sm:py-12 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-t-3xl">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center">

        {/* Large Avatar */}
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-white/10 flex items-center justify-center hero-avatar-text font-bold border-2 border-white/30 shadow-lg flex-shrink-0">
          {patient.name.split(' ').map(n => n[0]).join('')}
        </div>

        {/* Patient Info */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="hero-title font-bold tracking-tight text-white text-2xl sm:text-3xl md:text-4xl">
                {patient.name}
              </h1>
              <p className="text-slate-200 text-lg sm:text-xl mt-2">{patient.phone}</p>
            </div>

            <Badge
              status={patient.status}
              className="text-base px-6 py-2 text-lg font-semibold bg-white/6"
            />
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-200">
            <div>
              <p className="text-sm opacity-80">Primary Provider</p>
              <p className="font-semibold text-lg mt-1 text-white">Dr. {patient.primaryProvider}</p>
            </div>

            <div>
              <p className="text-sm opacity-80">Enrolled On</p>
              <p className="font-semibold text-lg mt-1 text-white">
                {new Date(patient.enrollmentDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            {patient.dob && (
              <div>
                <p className="text-sm opacity-80">Date of Birth</p>
                <p className="font-semibold text-lg mt-1 text-white">{patient.dob}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}