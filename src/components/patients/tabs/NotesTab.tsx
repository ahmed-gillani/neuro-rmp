// src/components/patients/tabs/NotesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import type { Patient } from '../../../types';

interface Note {
  id: string;
  date: string;
  type: string;
  description: string;
  author: string;
}

interface NotesTabProps {
  patient: Patient;
}

export default function NotesTab({ patient }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([
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

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editForm, setEditForm] = useState<Note>({
    id: '',
    date: '',
    type: '',
    description: '',
    author: ''
  });

  // Save New Note
  const handleSave = () => {
    if (!newNote.description.trim()) return;

    const noteToAdd: Note = {
      id: Date.now().toString(),
      date: new Intl.DateTimeFormat('en-GB').format(new Date()), // DD/MM/YYYY
      type: newNote.type,
      description: newNote.description.trim(),
      author: 'Dr. Sarah Ahmed' // You can make this dynamic later
    };

    setNotes([noteToAdd, ...notes]); // Newest on top
    setNewNote({ type: 'Clinical note', description: '' });
    
    // alert('Note saved successfully!'); // Optional
  };

  // Start Editing
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setEditForm({ ...note });
  };

  // Save Edited Note
  const handleSaveEdit = () => {
    if (!editForm.description.trim()) return;

    setNotes(notes.map(note => 
      note.id === editForm.id ? { ...editForm } : note
    ));

    setEditingNote(null);
  };

  // Delete Note
  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Create Note Form */}
      <Card title="Create New Note">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Note Type
            </label>
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
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              Description
            </label>
            <textarea
              value={newNote.description}
              onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
              className="w-full h-48 border border-gray-300 rounded-3xl p-5 resize-y focus:border-blue-500 outline-none"
              placeholder="Enter your note details..."
            />
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full py-6 text-base" 
            disabled={!newNote.description.trim()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Save Note
          </Button>
        </div>
      </Card>

      {/* Notes History */}
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
                      <button 
                        onClick={() => handleEdit(note)}
                        className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(note.id)}
                        className="p-2 hover:bg-red-50 rounded-xl text-gray-600 hover:text-red-600 transition-colors"
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

      {/* Edit Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-semibold">Edit Note</h3>
              <button 
                onClick={() => setEditingNote(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Note Type
                </label>
                <select
                  value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:border-blue-500 outline-none"
                >
                  <option>Clinical note</option>
                  <option>Patient update</option>
                  <option>Follow-up</option>
                  <option>Medication Review</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full h-48 border border-gray-300 rounded-3xl p-5 resize-y focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="border-t p-4 flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setEditingNote(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveEdit}
                className="flex-1"
                disabled={!editForm.description.trim()}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}