import type { Patient } from '../../../types';
import Card from '../../common/Card';

export default function OverviewTab({ patient }: { patient: Patient }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Latest Vitals">
        <p className="text-4xl font-bold">148/92</p>
        <p className="text-red-600">Blood Pressure • OOR</p>
      </Card>
      <Card title="Care Team">
        <p>Dr. Sarah Ahmed (Primary)</p>
        <p>Nurse Ayesha (Coordinator)</p>
      </Card>
      <Card title="Enrollment">
        <p>{patient.enrollmentDate}</p>
        <p className="text-sm text-gray-500">Active since {patient.enrollmentDate}</p>
      </Card>
    </div>
  );
}