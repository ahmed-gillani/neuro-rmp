// src/types/rpm.ts
export interface OorReading {
  id: string;
  patientId: string;
  patientName: string;
  metric: 'Blood Pressure' | 'Glucose' | 'SpO2' | 'Heart Rate' | 'Weight';
  value: string;
  unit: string;
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING';
  notes?: string;
}

export interface DailyReading {
  id: string;
  patientId: string;
  patientName: string;
  metric: 'Blood Pressure' | 'Glucose' | 'SpO2' | 'Heart Rate' | 'Weight';
  value: string;
  unit: string;
  timestamp: string;
  reviewed: boolean;
}

export interface CptLog {
  code: string;
  description: string;
  minutesToday: number;
  targetMonthly: number;
  color: string;
}

export interface PatientAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'Missed Readings' | 'Status Change' | 'Expiring Consent' | 'Billing Risk';
  message: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
}

export interface AiInsight {
  topRisks: string[];
  clinicalTrends: string[];
  recommendations: string[];
}

export interface DashboardLayoutConfig {
  widgets: string[];
  columns: 2 | 3;
}