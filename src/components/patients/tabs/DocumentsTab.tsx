// src/components/patients/tabs/DocumentsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Download, Trash2, Upload, FileText } from 'lucide-react';
import type { Patient } from '../../../types';

interface DocumentsTabProps {
  patient: Patient;
}

export default function DocumentsTab({ patient }: DocumentsTabProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Doctor Note' | 'Consent' | 'Lab Report'>('All');

  const [documents] = useState([
    {
      id: 1,
      name: "SpO2 Trend Report",
      category: "Doctor Note",
      date: "May 24, 2026",
      size: "2.4 MB",
      icon: "📄"
    },
    {
      id: 2,
      name: "Signed Care Plan",
      category: "Consent",
      date: "May 20, 2026",
      size: "1.1 MB",
      icon: "📋"
    },
    {
      id: 3,
      name: "Blood Test Results",
      category: "Lab Report",
      date: "May 18, 2026",
      size: "3.8 MB",
      icon: "🧪"
    },
  ]);

  const filteredDocs = activeCategory === 'All'
    ? documents
    : documents.filter(doc => doc.category === activeCategory);

  const handleDownload = (name: string) => {
    alert(`Downloading ${name}...`);
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      alert(`${name} deleted successfully!`);
    }
  };

  const handleUpload = () => {
    alert("File upload dialog would open here (in real app)");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">Documents</h3>
          <p className="text-slate-700">Medical records and reports for {patient.name}</p>
        </div>
        <Button onClick={handleUpload} className="btn-primary flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload New Document
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Doctor Note', 'Consent', 'Lab Report'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all ${activeCategory === cat
              ? 'bg-teal-100 text-teal-700 border border-teal-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="group hover:shadow-lg transition-all p-6">
            <div className="flex items-start gap-5">
              <div className="avatar-text mt-1 opacity-80 group-hover:scale-110 transition-transform">
                {doc.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg text-slate-900 line-clamp-1">{doc.name}</p>
                <p className="text-sm text-slate-700 mt-1">{doc.category}</p>
                <p className="text-xs text-slate-600 mt-3">{doc.date} • {doc.size}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleDownload(doc.name)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 hover:bg-red-50"
                onClick={() => handleDelete(doc.id, doc.name)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <Card className="p-20 text-center">
          <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-700">No documents found in this category</p>
        </Card>
      )}
    </div>
  );
}