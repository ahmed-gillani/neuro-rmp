// src/stores/useReadingsStore.ts
import { create } from 'zustand';
import { mockReadings } from '../data/mockData';
import type { Reading } from '../types';

interface ReadingsStore {
    readings: Reading[];
    oorReadings: Reading[];

    setReadings: (readings: Reading[]) => void;
    addReading: (reading: Reading) => void;
    markAsReviewed: (id: string) => void;
}

export const useReadingsStore = create<ReadingsStore>((set) => ({
    readings: mockReadings,
    oorReadings: mockReadings.filter(r => r.isOOR),

    setReadings: (readings) => {
        set({
            readings,
            oorReadings: readings.filter(r => r.isOOR),
        });
    },

    addReading: (reading) =>
        set((state) => {
            const newReadings = [reading, ...state.readings];
            return {
                readings: newReadings,
                oorReadings: newReadings.filter(r => r.isOOR),
            };
        }),

    markAsReviewed: (id) =>
        set((state) => {
            const updated = state.readings.map((r) =>
                r.id === id ? { ...r, isOOR: false } : r
            );
            return {
                readings: updated,
                oorReadings: updated.filter(r => r.isOOR),
            };
        }),
}));