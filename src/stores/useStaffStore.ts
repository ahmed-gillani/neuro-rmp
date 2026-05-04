// src/stores/useStaffStore.ts
import { create } from 'zustand';
import { mockStaff } from '../data/mockData';
import type { User } from '../types';

interface StaffStore {
  staff: User[];
  
  setStaff: (staff: User[]) => void;
  addStaff: (newStaff: User) => void;
  updateStaff: (id: string, updates: Partial<User>) => void;
  deleteStaff: (id: string) => void;
}

export const useStaffStore = create<StaffStore>((set) => ({
  staff: mockStaff,

  setStaff: (staff) => set({ staff }),

  addStaff: (newStaff) =>
    set((state) => ({ staff: [...state.staff, newStaff] })),

  updateStaff: (id, updates) =>
    set((state) => ({
      staff: state.staff.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  deleteStaff: (id) =>
    set((state) => ({
      staff: state.staff.filter((s) => s.id !== id),
    })),
}));