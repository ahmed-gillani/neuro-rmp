// src/components/patients/tabs/NotesTab.tsx
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Plus } from 'lucide-react';
import type { Patient } from '../../../types';

interface NotesTabProps {
  patient: Patient;
}

export default function NotesTab({ patient }: NotesTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Create New Note */}
      <Card title="Create New Note">
        <select className="w-full border border-gray-300 rounded-2xl p-4 mb-4 text-gray-900 focus:border-blue-500">
          <option>Clinical Note</option>
          <option>Medication Review</option>
          <option>Patient Update</option>
          <option>Progress Note</option>
        </select>
        <textarea
          className="w-full h-48 border border-gray-300 rounded-2xl p-4 resize-y focus:border-blue-500"
          placeholder={`Write note for ${patient.name}...`}
        />
        <Button className="mt-4 w-full">
          <Plus className="w-4 h-4 mr-2" /> Save Note
        </Button>
      </Card>

      {/* Notes History */}
      <Card title="Recent Notes">
        <div className="space-y-4">
          <div className="p-5 border rounded-2xl hover:border-gray-300 transition-colors">
            <p className="font-medium">BP medication adjusted after spike</p>
            <p className="text-xs text-gray-500 mt-2">2026-04-28 • Dr. Sarah Ahmed</p>
          </div>
          <div className="p-5 border rounded-2xl hover:border-gray-300 transition-colors">
            <p className="font-medium">Patient reported dizziness after morning reading</p>
            <p className="text-xs text-gray-500 mt-2">2026-04-27 • Nurse Ayesha</p>
          </div>
          <div className="p-5 border rounded-2xl hover:border-gray-300 transition-colors">
            <p className="font-medium">Care plan goal reviewed - Progress improving</p>
            <p className="text-xs text-gray-500 mt-2">2026-04-20 • Dr. Sarah Ahmed</p>
          </div>
        </div>
      </Card>
    </div>
  );
}