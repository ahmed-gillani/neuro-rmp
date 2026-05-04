// src/components/patients/tabs/OverviewTab.tsx
import Card from '../../common/Card';
import type { Patient } from '../../../types';

interface OverviewTabProps {
  patient: Patient;
}

export default function OverviewTab({ patient }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Latest Vitals">
        <p className="text-4xl font-black text-red-600">148/92</p>
        <p className="text-red-600 mt-1">Blood Pressure • Out of Range</p>
      </Card>

      <Card title="Care Team">
        <p className="font-medium">{patient.primaryProvider}</p>
        <p className="text-sm text-gray-500 mt-1">Nurse Ayesha (Care Coordinator)</p>
      </Card>

      <Card title="Enrollment Info">
        <p className="font-medium">{patient.enrollmentDate}</p>
        <p className="text-sm text-gray-500 mt-1">Active since {patient.enrollmentDate}</p>
      </Card>
    </div>
  );
} 