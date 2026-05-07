// src/components/patients/tabs/MonitoringTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Edit2, Trash2, Clock, Plus, X } from 'lucide-react';
import type { Patient } from '../../../types';

interface MonitoringTabProps {
  patient: Patient;
}

export default function MonitoringTab({ patient }: MonitoringTabProps) {
  // State for Timer Inputs
  const [monitoringTime, setMonitoringTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State for Notes and Date
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [customNote, setCustomNote] = useState("");

  // History State
  const [history, setHistory] = useState([
    { id: '1', date: "2026-05-04", time: "08:15:20", note: "Medication review completed" },
    { id: '2', date: "2026-05-03", time: "12:45:10", note: "Patient called with dizziness" },
  ]);

  // Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const handleInputChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    setMonitoringTime(prev => ({ ...prev, [field]: num }));
  };

  const handleSave = () => {
    const totalTime = `${monitoringTime.hours.toString().padStart(2, '0')}:${monitoringTime.minutes.toString().padStart(2, '0')}:${monitoringTime.seconds.toString().padStart(2, '0')}`;

    const newEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      time: totalTime,
      note: customNote.trim() || "Monitoring session logged"
    };

    setHistory([newEntry, ...history]);
    setCustomNote("");
    setMonitoringTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this entry?")) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEdit = (entry: any) => {
    setEditingEntry({ ...entry });
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 font-sans animate-in fade-in duration-500">
      
      {/* Log New Session Card */}
      <div className="lg:col-span-4">
        <Card noPadding title="Log Monitoring Time" className="border-slate-100 shadow-none h-fit">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-medium text-slate-700 uppercase tracking-tight">New Entry</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['hours', 'minutes', 'seconds'] as const).map((field) => (
                <div key={field}>
                  <p className="text-[9px] font-medium text-slate-400 uppercase mb-1 text-center">{field}</p>
                  <input
                    type="number"
                    value={monitoringTime[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 text-xs font-medium text-center focus:border-blue-400 outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Date</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-[11px] outline-none"
              />
            </div>

            <div className="space-y-1">
              <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Clinical Notes</p>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Observations..."
                className="w-full h-24 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] font-medium focus:border-blue-400 outline-none resize-none"
              />
            </div>

            <Button onClick={handleSave} size="sm" className="w-full py-2.5 bg-[#0f172a] text-white text-[11px] font-medium border-none shadow-sm">
              <Plus size={14} className="mr-1.5" /> Save Entry
            </Button>
          </div>
        </Card>
      </div>

      {/* History Table Card */}
      <div className="lg:col-span-8">
        <Card noPadding title="Monitoring History" className="border-slate-100 shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[9px] text-slate-400 uppercase tracking-widest font-sans">
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Time</th>
                  <th className="p-3 font-medium">Note</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {history.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 text-[11px] font-medium text-slate-600">{entry.date}</td>
                    <td className="p-3 text-[11px] font-medium text-[#1e293b] font-mono">{entry.time}</td>
                    <td className="p-3 text-[11px] font-medium text-slate-500 italic truncate max-w-[200px]">{entry.note}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(entry)} className="text-slate-300 hover:text-blue-500"><Edit2 size={12} /></button>
                        <button onClick={() => handleDelete(entry.id)} className="text-slate-300 hover:text-rose-500"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Edit Entry Modal */}
      {showEditModal && editingEntry && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h4 className="text-sm font-medium text-slate-900">Edit Log Entry</h4>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
            </div>
            <div className="space-y-4 font-sans">
              <div>
                <label className="text-[10px] font-medium text-slate-400 uppercase">Duration</label>
                <input 
                  type="text" 
                  value={editingEntry.time} 
                  onChange={e => setEditingEntry({...editingEntry, time: e.target.value})} 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-blue-400" 
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-slate-400 uppercase">Note</label>
                <textarea 
                  value={editingEntry.note} 
                  onChange={e => setEditingEntry({...editingEntry, note: e.target.value})} 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs h-24 outline-none focus:border-blue-400 resize-none" 
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1 text-[11px] h-9">Cancel</Button>
              <Button onClick={handleUpdateEntry} className="flex-1 text-[11px] h-9 bg-blue-600 text-white border-none">Update Log</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}