// src/components/patients/tabs/NotesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Patient } from '../../../types';

interface Note {
  id: string;
  date: string;
  type: string;
  description: string;
  author: string;
}

export default function NotesTab({ patient }: { patient: Patient }) {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', date: '11/04/2026', type: 'Clinical', description: 'Medication adjusted after BP spike.', author: 'Dr. Sarah Ahmed' },
    { id: '2', date: '10/04/2026', type: 'Patient Update', description: 'Patient feeling better after dosage change.', author: 'Nurse Ayesha' },
  ]);

  const [newNote, setNewNote] = useState({ type: 'Clinical', description: '' });

  const handleSave = () => {
    if (!newNote.description.trim()) return;
    setNotes([{
      id: Date.now().toString(),
      date: new Intl.DateTimeFormat('en-GB').format(new Date()),
      type: newNote.type,
      description: newNote.description,
      author: 'Dr. Sarah Ahmed'
    }, ...notes]);
    setNewNote({ type: 'Clinical', description: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* New Note */}
      <Card>
        <h3 className="text-blue-600 text-xl font-semibold mb-6">Create New Note</h3>
        <select
          value={newNote.type}
          onChange={(e) => setNewNote({ ...newNote, type: e.target.value })}
          className="w-full border border-slate-200 rounded-2xl p-4 mb-4"
        >
          <option>Clinical</option>
          <option>Patient Update</option>
          <option>Follow-up</option>
        </select>
        <textarea
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
          className="w-full h-48 border border-slate-200 rounded-3xl p-5 resize-y"
          placeholder="Write note here..."
        />
        <Button onClick={handleSave} className="w-full mt-4 btn-primary">
          <Plus className="mr-2" /> Save Note
        </Button>
      </Card>

      {/* Notes History */}
      <Card>
        <h3 className="text-blue-600 text-xl font-semibold mb-6">Notes History</h3>
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="border border-slate-100 p-6 rounded-2xl">
              <div className="flex justify-between text-xs text-slate-700">
                <span>{note.date}</span>
                <span>{note.author}</span>
              </div>
              <Badge status="Active" className="mt-3">{note.type}</Badge>
              <p className="mt-3 text-slate-800">{note.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}