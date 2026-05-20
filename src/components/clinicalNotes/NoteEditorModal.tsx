// src/components/clinicalNotes/NoteEditorModal.tsx
import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Save, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: any) => void;
  patientId?: string;
}

export default function NoteEditorModal({ isOpen, onClose, onSave, patientId }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'Monthly Review' | 'OOR Response' | 'Care Plan Update' | 'General'>('General');

  const generateAiDraft = () => {
    setContent(`AI Generated Draft:\n\n• Latest BP: 142/88 mmHg (Elevated)\n• Glucose: 195 mg/dL\n• Recommendation: Review medication compliance.`);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote = {
      id: `note_${Date.now()}`,
      patientId: patientId || 'general',
      type,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      createdBy: 'Dr. Ahmed',
      isAiDraft: false,
    };

    onSave(newNote);
    // Reset form
    setTitle('');
    setContent('');
    setType('General');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Clinical Note">
      <div className="space-y-5 py-2">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">Note Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full border border-slate-200 rounded-lg p-3"
          >
            <option value="Monthly Review">Monthly Review</option>
            <option value="OOR Response">OOR Response</option>
            <option value="Care Plan Update">Care Plan Update</option>
            <option value="General">General Note</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-3"
            placeholder="e.g. Monthly Review - May 2026"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Clinical Note Content</label>
            <Button variant="outline" size="sm" onClick={generateAiDraft}>
              <Sparkles size={16} className="mr-2" /> AI Draft
            </Button>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-80 border border-slate-200 rounded-2xl p-4 text-sm resize-y"
            placeholder="Write your observations, recommendations, etc..."
          />
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleSave} className="flex-1" disabled={!title.trim() || !content.trim()}>
            <Save size={18} className="mr-2" /> Save Note
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}