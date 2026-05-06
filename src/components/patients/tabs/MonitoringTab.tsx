// src/components/patients/tabs/MonitoringTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import { Edit2, Trash2, Clock } from 'lucide-react';
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

  const [selectedDate, setSelectedDate] = useState("2026-05-06");
  const [customNote, setCustomNote] = useState("");

  const [history, setHistory] = useState([
    { id: '1', date: "2026-05-04", time: "08:15:20", note: "Medication review completed", status: "Completed" },
    { id: '2', date: "2026-05-03", time: "12:45:10", note: "Patient called with dizziness", status: "Completed" },
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
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this entry?")) {
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
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-slate-900">Monitoring</h3>
        <p className="text-slate-600 mt-1">Log and track patient monitoring sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Log New Session */}
        <Card>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-8 h-8 text-teal-600" />
              <h4 className="text-blue-600 text-xl font-semibold">Log Monitoring Time</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {['hours', 'minutes', 'seconds'].map((field, i) => (
                <div key={i}>
                  <p className="text-xs font-bold text-black mb-2 uppercase tracking-widest">
                    {field}
                  </p>
                  <input
                    type="number"
                    value={monitoringTime[field as keyof typeof monitoringTime]}
                    onChange={(e) => handleInputChange(field as any, e.target.value)}
                    className="w-full text-center stat-input border border-black focus:border-teal-400 outline-none text-black bg-white"
                  />
                </div>
              ))}
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold text-slate-500 mb-2">Date</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl p-4 text-slate-900"
              />
            </div>

            <div className="mb-8">
              <p className="text-xs font-bold text-slate-500 mb-2">Notes</p>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Additional observations..."
                className="w-full h-32 border border-slate-200 rounded-3xl p-5 resize-y text-slate-900"
              />
            </div>

            <Button onClick={handleSave} className="w-full btn-primary py-4 sm:py-6 text-base">
              Save Monitoring Entry
            </Button>
          </div>
        </Card>

        {/* History */}
        <Card title="Monitoring History">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left py-5 px-6 font-semibold text-xs text-slate-600">DATE</th>
                  <th className="text-left py-5 px-6 font-semibold text-xs text-slate-600">TIME</th>
                  <th className="text-left py-5 px-6 font-semibold text-xs text-slate-600">NOTE</th>
                  <th className="text-center py-5 px-6 font-semibold text-xs text-slate-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50">
                    <td className="py-5 px-6 font-medium">{entry.date}</td>
                    <td className="py-5 px-6 font-mono text-slate-600">{entry.time}</td>
                    <td className="py-5 px-6 text-slate-700">{entry.note}</td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => handleEdit(entry)} className="text-teal-600 hover:text-teal-700">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(entry.id)} className="text-red-600 hover:text-red-700">
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
          <div className="space-y-6 text-slate-900">
            <div>
              <label className="block text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                value={editingEntry.date}
                onChange={(e) => setEditingEntry({ ...editingEntry, date: e.target.value })}
                className="w-full border border-slate-200 rounded-2xl p-4"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Time</label>
              <input
                type="text"
                value={editingEntry.time}
                onChange={(e) => setEditingEntry({ ...editingEntry, time: e.target.value })}
                className="w-full border border-slate-200 rounded-2xl p-4"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Note</label>
              <textarea
                value={editingEntry.note}
                onChange={(e) => setEditingEntry({ ...editingEntry, note: e.target.value })}
                className="w-full h-32 border border-slate-200 rounded-3xl p-5"
              />
            </div>
            <div className="flex gap-4 pt-6">
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleUpdateEntry} className="flex-1">Update Entry</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}