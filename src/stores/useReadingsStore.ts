// src/stores/useReadingsStore.ts
import { create } from 'zustand';
import { mockReadings } from '../data/mockData';
import type { Reading } from '../types';

export interface Alert {
  id: string;
  patientId: string;
  type: string;
  message: string;
  time: string;
  severity: 'CRITICAL' | 'WARNING';
}

interface ReadingsStore {
  readings: Reading[];
  oorReadings: Reading[];
  alerts: Alert[]; 

  setReadings: (readings: Reading[]) => void;
  addReading: (reading: Reading) => void;
  markAsReviewed: (id: string) => void;
}

export const useReadingsStore = create<ReadingsStore>((set) => ({
  readings: mockReadings,
  oorReadings: mockReadings.filter((r) => r.isOOR),
  
  // Robust Mock Data
  alerts: [
    { id: 'a1', patientId: 'p1', type: 'Blood Pressure', message: 'Systolic pressure critical — 160/95 mmHg', time: '2 min ago', severity: 'CRITICAL' },
    { id: 'a2', patientId: 'p1', type: 'Glucose', message: 'Hyperglycemia detected — 240 mg/dL', time: '15 min ago', severity: 'CRITICAL' },
    { id: 'a3', patientId: 'p1', type: 'Heart Rate', message: 'Tachycardia alert — 112 bpm', time: '45 min ago', severity: 'WARNING' },
    { id: 'a4', patientId: 'p1', type: 'SpO2', message: 'Slight drop in oxygen saturation — 94%', time: '1 hour ago', severity: 'WARNING' },
  ],

  setReadings: (readings) => {
    set({
      readings,
      oorReadings: readings.filter((r) => r.isOOR),
    });
  },

  addReading: (reading) =>
    set((state) => {
      const newReadings = [reading, ...state.readings];
      return {
        readings: newReadings,
        oorReadings: newReadings.filter((r) => r.isOOR),
      };
    }),

  markAsReviewed: (id) =>
    set((state) => {
      // Functional: Removes the alert from the store when "Mark Read" is clicked
      const updatedAlerts = state.alerts.filter((a) => a.id !== id);
      const updatedReadings = state.readings.map((r) =>
        r.id === id ? { ...r, isOOR: false } : r
      );

      return {
        readings: updatedReadings,
        oorReadings: updatedReadings.filter((r) => r.isOOR),
        alerts: updatedAlerts,
      };
    }),
}));