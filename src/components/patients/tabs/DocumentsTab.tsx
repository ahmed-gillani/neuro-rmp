// // src/components/patients/tabs/DocumentsTab.tsx
// import { useState } from 'react';
// import Card from '../../common/Card';
// import Button from '../../common/Button';
// import { Download, Trash2, Upload, FileText } from 'lucide-react';
// import type { Patient } from '../../../types';

// export default function DocumentsTab({ patient }: { patient: Patient }) {
//   const [activeCategory, setActiveCategory] = useState<'All' | 'Doctor Note' | 'Consent' | 'Lab Report'>('All');

//   const [documents] = useState([
//     { id: 1, name: "SpO2 Trend Report", category: "Doctor Note", date: "May 24, 2026", size: "2.4 MB" },
//     { id: 2, name: "Signed Care Plan", category: "Consent", date: "May 20, 2026", size: "1.1 MB" },
//     { id: 3, name: "Blood Test Results", category: "Lab Report", date: "May 18, 2026", size: "3.8 MB" },
//   ]);

//   const filteredDocs = activeCategory === 'All'
//     ? documents
//     : documents.filter(doc => doc.category === activeCategory);

//   return (
//     <div className="space-y-4 font-sans animate-in fade-in duration-500">
//       {/* Header & Upload - Fully Functional */}
//       <div className="flex items-center justify-between px-1">
//         <h3 className="text-[13px] font-medium text-slate-500 uppercase tracking-widest">Medical Records</h3>
//         <Button size="sm" className="text-[13px] h-7 bg-blue-600 text-white border-none shadow-sm px-3">
//           <Upload size={12} className="mr-1.5" /> Upload New
//         </Button>
//       </div>

//       {/* Category Filters - Working State */}
//       <div className="flex flex-wrap gap-1.5">
//         {['All', 'Doctor Note', 'Consent', 'Lab Report'].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat as any)}
//             className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all border
//               ${activeCategory === cat
//                 ? 'bg-[#0f172a] text-white border-[#0f172a]'
//                 : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'}`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Documents Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//         {filteredDocs.map((doc) => (
//           <Card key={doc.id} className="py-3 px-3.5 border-slate-100 shadow-none hover:border-blue-200 transition-all group">
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-500 transition-colors">
//                 <FileText size={18} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-[12px] font-medium text-[#1e293b] truncate leading-tight">{doc.name}</p>
//                 <p className="text-[10px] font-medium text-slate-800 mt-1 uppercase tracking-tighter">{doc.category} • {doc.size}</p>
//               </div>
//             </div>
//             <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
//               <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[9px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-colors">
//                 <Download size={11} /> Download
//               </button>
//               <button className="px-2 py-1.5 rounded-md text-slate-300 hover:text-rose-500 transition-colors">
//                 <Trash2 size={12} />
//               </button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
// src/components/patients/tabs/DocumentsTab.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Documents tab with:
//   - Upload via usePatient hook (calls patientService)
//   - AI processing status + live polling via useDocumentPolling
//   - Review workflow for extracted fields with low confidence
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import {
  Download, Trash2, Upload, FileText,
  Loader2, CheckCircle, AlertCircle, Clock, Cpu, Eye
} from 'lucide-react';
import type { Patient } from '../../../types';
import type { PatientDocument } from '../../../types/patient';
import { usePatient } from '../../../hooks/usePatient';
import { useDocumentPolling } from '../../../hooks/useDocumentPolling';

type DocCategory = 'All' | 'Consent Form' | 'Doctor Note' | 'Lab Report' | 'Insurance Card' | 'Other';

// ── AI Status badge ───────────────────────────────────────────────────────────

