// src/mocks/mockPatientData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Rich mock data for Insurance, Programs, and Documents.
// Consumed by MockPatientService — never imported directly by components.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  InsurancePlan,
  PatientProgram,
  PatientDocument,
  RPMProgram,
} from '../types/patient';

// ── Available RPM Programs ────────────────────────────────────────────────────

export const availablePrograms: RPMProgram[] = [
  {
    id: 'prog_rpm',
    code: 'RPM',
    name: 'Remote Patient Monitoring',
    description: 'Continuous monitoring of physiological data via connected devices.',
    billingCodes: ['99453', '99454', '99457', '99458'],
    requiredReadingsPerMonth: 16,
    minimumMinutesPerMonth: 20,
    eligibilityCriteria: [
      'Chronic condition requiring regular monitoring',
      'Physician order on file',
      'Patient consent signed',
    ],
    deviceTypes: ['Blood Pressure Monitor', 'Glucose Meter', 'SpO2 Monitor', 'Weight Scale'],
  },
  {
    id: 'prog_ccm',
    code: 'CCM',
    name: 'Chronic Care Management',
    description: 'Monthly care coordination for patients with 2+ chronic conditions.',
    billingCodes: ['99490', '99439'],
    requiredReadingsPerMonth: 0,
    minimumMinutesPerMonth: 20,
    eligibilityCriteria: [
      'Two or more chronic conditions',
      'Conditions expected to last ≥ 12 months',
      'Comprehensive care plan in place',
    ],
    deviceTypes: [],
  },
];

// ── Insurance ─────────────────────────────────────────────────────────────────

export const mockInsurance: InsurancePlan[] = [
  {
    id: 'ins_001',
    patientId: 'pat_001',
    provider: 'State Life Insurance',
    planType: 'PPO',
    memberId: 'SLI-78432-A',
    groupNumber: 'GRP-2024',
    subscriberName: 'Ahmed Ali',
    effectiveDate: '2026-01-01',
    expiryDate: '2026-12-31',
    eligibilityStatus: 'Verified',
    eligibilityCheckedAt: '2026-03-15T10:00:00',
    isPrimary: true,
    copay: 2000,      // PKR 2000
    deductible: 0,
  },
  {
    id: 'ins_002',
    patientId: 'pat_002',
    provider: 'EFU Health',
    planType: 'HMO',
    memberId: 'EFU-55123',
    effectiveDate: '2026-01-01',
    expiryDate: '2026-12-31',
    eligibilityStatus: 'Pending',
    isPrimary: true,
  },
  {
    id: 'ins_003',
    patientId: 'pat_003',
    provider: 'Jubilee Insurance',
    planType: 'Medicare',
    memberId: 'JUB-99801',
    effectiveDate: '2026-02-01',
    eligibilityStatus: 'Not Checked',
    isPrimary: true,
  },
];

// ── Patient Programs ──────────────────────────────────────────────────────────

export const mockPrograms: PatientProgram[] = [
  {
    id: 'pp_001',
    patientId: 'pat_001',
    programId: 'prog_rpm',
    program: availablePrograms[0],
    status: 'Active',
    enrolledAt: '2026-03-15T09:00:00',
    enrolledBy: 'stf_001',
    primaryDiagnoses: ['I10', 'E11.9'],   // Hypertension, T2 Diabetes
    notes: 'Patient has BP spikes in the morning. Monitor closely.',
  },
  {
    id: 'pp_002',
    patientId: 'pat_002',
    programId: 'prog_rpm',
    program: availablePrograms[0],
    status: 'Active',
    enrolledAt: '2026-02-20T10:00:00',
    enrolledBy: 'stf_001',
    primaryDiagnoses: ['E11.9'],          // T2 Diabetes
  },
  {
    id: 'pp_003',
    patientId: 'pat_001',
    programId: 'prog_ccm',
    program: availablePrograms[1],
    status: 'Active',
    enrolledAt: '2026-03-15T09:00:00',
    enrolledBy: 'stf_001',
    primaryDiagnoses: ['I10', 'E11.9'],
  },
];

