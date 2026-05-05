// src/components/patients/tabs/DocumentsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Download, Trash2, Upload } from 'lucide-react';
import type { Patient } from '../../../types';

interface DocumentsTabProps {
  patient: Patient;
}

export default function DocumentsTab({ patient }: DocumentsTabProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Doctor Note' | 'Consent'>('All');

  const [documents] = useState([
    {
      id: 1,
      name: "SpO2 Report",
      category: "Doctor Note",
      date: "May 24, 2026",
      icon: "📄"
    },
    {
      id: 2,
      name: "Care Plan",
      category: "Consent",
      date: "May 20, 2026",
      icon: "📋"
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
      // In real app, remove from state
    }
  };

  const handleUpload = () => {
    alert("Upload functionality ready! (File picker would open here)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Documents</h3>
          <p className="text-gray-600">Upload, categorize, and retrieve patient documents</p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2">
        {['All', 'Doctor Note', 'Consent'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="p-6 hover:shadow-md transition-all group">
            <div className="flex items-start gap-4">
              <div className="text-5xl opacity-80 mt-1">{doc.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500 mt-1">{doc.category}</p>
                <p className="text-xs text-gray-500 mt-3">{doc.date}</p>
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
        <Card className="p-16 text-center text-gray-500">
          No documents found in this category.
        </Card>
      )}
    </div>
  );
}