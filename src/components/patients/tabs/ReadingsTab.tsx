// src/components/patients/tabs/ReadingsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import ReadingChart from '../../common/ReadingChart';
import Button from '../../common/Button';
import { useReadingsStore } from '../../../stores/useReadingsStore';
import { useToast } from '../../../context/ToastContext';
import type { Patient } from '../../../types';
import ManualReadingModal from '../../readings/ManualReadingModal';

interface ReadingsTabProps {
  patient: Patient;
}

export default function ReadingsTab({ patient }: ReadingsTabProps) {
  const { readings } = useReadingsStore();
  const { showToast } = useToast();
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const patientReadings = readings.filter(r => r.patientId === patient.id);

  const handleReadingAdded = () => {
    showToast(`Reading added successfully for ${patient.name}!`, "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Readings & Vitals</h3>
        <Button onClick={() => setIsManualModalOpen(true)}>
          + Manual Entry
        </Button>
      </div>

      {/* Chart */}
      <Card title="7-Day Vitals Trend">
        <ReadingChart />
      </Card>

      {/* Latest Readings */}
      <Card title="Recent Readings">
        {patientReadings.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">No readings recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-4">Date</th>
                  <th className="text-left py-4">Type</th>
                  <th className="text-left py-4">Value</th>
                  <th className="text-center py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {patientReadings.map((reading) => (
                  <tr key={reading.id}>
                    <td className="py-4">
                      {new Date(reading.timestamp).toLocaleDateString()}
                    </td>
                    <td className="font-medium">{reading.type}</td>
                    <td className="font-mono font-bold">{reading.value}</td>
                    <td className="text-center">
                      {reading.isOOR ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">OOR</span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Manual Reading Modal */}
      <ManualReadingModal 
        isOpen={isManualModalOpen} 
        onClose={() => {
          setIsManualModalOpen(false);
          handleReadingAdded();   // Show toast after adding
        }} 
      />
    </div>
  );
}