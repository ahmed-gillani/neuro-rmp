//src/components/readings/ManualReadingModal.tsx
import { useState } from 'react';
import Button from '../common/Button';
import type { Patient, Reading } from '../../types';

interface ManualReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newReading: Omit<Reading, 'id'>) => void;
  patient: Patient;
}

export default function ManualReadingModal({
  isOpen,
  onClose,
  onSave,
  patient
}: ManualReadingModalProps) {

  const [formData, setFormData] = useState({
    type: 'Blood Pressure' as Reading['type'],
    value: '',
    unit: 'mmHg',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.value) return;

    onSave({
      patientId: patient.id,
      type: formData.type,
      value: formData.value,
      unit: formData.unit,
      timestamp: new Date().toISOString(),
      isOOR: parseFloat(formData.value) > 140 || formData.type === 'Glucose' && parseFloat(formData.value) > 180,
      notes: formData.notes || undefined,
    });

    // Reset form
    setFormData({
      type: 'Blood Pressure',
      value: '',
      unit: 'mmHg',
      notes: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900">Add Manual Reading</h2>
          <p className="text-gray-700 mt-1">for {patient.name}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Reading Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Reading['type'] })}
                className="w-full border border-gray-300 rounded-2xl p-4 focus:border-blue-500 outline-none"
              >
                <option value="Blood Pressure">Blood Pressure</option>
                <option value="Glucose">Glucose</option>
                <option value="Heart Rate">Heart Rate</option>
                <option value="SpO2">SpO2</option>
                <option value="Weight">Weight</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Value</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="e.g. 128/85 or 142"
                className="w-full border border-gray-300 rounded-2xl p-4 text-xl font-medium focus:border-blue-500 outline-none"
                required
              />
              <p className="text-xs text-gray-700 mt-1">Unit: {formData.unit}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional observations..."
                className="w-full h-24 border border-gray-300 rounded-3xl p-4 resize-y focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Reading
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
