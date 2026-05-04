import { create } from 'zustand';
import { mockDevices } from '../data/mockData';
import type { Device } from '../types';

interface DevicesStore {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
  assignDevice: (deviceId: string, patientId: string) => void;
  updateDeviceStatus: (deviceId: string, status: Device['status']) => void;
  addDevice: (device: Omit<Device, 'id'>) => void;
}

export const useDevicesStore = create<DevicesStore>((set) => ({
  devices: mockDevices,

  setDevices: (devices) => set({ devices }),

  assignDevice: (deviceId, patientId) =>
    set((state) => ({
      devices: state.devices.map((dev) =>
        dev.id === deviceId ? { ...dev, patientId, status: 'Assigned' } : dev
      ),
    })),

  updateDeviceStatus: (deviceId, status) =>
    set((state) => ({
      devices: state.devices.map((dev) =>
        dev.id === deviceId ? { ...dev, status } : dev
      ),
    })),

  addDevice: (newDevice) =>
    set((state) => ({
      devices: [
        ...state.devices,
        { ...newDevice, id: `dev_${Date.now()}` } as Device,
      ],
    })),
}));