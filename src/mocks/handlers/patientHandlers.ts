// src/mocks/handlers/patientHandlers.ts
// ─────────────────────────────────────────────────────────────────────────────
// MSW (Mock Service Worker) handlers for the Patient API.
//
// WHY MSW instead of MockPatientService?
//   MSW intercepts at the network layer, which means:
//   - Axios/fetch interceptors, retry logic, and error boundaries all fire
//   - DevTools Network tab shows real-looking requests
//   - Integration tests work exactly like production
//
// WHEN TO USE MSW:
//   - Writing Cypress / Playwright E2E tests
//   - Debugging auth headers, CORS, or retry logic
//   - Demoing to stakeholders with realistic network behavior
//
// WHEN TO USE MockPatientService (current default):
//   - Day-to-day UI development (faster, no worker setup needed)
//   - Unit tests of hooks and components
//
// SETUP (when you want MSW):
//   1. npm install msw --save-dev
//   2. npx msw init public/
//   3. In main.tsx:
//        if (import.meta.env.VITE_USE_MSW === 'true') {
//          const { worker } = await import('./mocks/browser');
//          await worker.start();
//        }
//   4. Set VITE_USE_MSW=true in .env.development
// ─────────────────────────────────────────────────────────────────────────────

// NOTE: Uncomment the block below after running: npm install msw --save-dev


import { http, HttpResponse, delay } from 'msw';
import { mockPatients } from '../../data/mockData';
import { mockInsurance, mockPrograms, mockDocuments } from '../mockPatientData';

const API = import.meta.env.VITE_API_BASE_URL ?? '';

export const patientHandlers = [

  // GET /api/v1/patients
  http.get(`${API}/api/v1/patients`, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const q = url.searchParams.get('q')?.toLowerCase();
    const page = Number(url.searchParams.get('page') ?? 1);
    const perPage = Number(url.searchParams.get('perPage') ?? 20);

    let results = [...mockPatients];
    if (status && status !== 'all') results = results.filter(p => p.status === status);
    if (q) results = results.filter(p => p.name.toLowerCase().includes(q));

    const start = (page - 1) * perPage;
    return HttpResponse.json({
      data: results.slice(start, start + perPage),
      meta: { page, perPage, total: results.length, totalPages: Math.ceil(results.length / perPage) },
    });
  }),

  // GET /api/v1/patients/:id
  http.get(`${API}/api/v1/patients/:id`, async ({ params }) => {
    await delay(300);
    const { id } = params as { id: string };
    const patient = mockPatients.find(p => p.id === id);
    if (!patient) return HttpResponse.json({ error: 'Patient not found' }, { status: 404 });
    return HttpResponse.json({
      data: {
        ...patient,
        insurance: mockInsurance.filter(i => i.patientId === id),
        programs: mockPrograms.filter(pp => pp.patientId === id),
        documents: mockDocuments.filter(d => d.patientId === id),
      },
    });
  }),

  // POST /api/v1/patients/onboard
  http.post(`${API}/api/v1/patients/onboard`, async ({ request }) => {
    await delay(800);
    const body = await request.json() as any;
    const newPatient = {
      id: `pat_${Date.now()}`,
      name: body.demographics?.name ?? 'New Patient',
      dob: body.demographics?.dob ?? '',
      gender: body.demographics?.gender ?? 'Other',
      phone: body.demographics?.phone ?? '',
      status: 'New',
      primaryProvider: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
    };
    return HttpResponse.json({ data: newPatient }, { status: 201 });
  }),

  // POST /api/v1/patients/:id/status
  http.post(`${API}/api/v1/patients/:id/status`, async ({ params, request }) => {
    await delay(400);
    const { id } = params as { id: string };
    const { status, reason } = await request.json() as { status: string; reason?: string };
    const patient = mockPatients.find(p => p.id === id);
    if (!patient) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json({
      data: { ...patient, status, statusChangedAt: new Date().toISOString(), statusChangeReason: reason },
    });
  }),

  // POST /api/v1/patients/:patientId/insurance/:insuranceId/check-eligibility
  http.post(`${API}/api/v1/patients/:patientId/insurance/:insuranceId/check-eligibility`, async ({ params }) => {
    await delay(1200);
    const plan = mockInsurance.find(i => i.id === params.insuranceId);
    if (!plan) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json({
      data: { ...plan, eligibilityStatus: 'Verified', eligibilityCheckedAt: new Date().toISOString() },
    });
  }),

  // POST /api/v1/patients/:patientId/documents
  http.post(`${API}/api/v1/patients/:patientId/documents`, async ({ params }) => {
    await delay(700);
    const doc = {
      id: `doc_${Date.now()}`,
      patientId: params.patientId,
      category: 'Consent Form',
      fileName: 'uploaded_file.pdf',
      fileSize: 1000000,
      mimeType: 'application/pdf',
      storageUrl: '/mock/docs/new.pdf',
      uploadedBy: 'stf_current',
      uploadedAt: new Date().toISOString(),
      aiStatus: 'Queued',
      aiJobId: `job_${Date.now()}`,
      isReviewed: false,
    };
    return HttpResponse.json({ data: doc }, { status: 201 });
  }),

  // GET /api/v1/patients/:patientId/documents/:documentId/status
  http.get(`${API}/api/v1/patients/:patientId/documents/:documentId/status`, async ({ params }) => {
    await delay(300);
    const doc = mockDocuments.find(d => d.id === params.documentId);
    if (!doc) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    // Simulate progression
    return HttpResponse.json({ data: { ...doc, aiStatus: 'Completed' } });
  }),

];


// Placeholder export so the file doesn't cause import errors before MSW is installed
// export const patientHandlers: unknown[] = [];