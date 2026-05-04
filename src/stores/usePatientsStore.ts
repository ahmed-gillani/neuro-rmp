// src/stores/usePatientsStore.ts
import { create } from 'zustand';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types';

interface PatientsStore {
  patients: Patient[];
  selectedPatient: Patient | null;
  
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  setSelectedPatient: (patient: Patient | null) => void;
  deletePatient: (id: string) => void;
}

export const usePatientsStore = create<PatientsStore>((set) => ({
  patients: mockPatients,
  selectedPatient: null,

  setPatients: (patients) => set({ patients }),

  addPatient: (patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),

  updatePatient: (id, updates) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      selectedPatient:
        state.selectedPatient?.id === id
          ? { ...state.selectedPatient, ...updates }
          : state.selectedPatient,
    })),

  setSelectedPatient: (patient) => set({ selectedPatient: patient }),

  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
      selectedPatient: state.selectedPatient?.id === id ? null : state.selectedPatient,
    })),
}));