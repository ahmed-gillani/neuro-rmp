// src/types/devices.ts
// RPM-009: Device Management | RPM-010: Device Integration

// ─── Core Enums ────────────────────────────────────────────────────────────────

export type DeviceStatus = 'Available' | 'Assigned' | 'In Repair' | 'Retired' | 'Lost';

export type DeviceType =
  | 'Blood Pressure Monitor'
  | 'Glucose Meter'
  | 'SpO2 Monitor'
  | 'Weight Scale'
  | 'Thermometer'
  | 'ECG Monitor'
  | 'Peak Flow Meter';

export type DeviceVendor = 'Tenovi' | 'Withings' | 'iHealth' | 'Omron' | 'Other';

export type ConnectionStatus = 'Online' | 'Offline' | 'Degraded' | 'Never Connected';

export type ReturnReason =
  | 'Patient Discharged'
  | 'Device Malfunction'
  | 'Patient Request'
  | 'Upgrade'
  | 'Other';

// ─── Device (RPM-009: Inventory) ───────────────────────────────────────────────

export interface Device {
  id: string;
  type: DeviceType;
  vendor: DeviceVendor;
  serialNumber: string;
  imei?: string;
  firmware?: string;
  status: DeviceStatus;

  // Assignment
  patientId?: string;
  assignedAt?: string;       // ISO timestamp
  assignedBy?: string;       // staff userId

  // Lifecycle
  purchasedAt?: string;
  warrantyExpiry?: string;
  lastConnected?: string;    // ISO timestamp
  connectionStatus: ConnectionStatus;

  // Return workflow
  returnInitiatedAt?: string;
  returnReason?: ReturnReason;
  returnNotes?: string;

  // Location (for multi-clinic orgs)
  locationId?: string;

  notes?: string;
}

// ─── Assignment Record (audit trail) ──────────────────────────────────────────

export interface DeviceAssignment {
  id: string;
  deviceId: string;
  patientId: string;
  assignedBy: string;        // staff userId
  assignedAt: string;        // ISO timestamp
  unassignedAt?: string;     // ISO timestamp — set on return
  returnReason?: ReturnReason;
  returnNotes?: string;
}

// ─── Return Request (RPM-009: Return Workflow) ─────────────────────────────────

export interface DeviceReturnRequest {
  id: string;
  deviceId: string;
  patientId: string;
  initiatedBy: string;       // staff userId
  initiatedAt: string;       // ISO timestamp
  reason: ReturnReason;
  notes?: string;
  status: 'Pending' | 'Shipped' | 'Received' | 'Cancelled';
  shippingLabel?: string;    // URL
  receivedAt?: string;       // ISO timestamp
}

// ─── Connection Event (RPM-010: Integration Monitoring) ───────────────────────

export interface DeviceConnectionEvent {
  id: string;
  deviceId: string;
  patientId?: string;
  eventType: 'Connected' | 'Disconnected' | 'Reading Sent' | 'Error' | 'Firmware Update';
  timestamp: string;         // ISO timestamp
  payload?: Record<string, unknown>; // raw vendor webhook payload (sanitized)
  errorCode?: string;
  errorMessage?: string;
}

// ─── Vendor Integration Config (RPM-010) ──────────────────────────────────────

export interface VendorIntegration {
  vendor: DeviceVendor;
  isEnabled: boolean;
  webhookUrl?: string;        // URL the vendor POSTs events to
  apiKeyConfigured: boolean;  // never expose key in UI; only flag presence
  lastSyncAt?: string;
  syncStatus: 'OK' | 'Error' | 'Not Configured';
  errorMessage?: string;
}

// ─── UI Helpers ────────────────────────────────────────────────────────────────

export interface DeviceFilters {
  status: DeviceStatus | 'all';
  type: DeviceType | 'all';
  vendor: DeviceVendor | 'all';
  connectionStatus: ConnectionStatus | 'all';
  locationId: string | 'all';
  searchQuery: string;
}

export interface DeviceStats {
  total: number;
  available: number;
  assigned: number;
  inRepair: number;
  retired: number;
  online: number;
  offline: number;
  neverConnected: number;
}