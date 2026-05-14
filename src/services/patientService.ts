// src/services/patientService.ts
// ─────────────────────────────────────────────────────────────────────────────
// Backend-agnostic service layer for the Patient module.
//
// ARCHITECTURE:
//   IPatientService (interface)
//       ├── MockPatientService   — in-memory, used when VITE_USE_MOCK_API != 'false'
//       └── LivePatientService   — real Axios calls, used in production
//
// SWITCHING TO BACKEND:
//   1. Set VITE_USE_MOCK_API=false  in .env.production
//   2. Set VITE_API_BASE_URL=https://api.yourdomain.com
//   3. Fill in LivePatientService methods below
//   4. Zero changes to hooks, stores, or components
//
// USAGE IN HOOKS:
//   import { patientService } from '../services/patientService';
//   const patient = await patientService.getById('pat_001');
// ─────────────────────────────────────────────────────────────────────────────

import type {
  PatientFull,
  PatientDemographics,
  InsurancePlan,
  PatientProgram,
  PatientDocument,
  PatientFilters,
  PatientStatus,
  AiProcessingStatus,
  PaginatedResponse,
  OnboardingFormState,
} from '../types/patient';

// Pull slim Patient for list views (matches existing usePatientsStore shape)
import type { Patient } from '../types';

// ── Shared API plumbing ───────────────────────────────────────────────────────

const IS_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

interface ApiEnvelope<T> {
  data: T;
  meta?: { page: number; total: number; perPage: number; totalPages: number };
  error?: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('rpm_token'); // swap for your auth store
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  const json = (await res.json()) as ApiEnvelope<T>;
  return json.data;
}

// ── Service Interface — the contract both implementations must fulfill ─────────

export interface IPatientService {
  // List & Search
  list(filters?: PatientFilters, page?: number, perPage?: number): Promise<PaginatedResponse<Patient>>;

  // Single record — returns full hydrated model
  getById(id: string): Promise<PatientFull>;

  // Onboarding — submits all 4 steps atomically
  onboard(form: OnboardingFormState): Promise<PatientFull>;

  // Demographics
  updateDemographics(id: string, data: Partial<PatientDemographics>): Promise<PatientFull>;

  // Status transitions
  transitionStatus(
    id: string,
    newStatus: PatientStatus,
    reason?: string
  ): Promise<PatientFull>;

  // Insurance
  addInsurance(patientId: string, plan: Omit<InsurancePlan, 'id' | 'patientId'>): Promise<InsurancePlan>;
  checkEligibility(patientId: string, insuranceId: string): Promise<InsurancePlan>;

  // Programs
  enrollInProgram(patientId: string, programId: string, diagnoses: string[]): Promise<PatientProgram>;
  disenrollFromProgram(patientId: string, programId: string, reason: string): Promise<PatientProgram>;

  // Documents & AI
  uploadDocument(
    patientId: string,
    file: File,
    category: PatientDocument['category']
  ): Promise<PatientDocument>;

  // Poll AI job status (used by useDocumentPolling hook)
  getDocumentStatus(patientId: string, documentId: string): Promise<PatientDocument>;

  // Soft delete
  discharge(id: string, reason: string): Promise<PatientFull>;
}

// ── MOCK IMPLEMENTATION ───────────────────────────────────────────────────────
// Reads from the existing Zustand store / mockData so the UI is fully
// interactive during development. No MSW worker needed for basic flows.

import { mockPatients, mockReadings } from '../data/mockData';
import { mockDocuments, mockPrograms, mockInsurance } from '../mocks/mockPatientData';

class MockPatientService implements IPatientService {
  // Simulate network delay for realistic UX testing
  private delay(ms = 350) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async list(
    filters?: PatientFilters,
    page = 1,
    perPage = 20
  ): Promise<PaginatedResponse<Patient>> {
    await this.delay();
    let results = [...mockPatients];

    if (filters?.status && filters.status !== 'all') {
      results = results.filter((p) => p.status === filters.status);
    }
    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    const start = (page - 1) * perPage;
    return {
      data: results.slice(start, start + perPage),
      total: results.length,
      page,
      perPage,
      totalPages: Math.ceil(results.length / perPage),
    };
  }

  async getById(id: string): Promise<PatientFull> {
    await this.delay();
    const slim = mockPatients.find((p) => p.id === id);
    if (!slim) throw new Error(`Patient ${id} not found`);

    return {
      ...slim,
      email: undefined,
      city: slim.address?.split(',')[1]?.trim(),
      insurance: mockInsurance.filter((i) => i.patientId === id),
      programs: mockPrograms.filter((pp) => pp.patientId === id),
      documents: mockDocuments.filter((d) => d.patientId === id),
    };
  }

