// src/stores/useCarePlanStore.ts
import { create } from 'zustand';

type CarePlan = {
  patientName: string;
  careGoal: string;
  interventions: string;
  startDate: string;
  nextReview: string;
};

type Goal = {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: 'On Track' | 'Needs Attention';
};

interface CarePlanStore {
  carePlan: CarePlan;
  goals: Goal[];
  
  updateCarePlan: (updates: Partial<CarePlan>) => void;
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  deleteGoal: (id: string) => void;
  updateGoalProgress: (id: string, progress: number) => void;
}

export const useCarePlanStore = create<CarePlanStore>((set) => ({
  carePlan: {
    patientName: "Muhammad Ahmed",
    careGoal: "Maintain Blood Pressure below 130/80 mmHg",
    interventions: "Daily BP monitoring, medication adherence, low sodium diet",
    startDate: "2026-03-15",
    nextReview: "2026-05-15",
  },
  goals: [
    { id: 'g1', title: 'Blood Pressure Control', target: '< 130/80 mmHg', progress: 78, status: 'On Track' },
    { id: 'g2', title: 'Daily Glucose Monitoring', target: '80-130 mg/dL', progress: 45, status: 'Needs Attention' },
  ],

  updateCarePlan: (updates) =>
    set((state) => ({ carePlan: { ...state.carePlan, ...updates } })),

  setGoals: (goals) => set({ goals }),

  addGoal: (newGoal) =>
    set((state) => ({
      goals: [
        ...state.goals,
        { ...newGoal, id: `g_${Date.now()}` }
      ]
    })),

  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id)
    })),

  updateGoalProgress: (id, progress) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, progress } : g
      )
    })),
}));