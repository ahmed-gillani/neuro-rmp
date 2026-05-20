import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { Save, Sparkles, X, ArrowLeft } from 'lucide-react';

interface Props {
  note: any;
  onSave: (note: any) => void;
  onClose?: () => void;
}

export default function NoteEditor({ note, onSave, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [type, setType] = useState(note?.type || 'General');

  const goBack = () => {
    const from = location.state?.from;
    const patientId = location.state?.patientId;

    if (from === 'patient-notes-tab' && patientId) {
      navigate(`/patients/${patientId}`, { state: { activeTab: 'notes' } });
    } else if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const generateAiDraft = () => {
    setContent(`AI Draft:\n\nLatest Readings:\n• BP: 142/88 mmHg (Elevated)\n• Glucose: 195 mg/dL\n\nRecommendation: Review medication and schedule follow-up.`);
  };

  const handleSave = () => {
    onSave({
      ...note,
      title: title || 'Untitled Note',
      content,
      type,
      lastEditedAt: new Date().toISOString(),
    });
    goBack();
  };

  return (
    <Card className="h-full">
      <div className="flex justify-between items-center pb-4 border-b">
        <button onClick={goBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h2 className="text-xl font-semibold">Clinical Note Editor</h2>
        <button onClick={goBack} className="text-slate-400 hover:text-red-500">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Note Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-slate-200 rounded-lg p-3">
            <option value="Monthly Review">Monthly Review</option>
            <option value="OOR Response">OOR Response</option>
            <option value="Care Plan Update">Care Plan Update</option>
            <option value="General">General Note</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-3"
            placeholder="Enter note title"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Content</label>
            <Button variant="outline" size="sm" onClick={generateAiDraft}>
              <Sparkles size={16} className="mr-2" /> AI Draft
            </Button>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 border border-slate-200 rounded-2xl p-4 text-sm resize-y"
            placeholder="Write clinical observations..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex-1">
            <Save size={18} className="mr-2" /> Save Note
          </Button>
          <Button variant="outline" onClick={goBack} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}