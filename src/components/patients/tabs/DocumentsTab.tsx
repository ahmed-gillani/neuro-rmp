// src/components/patients/tabs/DocumentsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Download, Trash2, Upload, FileText } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import type { Patient } from '../../../types';

interface DocumentsTabProps {
  patient: Patient;
}

export default function DocumentsTab({ patient }: DocumentsTabProps) {
  const { showToast } = useToast();
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Consent Form",
      type: "PDF",
      date: "May 24, 2026",
      icon: "📄"
    },
    {
      id: 2,
      name: "Care Plan - May 2026",
      type: "PDF",
      date: "Updated 3 days ago",
      icon: "📋"
    }
  ]);

  const handleUpload = () => {
    // Simulate file upload
    const newDoc = {
      id: Date.now(),
      name: "New Document.pdf",
      type: "PDF",
      date: "Just now",
      icon: "📄"
    };
    
    setDocuments([newDoc, ...documents]);
    showToast("Document uploaded successfully!", "success");
  };

  const handleDownload = (docName: string) => {
    showToast(`Downloading ${docName}...`, "info");
    // In real app, this would trigger actual file download
    setTimeout(() => {
      showToast(`${docName} downloaded`, "success");
    }, 800);
  };

  const handleDelete = (id: number, docName: string) => {
    if (window.confirm(`Delete "${docName}"?`)) {
      setDocuments(documents.filter(doc => doc.id !== id));
      showToast(`${docName} deleted`, "success");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Documents & Reports — {patient.name}
        </h3>
        <Button onClick={handleUpload}>
          <Upload className="w-4 h-4 mr-2" /> Upload New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-all group">
            <div className="flex items-start gap-4">
              <div className="text-4xl opacity-80">{doc.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                <p className="text-sm text-gray-500 mt-1">{doc.date}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleDownload(doc.name)}
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => handleDelete(doc.id, doc.name)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No documents available.</p>
        </Card>
      )}
    </div>
  );
}