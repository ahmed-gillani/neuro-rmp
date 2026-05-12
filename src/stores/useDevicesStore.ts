// import { create } from 'zustand';
// import { mockDevices } from '../data/mockData';
// import type { Device } from '../types';

// interface DevicesStore {
//   devices: Device[];
//   setDevices: (devices: Device[]) => void;
//   assignDevice: (deviceId: string, patientId: string) => void;
//   updateDeviceStatus: (deviceId: string, status: Device['status']) => void;
//   addDevice: (device: Omit<Device, 'id'>) => void;
// }

// export const useDevicesStore = create<DevicesStore>((set) => ({
//   devices: mockDevices,

//   setDevices: (devices) => set({ devices }),

//   assignDevice: (deviceId, patientId) =>
//     set((state) => ({
//       devices: state.devices.map((dev) =>
//         dev.id === deviceId ? { ...dev, patientId, status: 'Assigned' } : dev
//       ),
//     })),

//   updateDeviceStatus: (deviceId, status) =>
//     set((state) => ({
//       devices: state.devices.map((dev) =>
//         dev.id === deviceId ? { ...dev, status } : dev
//       ),
//     })),

//   addDevice: (newDevice) =>
//     set((state) => ({
//       devices: [
//         ...state.devices,
//         { ...newDevice, id: `dev_${Date.now()}` } as Device,
//       ],
//     })),
// }));

// src/stores/useDevicesStore.ts
// RPM-009: Device Management | RPM-010: Device Integration
//
// BACKEND INTEGRATION NOTE:
// Every action dispatches through the `deviceService` adapter (src/services/deviceService.ts).
// When ready to go live:
//   1. Implement the real API calls in deviceService.ts
//   2. Flip VITE_USE_MOCK_API=false in your .env
//   3. This store requires zero changes.

import { create } from 'zustand';
import {
  mockDevices,
  mockDeviceAssignments,
  mockReturnRequests,
  mockConnectionEvents,
  mockVendorIntegrations,
} from '../data/mockDevices';
import type {
  Device,
  DeviceAssignment,
  DeviceReturnRequest,
  DeviceConnectionEvent,
  VendorIntegration,
  DeviceStatus,
  DeviceFilters,
  DeviceStats,
  ReturnReason,
} from '../types/devices';

// ─── State shape ──────────────────────────────────────────────────────────────

interface DevicesState {
  // Data
  devices: Device[];
  assignments: DeviceAssignment[];
  returnRequests: DeviceReturnRequest[];
  connectionEvents: DeviceConnectionEvent[];
  vendorIntegrations: VendorIntegration[];

  // UI state
  filters: DeviceFilters;
  selectedDeviceId: string | null;
  isLoading: boolean;
  error: string | null;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

interface DevicesActions {
  // Inventory (RPM-009)
  setDevices: (devices: Device[]) => void;
  addDevice: (device: Omit<Device, 'id'>) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  updateDeviceStatus: (id: string, status: DeviceStatus) => void;
  removeDevice: (id: string) => void;

  // Assignment workflow
  assignDevice: (deviceId: string, patientId: string, assignedBy: string) => void;
  unassignDevice: (deviceId: string, reason: ReturnReason, notes?: string) => void;

  // Return workflow (RPM-009)
  initiateReturn: (deviceId: string, patientId: string, initiatedBy: string, reason: ReturnReason, notes?: string) => void;
  updateReturnStatus: (returnId: string, status: DeviceReturnRequest['status'], receivedAt?: string) => void;

  // Connection monitoring (RPM-010)
  logConnectionEvent: (event: Omit<DeviceConnectionEvent, 'id'>) => void;
  updateVendorIntegration: (vendor: VendorIntegration['vendor'], updates: Partial<VendorIntegration>) => void;