  async onboard(form: OnboardingFormState): Promise<PatientFull> {
    await this.delay(800);
    const newPatient: PatientFull = {
      id: `pat_${Date.now()}`,
      name: form.demographics.name ?? 'Unknown',
      dob: form.demographics.dob ?? '',
      gender: form.demographics.gender ?? 'Other',
      phone: form.demographics.phone ?? '',
      email: form.demographics.email,
      address: form.demographics.address,
      status: 'New',
      enrollmentDate: new Date().toISOString().split('T')[0],
      primaryProvider: '',
    };
    // In mock mode the caller should also call usePatientsStore.getState().addPatient()
    return newPatient;
  }

  async updateDemographics(id: string, data: Partial<PatientDemographics>): Promise<PatientFull> {
    await this.delay();
    const current = await this.getById(id);
    return { ...current, ...data };
  }

  async transitionStatus(
    id: string,
    newStatus: PatientStatus,
    reason?: string
  ): Promise<PatientFull> {
    await this.delay();
    const current = await this.getById(id);
    return {
      ...current,
      status: newStatus,
      statusChangedAt: new Date().toISOString(),
      statusChangeReason: reason,
    };
  }

  async addInsurance(
    patientId: string,
    plan: Omit<InsurancePlan, 'id' | 'patientId'>
  ): Promise<InsurancePlan> {
    await this.delay();
    return {
      ...plan,
      id: `ins_${Date.now()}`,
      patientId,
      eligibilityStatus: 'Not Checked',
    };
  }

  async checkEligibility(patientId: string, insuranceId: string): Promise<InsurancePlan> {
    await this.delay(1200); // eligibility check is slower
    const plan = mockInsurance.find(
      (i) => i.patientId === patientId && i.id === insuranceId
    );
    if (!plan) throw new Error('Insurance plan not found');
    return { ...plan, eligibilityStatus: 'Verified', eligibilityCheckedAt: new Date().toISOString() };
  }

  async enrollInProgram(
    patientId: string,
    programId: string,
    diagnoses: string[]
  ): Promise<PatientProgram> {
    await this.delay();
    const prog = mockPrograms.find((pp) => pp.patientId === patientId && pp.programId === programId);
    if (prog) return prog;
    throw new Error('Program not found in mock data — add to mockPatientData.ts');
  }

  async disenrollFromProgram(
    patientId: string,
    programId: string,
    reason: string
  ): Promise<PatientProgram> {
    await this.delay();
    const prog = mockPrograms.find(
      (pp) => pp.patientId === patientId && pp.programId === programId
    );
    if (!prog) throw new Error('Program not found');
    return { ...prog, status: 'Disenrolled', disenrolledAt: new Date().toISOString(), disenrollReason: reason };
  }

  async uploadDocument(
    patientId: string,
    file: File,
    category: PatientDocument['category']
  ): Promise<PatientDocument> {
    await this.delay(600);
    const doc: PatientDocument = {
      id: `doc_${Date.now()}`,
      patientId,
      category,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type as PatientDocument['mimeType'],
      storageUrl: URL.createObjectURL(file),   // mock: blob URL
      uploadedBy: 'stf_current',
      uploadedAt: new Date().toISOString(),
      aiStatus: 'Queued',                       // AI starts immediately after upload
      aiJobId: `job_${Date.now()}`,
      isReviewed: false,
    };
    return doc;
  }

  async getDocumentStatus(patientId: string, documentId: string): Promise<PatientDocument> {
    await this.delay(300);
    const doc = mockDocuments.find((d) => d.id === documentId && d.patientId === patientId);
    if (!doc) throw new Error('Document not found');
    // Simulate AI progression in mock mode
    const statusProgression: AiProcessingStatus[] = ['Queued', 'Processing', 'Completed'];
    const currentIdx = statusProgression.indexOf(doc.aiStatus as AiProcessingStatus);
    const nextStatus = statusProgression[Math.min(currentIdx + 1, statusProgression.length - 1)];
    return {
      ...doc,
      aiStatus: nextStatus,
      ...(nextStatus === 'Completed' && {
        aiCompletedAt: new Date().toISOString(),
        aiExtractedFields: [
          { key: 'patientName', value: 'Ahmed Ali', confidence: 0.97, requiresReview: false },
          { key: 'diagnosis', value: 'Hypertension I10', confidence: 0.82, requiresReview: true },
          { key: 'signedDate', value: '2026-04-15', confidence: 0.91, requiresReview: false },
        ],
      }),
    };
  }

