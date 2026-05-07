// src/components/patients/tabs/NotesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Plus, User } from 'lucide-react';

export default function NotesTab() {
  const [notes, setNotes] = useState([
    { id: '1', date: '11/04/2026', type: 'Clinical', text: 'Medication adjusted after BP spike.', author: 'Dr. Sarah Ahmed' },
  ]);
  const [newNote, setNewNote] = useState("");

  const handleSaveNote = () => {
    if(!newNote.trim()) return;
    const entry = { id: Date.now().toString(), date: 'Today', type: 'Clinical', text: newNote, author: 'Dr. Sarah Ahmed' };
    setNotes([entry, ...notes]);
    setNewNote("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 font-sans animate-in fade-in duration-500">
      <div className="lg:col-span-5">
        <Card noPadding title="New Entry" className="border-slate-100">
          <div className="p-4 space-y-3.5">
            <textarea 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter clinical observations..." 
              className="w-full h-32 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] font-medium outline-none focus:border-blue-400 resize-none" 
            />
            <Button onClick={handleSaveNote} size="sm" className="w-full py-2.5 bg-[#0f172a] text-white text-[11px] font-medium border-none">
              <Plus size={14} className="mr-1.5" /> Save Note
            </Button>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-7 space-y-2">
        {notes.map(note => (
          <div key={note.id} className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] font-medium px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded uppercase">{note.type}</span>
              <span className="text-[9px] font-medium text-slate-400">{note.date}</span>
            </div>
            <p className="text-[11px] font-medium text-slate-700 leading-relaxed italic">"{note.text}"</p>
            <div className="mt-2.5 pt-2.5 border-t border-slate-50 flex items-center gap-1.5">
               <User size={10} className="text-slate-300" />
               <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">— {note.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}