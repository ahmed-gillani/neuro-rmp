// src/types/clinicalNotes.ts
export type NoteType = 'Monthly Review' | 'OOR Response' | 'Care Plan Update' | 'General';

export interface ClinicalNote {
  id: string;
  patientId: string;
  type: NoteType;
  title: string;
  content: string;           // HTML / plain text from editor
  createdAt: string;
  createdBy: string;
  lastEditedAt?: string;
  isAiDraft?: boolean;
  aiConfidence?: number;
}