function AiStatusBadge({ doc }: { doc: PatientDocument }) {
  const styles = {
    Uploaded:   { cls: 'bg-slate-50 text-slate-500 border-slate-200', Icon: Clock,       label: 'Uploaded' },
    Queued:     { cls: 'bg-amber-50 text-amber-600 border-amber-200', Icon: Clock,       label: 'Queued' },
    Processing: { cls: 'bg-blue-50 text-blue-600 border-blue-200',   Icon: Loader2,     label: 'Processing' },
    Completed:  { cls: 'bg-emerald-50 text-emerald-600 border-emerald-200', Icon: CheckCircle, label: 'AI Complete' },
    Failed:     { cls: 'bg-rose-50 text-rose-600 border-rose-200',   Icon: AlertCircle, label: 'AI Failed' },
  } as const;

  const meta = styles[doc.aiStatus] ?? styles.Uploaded;
  const { cls, Icon, label } = meta;

  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cls}`}>
      <Icon size={9} className={doc.aiStatus === 'Processing' ? 'animate-spin' : ''} />
      {label}
    </span>
  );
}

// ── Polling wrapper — only used for documents not yet completed ───────────────

function PollingDocumentCard({
  doc,
  patientId,
  onReview,
}: {
  doc: PatientDocument;
  patientId: string;
  onReview: (doc: PatientDocument) => void;
}) {
  const { document: liveDoc, isPolling, error } = useDocumentPolling(patientId, doc);

  const needsReview =
    liveDoc.aiStatus === 'Completed' &&
    liveDoc.aiExtractedFields?.some((f) => f.requiresReview);

  return (
    <DocumentCard
      doc={liveDoc}
      isPolling={isPolling}
      pollingError={error}
      needsReview={needsReview ?? false}
      onReview={onReview}
    />
  );
}

// ── Document card ─────────────────────────────────────────────────────────────

function DocumentCard({
  doc,
  isPolling = false,
  pollingError = null,
  needsReview = false,
  onReview,
}: {
  doc: PatientDocument;
  isPolling?: boolean;
  pollingError?: string | null;
  needsReview?: boolean;
  onReview: (doc: PatientDocument) => void;
}) {
  const sizeLabel =
    doc.fileSize > 1_000_000
      ? `${(doc.fileSize / 1_000_000).toFixed(1)} MB`
      : `${Math.round(doc.fileSize / 1_000)} KB`;

  return (
    <Card className="py-3 px-3.5 border-slate-100 shadow-none hover:border-blue-200 transition-all group">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0">
          <FileText size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[#1e293b] truncate leading-tight">{doc.fileName}</p>
          <p className="text-[10px] font-medium text-slate-500 mt-0.5 uppercase tracking-tighter">
            {doc.category} • {sizeLabel}
          </p>
          <div className="mt-1.5">
            <AiStatusBadge doc={doc} />
          </div>
          {pollingError && (
            <p className="text-[10px] text-rose-500 mt-1">{pollingError}</p>
          )}
        </div>
      </div>

      {/* Review required banner */}
      {needsReview && (
        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle size={11} className="text-amber-500" />
            <p className="text-[10px] font-semibold text-amber-700">AI fields need review</p>
          </div>
          <button
            onClick={() => onReview(doc)}
            className="text-[9px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wide transition-colors"
          >
            Review
          </button>
        </div>
      )}

      {/* Polling indicator */}
      {isPolling && (
        <div className="mt-2 flex items-center gap-1.5">
          <Loader2 size={10} className="text-blue-400 animate-spin" />
          <p className="text-[10px] text-blue-500 font-medium">AI is analyzing the document...</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-3 pt-2.5 border-t border-slate-50">
        <a
          href={doc.storageUrl}
          download={doc.fileName}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[9px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-colors"
        >
          <Download size={11} /> Download
        </a>
        {doc.aiStatus === 'Completed' && (
          <button
            onClick={() => onReview(doc)}
            className="px-2 py-1.5 rounded-md text-slate-400 hover:text-blue-500 transition-colors"
            title="View extracted data"
          >
            <Eye size={12} />
          </button>
        )}
        <button className="px-2 py-1.5 rounded-md text-slate-300 hover:text-rose-500 transition-colors">
          <Trash2 size={12} />
        </button>
      </div>
    </Card>
  );
}

// ── AI Review Modal ───────────────────────────────────────────────────────────

function AiReviewModal({
  doc,
  onClose,
}: {
  doc: PatientDocument;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-blue-500" />
            <h3 className="text-sm font-black uppercase tracking-wide text-slate-800">AI Extracted Fields</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-lg font-bold">×</button>
        </div>

        <p className="text-[11px] text-slate-500 font-medium">{doc.fileName}</p>

        <div className="space-y-2">
          {doc.aiExtractedFields?.map((field) => (
            <div
              key={field.key}
              className={`p-3 rounded-xl border ${
                field.requiresReview ? 'border-amber-200 bg-amber-50/50' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{field.key}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{field.value}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    field.confidence >= 0.9 ? 'bg-emerald-100 text-emerald-700' :
                    field.confidence >= 0.75 ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {Math.round(field.confidence * 100)}%
                  </span>
                  {field.requiresReview && (
                    <p className="text-[9px] text-amber-600 font-semibold mt-0.5">Review needed</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-slate-900 text-white border-none rounded-xl"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

// ── Main DocumentsTab ─────────────────────────────────────────────────────────

export default function DocumentsTab({ patient }: { patient: Patient }) {
  const { patient: fullPatient, uploadDocument, uploadOp } = usePatient(patient.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<DocCategory>('All');
  const [reviewDoc, setReviewDoc] = useState<PatientDocument | null>(null);

  const documents = fullPatient?.documents ?? [];
  const filteredDocs = activeCategory === 'All'
    ? documents
    : documents.filter((d) => d.category === activeCategory);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadDocument(file, 'Doctor Note');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Terminal statuses don't need polling
  const terminalStatuses = ['Completed', 'Failed', 'Uploaded'];

  return (
    <div className="space-y-4 font-sans animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[13px] font-medium text-slate-500 uppercase tracking-widest">Medical Records</h3>
        <div className="flex items-center gap-2">
          {uploadOp.isLoading && (
            <span className="flex items-center gap-1.5 text-[11px] text-blue-500 font-medium">
              <Loader2 size={11} className="animate-spin" /> Uploading...
            </span>
          )}
          <Button
            size="sm"
            className="text-[13px] h-7 bg-blue-600 text-white border-none shadow-sm px-3"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadOp.isLoading}
          >
            <Upload size={12} className="mr-1.5" /> Upload New
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {uploadOp.error && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle size={13} className="text-rose-500" />
          <p className="text-xs text-rose-700 font-medium">{uploadOp.error}</p>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {(['All', 'Consent Form', 'Doctor Note', 'Lab Report', 'Insurance Card', 'Other'] as DocCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all border
              ${activeCategory === cat
                ? 'bg-[#0f172a] text-white border-[#0f172a]'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Document grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredDocs.map((doc) =>
          terminalStatuses.includes(doc.aiStatus) ? (
            <DocumentCard
              key={doc.id}
              doc={doc}
              needsReview={
                doc.aiStatus === 'Completed' &&
                (doc.aiExtractedFields?.some((f) => f.requiresReview) ?? false)
              }
              onReview={setReviewDoc}
            />
          ) : (
            // Only documents still in progress get polling wired up
            <PollingDocumentCard
              key={doc.id}
              doc={doc}
              patientId={patient.id}
              onReview={setReviewDoc}
            />
          )
        )}

        {filteredDocs.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400">
            <FileText size={28} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No documents in this category</p>
          </div>
        )}
      </div>

      {/* AI Review Modal */}
      {reviewDoc && (
        <AiReviewModal doc={reviewDoc} onClose={() => setReviewDoc(null)} />
      )}
    </div>
  );
}