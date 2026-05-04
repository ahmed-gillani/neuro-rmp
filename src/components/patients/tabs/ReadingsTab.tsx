// src/components/patients/tabs/ReadingsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { useReadingsStore } from '../../../stores/useReadingsStore';
import type { Patient, Reading } from '../../../types';
import ReadingChart from '../../common/ReadingChart';
import { Plus, MessageCircle } from 'lucide-react';
import ManualReadingModal from '../../readings/ManualReadingModal';

interface ReadingsTabProps {
  patient: Patient;
}

const vitalTypes = ['Blood Pressure', 'Glucose', 'Heart Rate', 'SpO2', 'Weight'] as const;
const timeFilters = ['Day', 'Week', 'Month'] as const;

export default function ReadingsTab({ patient }: ReadingsTabProps) {
  const { readings, addReading } = useReadingsStore();
  const [activeVital, setActiveVital] = useState<typeof vitalTypes[number]>('Blood Pressure');
  const [activeTimeFilter, setActiveTimeFilter] = useState<typeof timeFilters[number]>('Week');
  const [showManualModal, setShowManualModal] = useState(false);

  const patientReadings = readings
    .filter(r => r.patientId === patient.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredReadings = patientReadings.filter(r => r.type === activeVital);

  const handleManualReadingAdded = (newReading: Omit<Reading, 'id'>) => {
    addReading({ ...newReading, patientId: patient.id, id: `reading_${Date.now()}` });
    setShowManualModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Readings & Vitals</h3>
          <p className="text-gray-600">Track and analyze patient vitals over time.</p>
        </div>
        <Button onClick={() => setShowManualModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Manual Entry
        </Button>
      </div>

      {/* Vital Type Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-1">
        {vitalTypes.map((vital) => (
          <button
            key={vital}
            onClick={() => setActiveVital(vital)}
            className={`px-6 py-3 text-sm font-semibold rounded-full transition-all ${
              activeVital === vital ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {vital}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-8">
          <Card>
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="font-bold text-lg">{activeVital} Trend</h3>
              <div className="flex bg-gray-100 rounded-full p-1">
                {timeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveTimeFilter(filter)}
                    className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all ${
                      activeTimeFilter === filter ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[400px] p-4">
              <ReadingChart />   {/* Removed vitalType prop to fix error */}
            </div>
          </Card>
        </div>

        {/* Start Chat Box */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col">
            <div className="p-6 border-b">
              <h3 className="font-bold flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                AI Assistant
              </h3>
              <p className="text-sm text-gray-600 mt-1">Ask questions and get intelligent care recommendations.</p>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-blue-600" />
                </div>
                <p className="font-semibold">Start Chat with AI</p>
                <p className="text-sm text-gray-500 mt-2">Get instant insights for this patient</p>
              </div>
            </div>
            <div className="p-6 border-t">
              <Button className="w-full py-6">Start Chat →</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Notes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Create New Note">
          <select className="w-full border border-gray-300 rounded-2xl p-4 mb-4">
            <option>Clinical note</option>
            <option>Medication Review</option>
            <option>Patient Update</option>
            <option>Follow-up</option>
          </select>
          <textarea
            className="w-full h-40 border border-gray-300 rounded-3xl p-5 resize-y focus:border-blue-500"
            placeholder="Write your note here..."
          />
          <Button className="w-full mt-4">Save Note</Button>
        </Card>

        <Card title="Notes History">
          <div className="space-y-4">
            {[
              { date: "11/04/2026", type: "Clinical note", desc: "Medication adjusted after latest blood pressure spike." },
              { date: "10/04/2026", type: "Patient update", desc: "Patient reported improvement in symptoms." },
              { date: "09/04/2026", type: "Follow-up", desc: "Follow-up appointment scheduled for next week." },
            ].map((note, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-all">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{note.date}</span>
                  <span>Dr. Sarah Ahmed</span>
                </div>
                <Badge variant="success" className="mt-2 mb-2">{note.type}</Badge>
                <p className="text-gray-700 text-sm">{note.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Manual Reading Modal */}
      {showManualModal && (
        <ManualReadingModal 
          isOpen={showManualModal} 
          onClose={() => setShowManualModal(false)}
          onSave={handleManualReadingAdded}
          patient={patient}
        />
      )}
    </div>
  );
}