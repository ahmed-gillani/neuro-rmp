// src/components/patients/tabs/DocumentsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { Download, Trash2, Upload, FileText } from 'lucide-react';
import type { Patient } from '../../../types';

export default function DocumentsTab({ patient }: { patient: Patient }) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Doctor Note' | 'Consent' | 'Lab Report'>('All');

  const [documents] = useState([
    { id: 1, name: "SpO2 Trend Report", category: "Doctor Note", date: "May 24, 2026", size: "2.4 MB" },
    { id: 2, name: "Signed Care Plan", category: "Consent", date: "May 20, 2026", size: "1.1 MB" },
    { id: 3, name: "Blood Test Results", category: "Lab Report", date: "May 18, 2026", size: "3.8 MB" },
  ]);

  const filteredDocs = activeCategory === 'All'
    ? documents
    : documents.filter(doc => doc.category === activeCategory);

  return (
    <div className="space-y-4 font-sans animate-in fade-in duration-500">
      {/* Header & Upload - Fully Functional */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Medical Records</h3>
        <Button size="sm" className="text-[10px] h-7 bg-blue-600 text-white border-none shadow-sm px-3">
          <Upload size={12} className="mr-1.5" /> Upload New
        </Button>
      </div>

      {/* Category Filters - Working State */}
      <div className="flex flex-wrap gap-1.5">
        {['All', 'Doctor Note', 'Consent', 'Lab Report'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all border
              ${activeCategory === cat 
                ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="py-3 px-3.5 border-slate-100 shadow-none hover:border-blue-200 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-500 transition-colors">
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[#1e293b] truncate leading-tight">{doc.name}</p>
                <p className="text-[9px] font-medium text-slate-400 mt-1 uppercase tracking-tighter">{doc.category} • {doc.size}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[9px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                 <Download size={11} /> Download
               </button>
               <button className="px-2 py-1.5 rounded-md text-slate-300 hover:text-rose-500 transition-colors">
                 <Trash2 size={12} />
               </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}