// ── Documents ─────────────────────────────────────────────────────────────────

export const mockDocuments: PatientDocument[] = [
  {
    id: 'doc_001',
    patientId: 'pat_001',
    category: 'Consent Form',
    fileName: 'RPM_Consent_Ahmed_Ali.pdf',
    fileSize: 1_120_000,
    mimeType: 'application/pdf',
    storageUrl: '/mock/docs/consent_001.pdf',
    uploadedBy: 'stf_002',
    uploadedAt: '2026-03-15T09:30:00',
    aiJobId: 'job_001',
    aiStatus: 'Completed',
    aiStartedAt: '2026-03-15T09:31:00',
    aiCompletedAt: '2026-03-15T09:33:00',
    aiExtractedFields: [
      { key: 'patientName', value: 'Ahmed Ali', confidence: 0.98, requiresReview: false },
      { key: 'signedDate', value: '2026-03-15', confidence: 0.95, requiresReview: false },
      { key: 'witnessName', value: 'Dr. Sarah Ahmed', confidence: 0.91, requiresReview: false },
    ],
    isReviewed: true,
    reviewedBy: 'stf_001',
    reviewedAt: '2026-03-15T10:00:00',
  },
  {
    id: 'doc_002',
    patientId: 'pat_001',
    category: 'Doctor Note',
    fileName: 'Initial_Assessment_Apr2026.pdf',
    fileSize: 2_400_000,
    mimeType: 'application/pdf',
    storageUrl: '/mock/docs/note_002.pdf',
    uploadedBy: 'stf_001',
    uploadedAt: '2026-04-01T14:00:00',
    aiJobId: 'job_002',
    aiStatus: 'Completed',
    aiStartedAt: '2026-04-01T14:01:00',
    aiCompletedAt: '2026-04-01T14:03:00',
    aiExtractedFields: [
      { key: 'diagnosis', value: 'Hypertension Stage 2', confidence: 0.88, requiresReview: true },
      { key: 'medications', value: 'Amlodipine 5mg, Metformin 500mg', confidence: 0.79, requiresReview: true },
      { key: 'followUpDate', value: '2026-05-01', confidence: 0.92, requiresReview: false },
    ],
    isReviewed: false,
  },
  {
    id: 'doc_003',
    patientId: 'pat_001',
    category: 'Lab Report',
    fileName: 'Labs_HbA1c_May2026.pdf',
    fileSize: 890_000,
    mimeType: 'application/pdf',
    storageUrl: '/mock/docs/lab_003.pdf',
    uploadedBy: 'stf_002',
    uploadedAt: '2026-05-01T11:00:00',
    aiJobId: 'job_003',
    aiStatus: 'Processing',           // ← Still in progress — triggers polling
    aiStartedAt: '2026-05-01T11:01:00',
    isReviewed: false,
  },
  {
    id: 'doc_004',
    patientId: 'pat_002',
    category: 'Consent Form',
    fileName: 'RPM_Consent_Fatima_Khan.pdf',
    fileSize: 1_050_000,
    mimeType: 'application/pdf',
    storageUrl: '/mock/docs/consent_004.pdf',
    uploadedBy: 'stf_002',
    uploadedAt: '2026-02-20T10:30:00',
    aiStatus: 'Completed',
    aiCompletedAt: '2026-02-20T10:33:00',
    aiExtractedFields: [
      { key: 'patientName', value: 'Fatima Khan', confidence: 0.97, requiresReview: false },
      { key: 'signedDate', value: '2026-02-20', confidence: 0.96, requiresReview: false },
    ],
    isReviewed: true,
    reviewedBy: 'stf_001',
    reviewedAt: '2026-02-20T11:00:00',
  },
];