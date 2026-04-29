import Badge from './Badge';
import Button from './Button';
import type { Patient } from '../../types';

interface PatientCardProps {
  patient: Patient;
  onView: (patient: Patient) => void;
}

export default function PatientCard({ patient, onView }: PatientCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg">{patient.name}</p>
          <p className="text-sm text-gray-500">{patient.phone}</p>
        </div>
        <Badge status={patient.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Provider</p>
          <p className="font-medium">{patient.primaryProvider}</p>
        </div>
        <div>
          <p className="text-gray-500">Enrolled</p>
          <p className="font-medium">{patient.enrollmentDate}</p>
        </div>
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        className="w-full mt-5"
        onClick={() => onView(patient)}
      >
        View Profile
      </Button>
    </div>
  );
}