// src/data/mockDevices.ts
// Extend this file with realistic seed data for RPM-009 / RPM-010 development.
// Replace `mockDevices` in mockData.ts import with this when integrating.

import type {
  Device,
  DeviceAssignment,
  DeviceReturnRequest,
  DeviceConnectionEvent,
  VendorIntegration,
} from '../types/devices';

// ─── Devices ──────────────────────────────────────────────────────────────────

export const mockDevices: Device[] = [
  {
    id: 'dev_001',
    type: 'Blood Pressure Monitor',
    vendor: 'Tenovi',
    serialNumber: 'TENOVI-BP-78492',
    imei: '354678901234567',
    firmware: '2.4.1',
    status: 'Assigned',
    patientId: 'pat_001',
    assignedAt: '2026-03-20T10:00:00',
    assignedBy: 'stf_002',
    purchasedAt: '2025-11-01',
    warrantyExpiry: '2027-11-01',
    lastConnected: '2026-04-28T09:10:00',
    connectionStatus: 'Online',
    locationId: 'loc_001',
  },
  {
    id: 'dev_002',
    type: 'Glucose Meter',
    vendor: 'Withings',
    serialNumber: 'WITH-GLU-33421',
    firmware: '1.9.0',
    status: 'Assigned',
    patientId: 'pat_002',
    assignedAt: '2026-02-25T14:30:00',
    assignedBy: 'stf_002',
    purchasedAt: '2025-10-15',
    warrantyExpiry: '2027-10-15',
    lastConnected: '2026-04-29T07:45:00',
    connectionStatus: 'Online',
    locationId: 'loc_001',
  },
  {
    id: 'dev_003',
    type: 'SpO2 Monitor',
    vendor: 'Tenovi',
    serialNumber: 'TENOVI-OX-11234',
    firmware: '2.4.1',
    status: 'Available',
    lastConnected: undefined,
    connectionStatus: 'Never Connected',
    purchasedAt: '2026-01-10',
    warrantyExpiry: '2028-01-10',
    locationId: 'loc_001',
  },
  {
    id: 'dev_004',
    type: 'Weight Scale',
    vendor: 'Withings',
    serialNumber: 'WITH-WT-55678',
    firmware: '3.1.2',
    status: 'In Repair',
    lastConnected: '2026-03-10T16:20:00',
    connectionStatus: 'Offline',
    notes: 'Battery connector loose — sent to vendor.',
    purchasedAt: '2025-08-20',
    warrantyExpiry: '2027-08-20',
    locationId: 'loc_001',
  },
  {
    id: 'dev_005',
    type: 'Blood Pressure Monitor',
    vendor: 'iHealth',
    serialNumber: 'IH-BP-90011',
    firmware: '1.2.0',
    status: 'Available',
    lastConnected: '2026-04-01T11:00:00',
    connectionStatus: 'Offline',
    purchasedAt: '2025-12-01',
    warrantyExpiry: '2027-12-01',
    locationId: 'loc_002',
  },
  {
    id: 'dev_006',
    type: 'Glucose Meter',
    vendor: 'Tenovi',
    serialNumber: 'TENOVI-GLU-44512',
    firmware: '2.4.1',
    status: 'Retired',
    lastConnected: '2026-01-15T08:00:00',
    connectionStatus: 'Offline',
    purchasedAt: '2024-06-01',
    warrantyExpiry: '2026-06-01',
    locationId: 'loc_001',
    notes: 'End of warranty; replaced.',
  },
];

// ─── Assignment History ────────────────────────────────────────────────────────

export const mockDeviceAssignments: DeviceAssignment[] = [
  {
    id: 'asgn_001',
    deviceId: 'dev_001',
    patientId: 'pat_001',
    assignedBy: 'stf_002',
    assignedAt: '2026-03-20T10:00:00',
  },
  {
    id: 'asgn_002',
    deviceId: 'dev_002',
    patientId: 'pat_002',
    assignedBy: 'stf_002',
    assignedAt: '2026-02-25T14:30:00',
  },
  // Completed (historical)
  {
    id: 'asgn_003',
    deviceId: 'dev_004',
    patientId: 'pat_001',
    assignedBy: 'stf_002',
    assignedAt: '2026-01-10T09:00:00',
    unassignedAt: '2026-03-10T16:00:00',
    returnReason: 'Device Malfunction',
    returnNotes: 'Scale stopped syncing readings.',
  },
];

// ─── Return Requests ───────────────────────────────────────────────────────────

export const mockReturnRequests: DeviceReturnRequest[] = [
  {
    id: 'ret_001',
    deviceId: 'dev_004',
    patientId: 'pat_001',
    initiatedBy: 'stf_002',
    initiatedAt: '2026-03-10T15:00:00',
    reason: 'Device Malfunction',
    notes: 'Battery connector loose.',
    status: 'Received',
    receivedAt: '2026-03-14T11:00:00',
  },
];

// ─── Connection Events ─────────────────────────────────────────────────────────

export const mockConnectionEvents: DeviceConnectionEvent[] = [
  {
    id: 'evt_001',
    deviceId: 'dev_001',
    patientId: 'pat_001',
    eventType: 'Reading Sent',
    timestamp: '2026-04-28T09:10:00',
    payload: { systolic: 148, diastolic: 92, pulse: 78 },
  },
  {
    id: 'evt_002',
    deviceId: 'dev_002',
    patientId: 'pat_002',
    eventType: 'Reading Sent',
    timestamp: '2026-04-29T07:45:00',
    payload: { glucose: 195, unit: 'mg/dL' },
  },
  {
    id: 'evt_003',
    deviceId: 'dev_004',
    eventType: 'Error',
    timestamp: '2026-03-10T16:20:00',
    errorCode: 'SYNC_FAIL',
    errorMessage: 'Failed to sync: hardware error',
  },
  {
    id: 'evt_004',
    deviceId: 'dev_001',
    patientId: 'pat_001',
    eventType: 'Connected',
    timestamp: '2026-04-28T09:08:00',
  },
];

// ─── Vendor Integrations ───────────────────────────────────────────────────────

export const mockVendorIntegrations: VendorIntegration[] = [
  {
    vendor: 'Tenovi',
    isEnabled: true,
    webhookUrl: 'https://api.yourapp.com/webhooks/tenovi',
    apiKeyConfigured: true,
    lastSyncAt: '2026-04-29T08:00:00',
    syncStatus: 'OK',
  },
  {
    vendor: 'Withings',
    isEnabled: true,
    webhookUrl: 'https://api.yourapp.com/webhooks/withings',
    apiKeyConfigured: true,
    lastSyncAt: '2026-04-29T07:50:00',
    syncStatus: 'OK',
  },
  {
    vendor: 'iHealth',
    isEnabled: false,
    apiKeyConfigured: false,
    syncStatus: 'Not Configured',
  },
  {
    vendor: 'Omron',
    isEnabled: false,
    apiKeyConfigured: false,
    syncStatus: 'Not Configured',
  },
];