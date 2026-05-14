// src/types/patient.ts
// ─────────────────────────────────────────────────────────────────────────────
// Core domain types for the Patient module.
// These interfaces are the single source of truth shared by every service,
// hook, store, and component. The backend team maps their API responses
// to these shapes via the response mappers in patientService.ts.
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Patient Status State Machine ──────────────────────────────────────────
//
//   New ──► Active ──► OOR (Out of Range) ──► Active   (recovery)
//    │         │                │
//    │         └──► Off Track ──┘
//    │                   │
//    └───────────────────└──► Discharged
//
// Valid transitions are enforced by PatientStatusMachine in lib/stateMachine.ts

export type PatientStatus = 'New' | 'Active' | 'OOR' | 'Off Track' | 'Discharged';

export const PATIENT_STATUS_TRANSITIONS: Record<PatientStatus, PatientStatus[]> = {
  New:        ['Active', 'Discharged'],
  Active:     ['OOR', 'Off Track', 'Discharged'],
  OOR:        ['Active', 'Off Track', 'Discharged'],
  'Off Track':['Active', 'Discharged'],
  Discharged: [], // terminal state — no transitions out
};

// ── 2. Insurance Eligibility ──────────────────────────────────────────────────

export type InsurancePlanType = 'HMO' | 'PPO' | 'Medicare' | 'Medicaid' | 'Self-Pay' | 'Other';
export type EligibilityStatus = 'Pending' | 'Verified' | 'Denied' | 'Expired' | 'Not Checked';

export interface InsurancePlan {
  id: string;
  patientId: string;
  provider: string;                 // e.g. "United Healthcare"
  planType: InsurancePlanType;
  memberId: string;
  groupNumber?: string;
  subscriberName?: string;
  effectiveDate: string;            // ISO date
  expiryDate?: string;              // ISO date
  eligibilityStatus: EligibilityStatus;
  eligibilityCheckedAt?: string;    // ISO timestamp
  eligibilityNote?: string;         // denial reason or special instructions
  copay?: number;                   // in USD cents
  deductible?: number;              // in USD cents
  isPrimary: boolean;
}

// ── 3. RPM Program ────────────────────────────────────────────────────────────

export type ProgramCode =
  | 'CCM'     // Chronic Care Management
  | 'RPM'     // Remote Patient Monitoring
  | 'BHI'     // Behavioral Health Integration
  | 'PCM'     // Principal Care Management
  | 'CPCM';   // Complex Chronic Care Management

export type ProgramStatus = 'Pending Enrollment' | 'Active' | 'Suspended' | 'Graduated' | 'Disenrolled';

export interface RPMProgram {
  id: string;
  code: ProgramCode;
  name: string;                     // e.g. "Remote Patient Monitoring"
  description?: string;
  billingCodes: string[];           // CPT codes, e.g. ["99453", "99454"]
  requiredReadingsPerMonth: number;
  minimumMinutesPerMonth: number;   // clinical time required for billing
  eligibilityCriteria: string[];    // human-readable criteria list
  deviceTypes: string[];            // which device types this program tracks
}

export interface PatientProgram {
  id: string;
  patientId: string;
  programId: string;
  program: RPMProgram;              // hydrated on read
  status: ProgramStatus;
  enrolledAt: string;               // ISO timestamp
  enrolledBy: string;               // staff userId
  graduatedAt?: string;
  disenrolledAt?: string;
  disenrollReason?: string;
  primaryDiagnoses: string[];       // ICD-10 codes
  notes?: string;
}

// ── 4. AI Document Processing ─────────────────────────────────────────────────

export type DocumentCategory = 'Consent Form' | 'Doctor Note' | 'Lab Report' | 'Insurance Card' | 'Other';

export type DocumentMimeType =
  | 'application/pdf'
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp';

// The AI processing pipeline has 5 stages:
//   Uploaded → Queued → Processing → Completed | Failed
export type AiProcessingStatus = 'Uploaded' | 'Queued' | 'Processing' | 'Completed' | 'Failed';

export interface AiExtractedField {
  key: string;                      // e.g. "patientName", "diagnosis"
  value: string;
  confidence: number;               // 0–1 confidence score from AI
  requiresReview: boolean;          // flagged when confidence < threshold
}

export interface PatientDocument {
  id: string;
  patientId: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: number;                 // bytes
  mimeType: DocumentMimeType;
  storageUrl: string;               // signed URL for download
  uploadedBy: string;               // staff userId
  uploadedAt: string;               // ISO timestamp

  // AI processing state
  aiJobId?: string;                 // backend job ID — used for polling
  aiStatus: AiProcessingStatus;
  aiStartedAt?: string;             // ISO timestamp
  aiCompletedAt?: string;           // ISO timestamp
  aiExtractedFields?: AiExtractedField[];
  aiErrorMessage?: string;

  // Review state
  isReviewed: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

// ── 5. Full Patient Model ─────────────────────────────────────────────────────
// Extends the existing slim Patient with all RPM-specific fields.
// The slim Patient (in types/index.ts) stays for list views.
// This full model is used in PatientProfile, onboarding, and hooks.

export interface PatientDemographics {
  id: string;
  name: string;
  dob: string;                      // ISO date
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  preferredLanguage?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface PatientFull extends PatientDemographics {
  // Status & lifecycle
  status: PatientStatus;
  statusChangedAt?: string;
  statusChangedBy?: string;
  statusChangeReason?: string;

  // Enrollment
  enrollmentDate: string;
  primaryProvider: string;          // staff userId or name
  careCoordinator?: string;

  // Last activity
  lastReadingDate?: string;
  lastContactDate?: string;

  // Relations (hydrated by service)
  insurance?: InsurancePlan[];
  programs?: PatientProgram[];
  documents?: PatientDocument[];
}

// ── 6. Onboarding Flow ────────────────────────────────────────────────────────

export type OnboardingStepId =
  | 'demographics'
  | 'insurance'
  | 'program'
  | 'documents'
  | 'review';

export interface OnboardingFormState {
  demographics: Partial<PatientDemographics>;
  insurance: Partial<InsurancePlan>;
  program: {
    selectedProgramId?: string;
    primaryDiagnoses: string[];
    notes?: string;
  };
  documents: {
    pendingUploads: File[];
  };
}

// ── 7. Pagination & Filter helpers ───────────────────────────────────────────

export interface PatientFilters {
  status?: PatientStatus | 'all';
  primaryProvider?: string | 'all';
  programCode?: ProgramCode | 'all';
  searchQuery?: string;
  dateRange?: { from: string; to: string };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}