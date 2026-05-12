// src/services/deviceService.ts
// ──────────────────────────────────────────────────────────────────────────────
// Service adapter for the Devices module (RPM-009 / RPM-010).
//
// HOW THIS WORKS:
//   - In mock mode (VITE_USE_MOCK_API=true or unset), every function resolves
//     immediately using in-memory store data. No network calls are made.
//   - In live mode (VITE_USE_MOCK_API=false), each function calls your REST/
//     GraphQL backend. The store and components are completely unaware of the
//     difference — they only call this service.
//
// BACKEND INTEGRATION CHECKLIST (when ready):
//   [ ] Set VITE_USE_MOCK_API=false in .env.production
//   [ ] Set VITE_API_BASE_URL to your backend URL
//   [ ] Implement each `liveApi.*` function below (the signatures are fixed)
//   [ ] Map any naming differences between your API and the Device type in the
//       mapper functions at the bottom of this file
// ──────────────────────────────────────────────────────────────────────────────

import type {
  Device,
  DeviceAssignment,
  DeviceReturnRequest,
  DeviceConnectionEvent,
  VendorIntegration,
  DeviceStatus,
  ReturnReason,
} from '../types/devices';

const IS_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

// ─── API response wrapper (mirrors common backend conventions) ────────────────

interface ApiResponse<T> {
  data: T;
  meta?: { page: number; total: number; perPage: number };
  error?: string;
}

// ─── Generic fetch helper ─────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
}

// ─── Live API implementations (stub — fill in when backend is ready) ──────────

const liveApi = {
  // RPM-009
  listDevices: () => apiFetch<Device[]>('/api/v1/devices'),
  getDevice: (id: string) => apiFetch<Device>(`/api/v1/devices/${id}`),
  createDevice: (payload: Omit<Device, 'id'>) =>
    apiFetch<Device>('/api/v1/devices', { method: 'POST', body: JSON.stringify(payload) }),
  updateDevice: (id: string, payload: Partial<Device>) =>
    apiFetch<Device>(`/api/v1/devices/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteDevice: (id: string) =>
    apiFetch<void>(`/api/v1/devices/${id}`, { method: 'DELETE' }),

  // Assignments
  assignDevice: (deviceId: string, patientId: string) =>
    apiFetch<DeviceAssignment>('/api/v1/device-assignments', {
      method: 'POST',
      body: JSON.stringify({ deviceId, patientId }),
    }),
  unassignDevice: (deviceId: string, reason: ReturnReason, notes?: string) =>
    apiFetch<DeviceAssignment>(`/api/v1/device-assignments/${deviceId}/unassign`, {
      method: 'POST',
      body: JSON.stringify({ reason, notes }),
    }),
  getAssignmentHistory: (deviceId: string) =>
    apiFetch<DeviceAssignment[]>(`/api/v1/devices/${deviceId}/assignments`),

  // Return workflow — RPM-009
  initiateReturn: (deviceId: string, patientId: string, reason: ReturnReason, notes?: string) =>
    apiFetch<DeviceReturnRequest>('/api/v1/device-returns', {
      method: 'POST',
      body: JSON.stringify({ deviceId, patientId, reason, notes }),
    }),
  updateReturnStatus: (returnId: string, status: DeviceReturnRequest['status']) =>
    apiFetch<DeviceReturnRequest>(`/api/v1/device-returns/${returnId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  getReturnRequests: (deviceId?: string) =>
    apiFetch<DeviceReturnRequest[]>(
      deviceId ? `/api/v1/device-returns?deviceId=${deviceId}` : '/api/v1/device-returns'
    ),

  // Connection events — RPM-010
  getConnectionEvents: (deviceId: string, limit = 50) =>
    apiFetch<DeviceConnectionEvent[]>(
      `/api/v1/devices/${deviceId}/events?limit=${limit}`
    ),

  // Vendor integrations — RPM-010
  getVendorIntegrations: () => apiFetch<VendorIntegration[]>('/api/v1/vendor-integrations'),
  updateVendorIntegration: (vendor: string, payload: Partial<VendorIntegration>) =>
    apiFetch<VendorIntegration>(`/api/v1/vendor-integrations/${vendor}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};

// ─── Mock implementations (no-op stubs; actual data lives in Zustand store) ───
// These return void/undefined because the store already has the data in memory.
// Actions that "write" just return a resolved promise so call sites are uniform.

const mockApi = {
  listDevices: async (): Promise<Device[]> => [],         // store already seeded
  getDevice: async (_id: string): Promise<Device | null> => null,
  createDevice: async (_p: Omit<Device, 'id'>): Promise<void> => undefined,
  updateDevice: async (_id: string, _p: Partial<Device>): Promise<void> => undefined,
  deleteDevice: async (_id: string): Promise<void> => undefined,
  assignDevice: async (_did: string, _pid: string): Promise<void> => undefined,
  unassignDevice: async (_did: string, _r: ReturnReason, _n?: string): Promise<void> => undefined,
  getAssignmentHistory: async (_did: string): Promise<DeviceAssignment[]> => [],
  initiateReturn: async (): Promise<void> => undefined,
  updateReturnStatus: async (): Promise<void> => undefined,
  getReturnRequests: async (): Promise<DeviceReturnRequest[]> => [],
  getConnectionEvents: async (): Promise<DeviceConnectionEvent[]> => [],
  getVendorIntegrations: async (): Promise<VendorIntegration[]> => [],
  updateVendorIntegration: async (): Promise<void> => undefined,
};

// ─── Public service export ────────────────────────────────────────────────────

export const deviceService = IS_MOCK ? mockApi : liveApi;

// ─── Response mappers (normalize API field names ↔ Device type) ───────────────
// Fill these in when your API uses different naming conventions.

export function mapApiDevice(raw: Record<string, unknown>): Device {
  return {
    id: raw.id as string,
    type: raw.type as Device['type'],
    vendor: raw.vendor as Device['vendor'],
    serialNumber: (raw.serialNumber ?? raw.serial_number) as string,
    imei: raw.imei as string | undefined,
    firmware: (raw.firmware ?? raw.firmwareVersion) as string | undefined,
    status: raw.status as DeviceStatus,
    patientId: (raw.patientId ?? raw.patient_id) as string | undefined,
    assignedAt: (raw.assignedAt ?? raw.assigned_at) as string | undefined,
    assignedBy: (raw.assignedBy ?? raw.assigned_by) as string | undefined,
    purchasedAt: (raw.purchasedAt ?? raw.purchased_at) as string | undefined,
    warrantyExpiry: (raw.warrantyExpiry ?? raw.warranty_expiry) as string | undefined,
    lastConnected: (raw.lastConnected ?? raw.last_connected) as string | undefined,
    connectionStatus: (raw.connectionStatus ?? raw.connection_status ?? 'Never Connected') as Device['connectionStatus'],
    locationId: (raw.locationId ?? raw.location_id) as string | undefined,
    notes: raw.notes as string | undefined,
  };
}