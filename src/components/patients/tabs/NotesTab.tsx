// src/components/patients/tabs/NotesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Patient } from '../../../types';

interface NotesTabProps {
  patient: Patient;
}

export default function NotesTab({ patient }: NotesTabProps) {
  const [notes] = useState([
    {
      id: '1',
      date: '11/04/2026',
      type: 'Clinical note',
      description: 'Medication adjusted after latest blood pressure spike.',
      author: 'Dr. Sarah Ahmed'
    },
    {
      id: '2',
      date: '10/04/2026',
      type: 'Patient update',
      description: 'Patient reported improvement in symptoms after dosage change.',
      author: 'Nurse Ayesha'
    },
    {
      id: '3',
      date: '09/04/2026',
      type: 'Follow-up',
      description: 'Follow-up appointment scheduled for next week.',
      author: 'Dr. Sarah Ahmed'
    },
    {
      id: '4',
      date: '08/04/2026',
      type: 'Other',
      description: 'Care coordinator notified about device connectivity issue.',
      author: 'Admin'
    },
  ]);

  const [newNote, setNewNote] = useState({
    type: 'Clinical note',
    description: ''
  });

  const handleSave = () => {
    if (!newNote.description.trim()) return;
    alert('Note saved successfully! (Backend integration pending)');
    setNewNote({ type: 'Clinical note', description: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Create Note Form - Left Side */}
      <Card title="Create New Note">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Note Type</label>
            <select
              value={newNote.type}
              onChange={(e) => setNewNote({ ...newNote, type: e.target.value })}
              className="w-full border border-gray-300 rounded-2xl p-4 focus:border-blue-500 outline-none text-gray-900"
            >
              <option>Clinical note</option>
              <option>Patient update</option>
              <option>Follow-up</option>
              <option>Medication Review</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
            <textarea
              value={newNote.description}
              onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
              className="w-full h-48 border border-gray-300 rounded-3xl p-5 resize-y focus:border-blue-500 outline-none"
              placeholder="Enter your note details..."
            />
          </div>

          <Button onClick={handleSave} className="w-full py-6 text-base" disabled={!newNote.description.trim()}>
            <Plus className="w-5 h-5 mr-2" />
            Save Note
          </Button>
        </div>
      </Card>

      {/* Notes History - Right Side (Table Style) */}
      <Card title="Notes History">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left py-4 px-5 font-bold text-gray-700">DATE</th>
                <th className="text-left py-4 px-5 font-bold text-gray-700">TYPE</th>
                <th className="text-left py-4 px-5 font-bold text-gray-700">DESCRIPTION</th>
                <th className="text-center py-4 px-5 font-bold text-gray-700 w-20">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-5 font-medium text-gray-900">{note.date}</td>
                  <td className="py-5 px-5">
                    <Badge variant="success" className="text-xs">{note.type}</Badge>
                  </td>
                  <td className="py-5 px-5 text-gray-700 leading-snug">
                    {note.description}
                  </td>
                  <td className="py-5 px-5">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-xl text-gray-600 hover:text-red-600 transition-colors">
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
  );
}