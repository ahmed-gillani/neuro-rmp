// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Doctor' | 'Nurse' | 'Biller';
  patientsAssigned?: number;
  minutesLogged?: number;
  contactRate?: number; // e.g., 94 = 94%
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  status: 'New' | 'Active' | 'OOR' | 'Off Track' | 'Discharged';
  phone: string;
  address?: string;
  primaryProvider: string;
  careCoordinator?: string;
  enrollmentDate: string;
  lastReadingDate?: string;
}

export interface Reading {
  id: string;
  patientId: string;
  type: 'Blood Pressure' | 'Glucose' | 'SpO2' | 'Weight' | 'Heart Rate';
  value: string;
  unit: string;
  timestamp: string;
  isOOR: boolean;
  notes?: string;
}

export interface Device {
  id: string;
  patientId?: string;
  type: string;
  serialNumber: string;
  status: 'Assigned' | 'Available' | 'In Repair' | 'Retired';
  lastConnected?: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change?: number;
  color?: string;
}

// Optional: Add more interfaces as we build new modules
export interface CareTeamMember {
  id: string;
  name: string;
  role: string;
}

export interface OnboardingStep {
  step: number;
  title: string;
  completed: boolean;
}