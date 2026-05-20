// src/data/mockClinicalNotes.ts
import type { ClinicalNote } from '../types/clinicalNotes';

export const mockClinicalNotes: ClinicalNote[] = [
  {
    id: 'note_001',
    patientId: 'p1',
    type: 'Monthly Review',
    title: 'Monthly Review - May 2026',
    content: 'Patient shows good progress. BP average 128/82. Glucose stable. Continue current plan.',
    createdAt: '2026-05-18T10:30:00Z',
    createdBy: 'Dr. Ahmed',
    lastEditedAt: '2026-05-19T08:15:00Z',
  },
  {
    id: 'note_002',
    patientId: 'p1',
    type: 'OOR Response',
    title: 'Elevated BP Response',
    content: 'BP reading 162/98. Patient reports headache. Advised to take extra dose and monitor closely.',
    createdAt: '2026-05-19T09:45:00Z',
    createdBy: 'Dr. Ahmed',
    isAiDraft: true,
    aiConfidence: 0.89,
  },
  {
    id: 'note_003',
    patientId: 'p2',
    type: 'Care Plan Update',
    title: 'Care Plan Adjustment - SpO2',
    content: 'Added daily SpO2 monitoring due to recent desaturation. Target >94%.',
    createdAt: '2026-05-15T14:20:00Z',
    createdBy: 'Nurse Fatima',
  },
];