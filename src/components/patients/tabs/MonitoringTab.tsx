// src/components/patients/tabs/MonitoringTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import { Edit2, Trash2 } from 'lucide-react';
import type { Patient } from '../../../types';

interface MonitoringTabProps {
  patient: Patient;
}

export default function MonitoringTab({ patient }: MonitoringTabProps) {
  const [monitoringTime, setMonitoringTime] = useState({
    hours: 15,
    minutes: 18,
    seconds: 47,
  });

  const [selectedDate, setSelectedDate] = useState("2026-04-20");
  const [customNote, setCustomNote] = useState("");

  const [history, setHistory] = useState([
    { id: '1', date: "2026-04-11", time: "08:15:20", note: "Medication review completed", status: "Completed" },
    { id: '2', date: "2026-04-10", time: "12:45:10", note: "Patient called in with dizziness", status: "Completed" },
    { id: '3', date: "2026-04-09", time: "15:30:05", note: "Follow-up appointment scheduled", status: "Completed" },
    { id: '4', date: "2026-04-08", time: "09:50:40", note: "Home visit arranged", status: "Completed" },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const handleInputChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    setMonitoringTime(prev => ({ ...prev, [field]: num }));
  };

  const handleSave = () => {
    const totalTime = `${monitoringTime.hours}:${monitoringTime.minutes.toString().padStart(2, '0')}:${monitoringTime.seconds.toString().padStart(2, '0')}`;

    setHistory([{
      id: Date.now().toString(),
      date: selectedDate,
      time: totalTime,
      note: customNote.trim() || "Monitoring session logged",
      status: "Completed"
    }, ...history]);

    setCustomNote("");
    alert(`✅ Monitoring time logged for ${patient.name}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this monitoring entry?")) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEdit = (entry: any) => {
    setEditingEntry(entry);
    setShowEditModal(true);
  };

  const handleUpdateEntry = () => {
    setHistory(prev => prev.map(item => 
      item.id === editingEntry.id ? editingEntry : item
    ));
    setShowEditModal(false);
    setEditingEntry(null);
    alert("Entry updated successfully!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Monitoring</h3>
        <p className="text-gray-600">Create and manage monitoring entries for the patient in one place.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log Monitoring Time */}
        <Card>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Hours</p>
                <input type="number" value={monitoringTime.hours} onChange={(e) => handleInputChange('hours', e.target.value)} className="w-full text-center text-4xl font-bold border border-gray-200 rounded-2xl p-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Minutes</p>
                <input type="number" value={monitoringTime.minutes} onChange={(e) => handleInputChange('minutes', e.target.value)} className="w-full text-center text-4xl font-bold border border-gray-200 rounded-2xl p-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Seconds</p>
                <input type="number" value={monitoringTime.seconds} onChange={(e) => handleInputChange('seconds', e.target.value)} className="w-full text-center text-4xl font-bold border border-gray-200 rounded-2xl p-4" />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold text-gray-500 mb-2">Date</p>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border border-gray-200 rounded-2xl p-4" />
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold text-gray-500 mb-2">Notes</p>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Enter your notes here..."
                className="w-full h-28 border border-gray-200 rounded-3xl p-5 resize-y"
              />
            </div>

            <Button onClick={handleSave} className="w-full py-6 text-base shadow-lg">
              Save Monitoring Entry
            </Button>
          </div>
        </Card>

        {/* Monitoring History */}
        <Card title="Monitoring History">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-bold text-xs text-gray-700">DATE</th>
                  <th className="text-left py-4 px-6 font-bold text-xs text-gray-700">TIME</th>
                  <th className="text-left py-4 px-6 font-bold text-xs text-gray-700">NOTE</th>
                  <th className="text-center py-4 px-6 font-bold text-xs text-gray-700">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 text-gray-900 font-medium">{entry.date}</td>
                    <td className="py-5 px-6 text-gray-900 font-mono">{entry.time}</td>
                    <td className="py-5 px-6 text-gray-700">{entry.note}</td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => handleEdit(entry)} 
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(entry.id)} 
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Monitoring Entry"
      >
        {editingEntry && (
          <div className="space-y-6 text-black">
            <div>
              <label className="block text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                value={editingEntry.date}
                onChange={(e) => setEditingEntry({ ...editingEntry, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Time</label>
              <input
                type="text"
                value={editingEntry.time}
                onChange={(e) => setEditingEntry({ ...editingEntry, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Note</label>
              <textarea
                value={editingEntry.note}
                onChange={(e) => setEditingEntry({ ...editingEntry, note: e.target.value })}
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-3xl"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button onClick={handleUpdateEntry}>Update Entry</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}