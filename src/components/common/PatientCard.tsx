import Badge from './Badge';
import Button from './Button';
import type { Patient } from '../../types';

interface PatientCardProps {
  patient: Patient;
  onView: (patient: Patient) => void;
}

export default function PatientCard({ patient, onView }: PatientCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-all">
      <div className="flex items-start gap-4 md:gap-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {patient.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-blue-600 font-semibold text-base sm:text-lg truncate">{patient.name}</p>
              <p className="text-sm text-gray-600 truncate">{patient.phone}</p>
            </div>
            <div className="flex-shrink-0 text-sm text-black">
              <Badge status={patient.status} />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-500">Provider</p>
              <p className="font-medium text-sm truncate">{patient.primaryProvider}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Enrolled</p>
              <p className="font-medium text-sm">{patient.enrollmentDate}</p>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onView(patient)}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}