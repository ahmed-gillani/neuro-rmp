// src/components/patients/tabs/NotesTab.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Plus, ExternalLink, Calendar } from 'lucide-react';
import type { Patient } from '../../../types';
import { mockClinicalNotes } from '../../../data/mockClinicalNotes';
import NoteEditorModal from '../../clinicalNotes/NoteEditorModal';

export default function NotesTab({ patient }: { patient: Patient }) {
  const navigate = useNavigate();
  const patientNotes = mockClinicalNotes.filter(n => n.patientId === patient.id);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNote = (note: any) => {
    navigate(`/notes/${note.id}`, {
      state: { from: 'patient-notes-tab', patientId: patient.id }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
          <Calendar size={18} /> Clinical Notes
        </h3>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/notes')}
          >
            <ExternalLink size={16} className="mr-2" /> All Notes
          </Button>
          
          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus size={16} className="mr-2" /> New Note
          </Button>
        </div>
      </div>

      {patientNotes.length === 0 ? (
        <Card className="p-10 text-center text-slate-500">
          No clinical notes yet for this patient.
        </Card>
      ) : (
        <div className="space-y-3">
          {patientNotes.map((note) => (
            <Card
              key={note.id}
              className="p-4 hover:border-blue-200 cursor-pointer transition-all"
              onClick={() => openNote(note)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{note.title}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {note.type} • {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {note.isAiDraft && (
                  <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-1 rounded">AI Draft</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <NoteEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newNote) => {
          console.log('New Note Created:', newNote);
          // You can add to local state here later
        }}
        patientId={patient.id}
      />
    </div>
  );
}