  async discharge(id: string, reason: string): Promise<PatientFull> {
    await this.delay();
    const current = await this.getById(id);
    return {
      ...current,
      status: 'Discharged',
      statusChangedAt: new Date().toISOString(),
      statusChangeReason: reason,
    };
  }
}

// ── LIVE IMPLEMENTATION ───────────────────────────────────────────────────────
// Implements the same IPatientService interface with real API calls.
// Fill in each method when the backend is ready.

class LivePatientService implements IPatientService {
  async list(filters?: PatientFilters, page = 1, perPage = 20): Promise<PaginatedResponse<Patient>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('perPage', String(perPage));
    if (filters?.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters?.searchQuery) params.set('q', filters.searchQuery);
    if (filters?.programCode && filters.programCode !== 'all') params.set('program', filters.programCode);

    const env = (await apiFetch<ApiEnvelope<Patient[]>>(`/api/v1/patients?${params}`)) as unknown;
    const raw = env as ApiEnvelope<Patient[]>;
    return {
      data: raw.data,
      total: raw.meta?.total ?? 0,
      page: raw.meta?.page ?? page,
      perPage: raw.meta?.perPage ?? perPage,
      totalPages: raw.meta?.totalPages ?? 1,
    };
  }

  async getById(id: string): Promise<PatientFull> {
    return apiFetch<PatientFull>(`/api/v1/patients/${id}?include=insurance,programs,documents`);
  }

  async onboard(form: OnboardingFormState): Promise<PatientFull> {
    return apiFetch<PatientFull>('/api/v1/patients/onboard', {
      method: 'POST',
      body: JSON.stringify(form),
    });
  }

  async updateDemographics(id: string, data: Partial<PatientDemographics>): Promise<PatientFull> {
    return apiFetch<PatientFull>(`/api/v1/patients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async transitionStatus(id: string, newStatus: PatientStatus, reason?: string): Promise<PatientFull> {
    return apiFetch<PatientFull>(`/api/v1/patients/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status: newStatus, reason }),
    });
  }

  async addInsurance(patientId: string, plan: Omit<InsurancePlan, 'id' | 'patientId'>): Promise<InsurancePlan> {
    return apiFetch<InsurancePlan>(`/api/v1/patients/${patientId}/insurance`, {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  }

  async checkEligibility(patientId: string, insuranceId: string): Promise<InsurancePlan> {
    return apiFetch<InsurancePlan>(
      `/api/v1/patients/${patientId}/insurance/${insuranceId}/check-eligibility`,
      { method: 'POST' }
    );
  }

  async enrollInProgram(patientId: string, programId: string, diagnoses: string[]): Promise<PatientProgram> {
    return apiFetch<PatientProgram>(`/api/v1/patients/${patientId}/programs`, {
      method: 'POST',
      body: JSON.stringify({ programId, primaryDiagnoses: diagnoses }),
    });
  }

  async disenrollFromProgram(patientId: string, programId: string, reason: string): Promise<PatientProgram> {
    return apiFetch<PatientProgram>(`/api/v1/patients/${patientId}/programs/${programId}/disenroll`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async uploadDocument(patientId: string, file: File, category: PatientDocument['category']): Promise<PatientDocument> {
    const form = new FormData();
    form.append('file', file);
    form.append('category', category);
    const token = localStorage.getItem('rpm_token');
    const res = await fetch(`${API_BASE}/api/v1/patients/${patientId}/documents`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,  // No Content-Type — browser sets multipart boundary automatically
    });
    if (!res.ok) throw new Error(`Upload failed: HTTP ${res.status}`);
    const json = (await res.json()) as ApiEnvelope<PatientDocument>;
    return json.data;
  }

  async getDocumentStatus(patientId: string, documentId: string): Promise<PatientDocument> {
    return apiFetch<PatientDocument>(
      `/api/v1/patients/${patientId}/documents/${documentId}/status`
    );
  }

  async discharge(id: string, reason: string): Promise<PatientFull> {
    return apiFetch<PatientFull>(`/api/v1/patients/${id}/discharge`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }
}

// ── Singleton export — the ONLY import components/hooks should use ─────────────

export const patientService: IPatientService = IS_MOCK
  ? new MockPatientService()
  : new LivePatientService();