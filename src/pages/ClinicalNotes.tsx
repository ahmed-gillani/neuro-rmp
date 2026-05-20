// src/pages/ClinicalNotes.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Plus, Search, ArrowLeft } from 'lucide-react';
import { mockClinicalNotes } from '../data/mockClinicalNotes';
import NoteEditorModal from '../components/clinicalNotes/NoteEditorModal';
import type { ClinicalNote } from '../types/clinicalNotes';

export default function ClinicalNotes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState<ClinicalNote[]>(mockClinicalNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'All' || note.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleSaveNote = (newNote: ClinicalNote) => {
    setNotes(prev => [newNote, ...prev]);
    console.log('New Note Saved:', newNote);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Clinical Notes</h1>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus size={18} className="mr-2" /> New Clinical Note
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by title, content or doctor..."
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-slate-200 rounded-2xl px-5 py-3 bg-white focus:border-blue-500 outline-none"
        >
          <option value="All">All Types</option>
          <option value="Monthly Review">Monthly Review</option>
          <option value="OOR Response">OOR Response</option>
          <option value="Care Plan Update">Care Plan Update</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Notes List */}
      <Card title={`All Notes (${filteredNotes.length})`}>
        <div className="space-y-3 max-h-[680px] overflow-auto pr-2 custom-scroll">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No notes found matching your criteria.
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 border border-slate-100 hover:border-blue-200 rounded-2xl cursor-pointer transition-all hover:shadow-sm"
                onClick={() => {
                  // For now, just log. You can open in modal later if needed.
                  console.log('Opening note:', note);
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{note.title}</p>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {note.type} • {new Date(note.createdAt).toLocaleDateString()} by {note.createdBy}
                    </p>
                  </div>
                  {note.isAiDraft && (
                    <span className="text-[10px] bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full font-medium">
                      AI Draft
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* New Note Modal */}
      <NoteEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
}