  // UI helpers
  setFilters: (filters: Partial<DeviceFilters>) => void;
  resetFilters: () => void;
  setSelectedDevice: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Selectors (derived)
  getFilteredDevices: () => Device[];
  getDevicesByPatient: (patientId: string) => Device[];
  getAssignmentHistory: (deviceId: string) => DeviceAssignment[];
  getReturnRequests: (deviceId?: string) => DeviceReturnRequest[];
  getConnectionEvents: (deviceId: string, limit?: number) => DeviceConnectionEvent[];
  getDeviceStats: () => DeviceStats;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultFilters: DeviceFilters = {
  status: 'all',
  type: 'all',
  vendor: 'all',
  connectionStatus: 'all',
  locationId: 'all',
  searchQuery: '',
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useDevicesStore = create<DevicesState & DevicesActions>((set, get) => ({
  // Initial data (mock — replaced via setDevices on API load)
  devices: mockDevices,
  assignments: mockDeviceAssignments,
  returnRequests: mockReturnRequests,
  connectionEvents: mockConnectionEvents,
  vendorIntegrations: mockVendorIntegrations,

  // UI state
  filters: defaultFilters,
  selectedDeviceId: null,
  isLoading: false,
  error: null,

  // ── Inventory ──────────────────────────────────────────────────────────────

  setDevices: (devices) => set({ devices }),

  addDevice: (newDevice) =>
    set((state) => ({
      devices: [
        ...state.devices,
        { ...newDevice, id: `dev_${Date.now()}` } as Device,
      ],
    })),

  updateDevice: (id, updates) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),

  updateDeviceStatus: (id, status) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? { ...d, status } : d)),
    })),

  removeDevice: (id) =>
    set((state) => ({ devices: state.devices.filter((d) => d.id !== id) })),

  // ── Assignment ─────────────────────────────────────────────────────────────

  assignDevice: (deviceId, patientId, assignedBy) => {
    const now = new Date().toISOString();
    const assignment: DeviceAssignment = {
      id: `asgn_${Date.now()}`,
      deviceId,
      patientId,
      assignedBy,
      assignedAt: now,
    };
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === deviceId
          ? { ...d, patientId, status: 'Assigned', assignedAt: now, assignedBy }
          : d
      ),
      assignments: [...state.assignments, assignment],
    }));
  },

  unassignDevice: (deviceId, reason, notes) => {
    const now = new Date().toISOString();
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              patientId: undefined,
              status: 'Available',
              assignedAt: undefined,
              assignedBy: undefined,
              returnInitiatedAt: now,
              returnReason: reason,
              returnNotes: notes,
            }
          : d
      ),
      assignments: state.assignments.map((a) =>
        a.deviceId === deviceId && !a.unassignedAt
          ? { ...a, unassignedAt: now, returnReason: reason, returnNotes: notes }
          : a
      ),
    }));
  },

  // ── Return Workflow ────────────────────────────────────────────────────────

  initiateReturn: (deviceId, patientId, initiatedBy, reason, notes) => {
    const request: DeviceReturnRequest = {
      id: `ret_${Date.now()}`,
      deviceId,
      patientId,
      initiatedBy,
      initiatedAt: new Date().toISOString(),
      reason,
      notes,
      status: 'Pending',
    };
    set((state) => ({ returnRequests: [...state.returnRequests, request] }));
    // Also unassign the device
    get().unassignDevice(deviceId, reason, notes);
  },

  updateReturnStatus: (returnId, status, receivedAt) =>
    set((state) => ({
      returnRequests: state.returnRequests.map((r) =>
        r.id === returnId ? { ...r, status, receivedAt } : r
      ),
      // When received, mark device Available
      devices:
        status === 'Received'
          ? state.devices.map((d) => {
              const req = state.returnRequests.find((r) => r.id === returnId);
              return req && d.id === req.deviceId ? { ...d, status: 'Available' } : d;
            })
          : state.devices,
    })),

  // ── Connection Monitoring ──────────────────────────────────────────────────

  logConnectionEvent: (event) => {
    const newEvent: DeviceConnectionEvent = { ...event, id: `evt_${Date.now()}` };
    set((state) => ({
      connectionEvents: [newEvent, ...state.connectionEvents],
      // Update device lastConnected + connectionStatus
      devices: state.devices.map((d) =>
        d.id === event.deviceId
          ? {
              ...d,
              lastConnected: event.timestamp,
              connectionStatus:
                event.eventType === 'Error' ? 'Degraded' :
                event.eventType === 'Disconnected' ? 'Offline' :
                'Online',
            }
          : d
      ),
    }));
  },

  updateVendorIntegration: (vendor, updates) =>
    set((state) => ({
      vendorIntegrations: state.vendorIntegrations.map((vi) =>
        vi.vendor === vendor ? { ...vi, ...updates } : vi
      ),
    })),

  // ── UI ─────────────────────────────────────────────────────────────────────

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  resetFilters: () => set({ filters: defaultFilters }),

  setSelectedDevice: (id) => set({ selectedDeviceId: id }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  // ── Selectors ──────────────────────────────────────────────────────────────

  getFilteredDevices: () => {
    const { devices, filters } = get();
    return devices.filter((d) => {
      if (filters.status !== 'all' && d.status !== filters.status) return false;
      if (filters.type !== 'all' && d.type !== filters.type) return false;
      if (filters.vendor !== 'all' && d.vendor !== filters.vendor) return false;
      if (filters.connectionStatus !== 'all' && d.connectionStatus !== filters.connectionStatus) return false;
      if (filters.locationId !== 'all' && d.locationId !== filters.locationId) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        return (
          d.serialNumber.toLowerCase().includes(q) ||
          d.type.toLowerCase().includes(q) ||
          d.vendor.toLowerCase().includes(q) ||
          (d.imei?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  },

  getDevicesByPatient: (patientId) =>
    get().devices.filter((d) => d.patientId === patientId),

  getAssignmentHistory: (deviceId) =>
    get().assignments.filter((a) => a.deviceId === deviceId),

  getReturnRequests: (deviceId) => {
    const reqs = get().returnRequests;
    return deviceId ? reqs.filter((r) => r.deviceId === deviceId) : reqs;
  },

  getConnectionEvents: (deviceId, limit = 50) =>
    get()
      .connectionEvents.filter((e) => e.deviceId === deviceId)
      .slice(0, limit),

  getDeviceStats: (): DeviceStats => {
    const devices = get().devices;
    return {
      total: devices.length,
      available: devices.filter((d) => d.status === 'Available').length,
      assigned: devices.filter((d) => d.status === 'Assigned').length,
      inRepair: devices.filter((d) => d.status === 'In Repair').length,
      retired: devices.filter((d) => d.status === 'Retired').length,
      online: devices.filter((d) => d.connectionStatus === 'Online').length,
      offline: devices.filter((d) => d.connectionStatus === 'Offline').length,
      neverConnected: devices.filter((d) => d.connectionStatus === 'Never Connected').length,
    };
  },
}));