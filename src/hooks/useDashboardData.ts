// src/hooks/useDashboardData.ts
import { useState, useMemo } from 'react';
import { mockPatients, mockReadings } from '../data/mockData';
import type { OorReading, DailyReading, CptLog, PatientAlert, AiInsight, DashboardLayoutConfig } from '../types/rpm';

const MOCK_OOR: OorReading[] = [
  { id: 'oor1', patientId: 'p1', patientName: "Muhammad Ahmed", metric: 'Blood Pressure', value: '162/98', unit: 'mmHg', timestamp: '8 min ago', severity: 'CRITICAL' },
  { id: 'oor2', patientId: 'p2', patientName: "Fatima Khan", metric: 'Glucose', value: '248', unit: 'mg/dL', timestamp: '27 min ago', severity: 'CRITICAL' },
  { id: 'oor3', patientId: 'p3', patientName: "Ali Hassan", metric: 'SpO2', value: '91', unit: '%', timestamp: '1 hr ago', severity: 'WARNING' },
];

const MOCK_DAILIES: DailyReading[] = mockReadings.map(r => ({
  id: r.id,
  patientId: r.patientId,
  patientName: mockPatients.find(p => p.id === r.patientId)?.name || 'Unknown',
  metric: r.type as any,
  value: r.value,
  unit: r.unit,
  timestamp: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  reviewed: false,
}));

const MOCK_CPT: CptLog[] = [
  { code: '99457', description: 'RPM Treatment Mgmt', minutesToday: 47, targetMonthly: 60, color: '#10b981' },
  { code: '99458', description: 'RPM Addl 30min', minutesToday: 22, targetMonthly: 40, color: '#3b82f6' },
];

const MOCK_ALERTS: PatientAlert[] = [
  { id: 'al1', patientId: 'p4', patientName: "Sara Malik", type: 'Missed Readings', message: '3 days no BP readings', timestamp: '2h ago', severity: 'high' },
  { id: 'al2', patientId: 'p1', patientName: "Muhammad Ahmed", type: 'Status Change', message: 'Moved to Off Track', timestamp: '5h ago', severity: 'medium' },
];

const MOCK_AI: AiInsight = {
  topRisks: ["3 patients with sustained hypertension", "Glucose volatility in 2 diabetic patients"],
  clinicalTrends: ["Average BP improved 8 mmHg since last week", "SpO2 compliance at 94%"],
  recommendations: ["Schedule 99457 call for Ahmed", "Review diet log for Fatima"],
};

export const useDashboardData = () => {
  const [oorReadings, setOorReadings] = useState<OorReading[]>(MOCK_OOR);
  const [dailies, setDailies] = useState<DailyReading[]>(MOCK_DAILIES);
  const [alerts] = useState<PatientAlert[]>(MOCK_ALERTS);
  const [aiInsight] = useState<AiInsight>(MOCK_AI);
  const [cptLogs] = useState<CptLog[]>(MOCK_CPT);
  const [layoutConfig, setLayoutConfig] = useState<DashboardLayoutConfig>({
    widgets: ['oor', 'dailies', 'monitoring', 'alerts', 'ai'],
    columns: 3,
  });

  const markDailyReviewed = (id: string) => {
    setDailies(prev => prev.map(d => d.id === id ? { ...d, reviewed: true } : d));
  };

  const bulkAcknowledgeDailies = (ids: string[]) => {
    setDailies(prev => prev.map(d => ids.includes(d.id) ? { ...d, reviewed: true } : d));
  };

  const acknowledgeOor = (id: string) => {
    setOorReadings(prev => prev.filter(r => r.id !== id));
  };

  const updateLayout = (newConfig: Partial<DashboardLayoutConfig>) => {
    setLayoutConfig(prev => ({ ...prev, ...newConfig }));
  };

  const filteredDailies = useMemo(() => dailies.filter(d => !d.reviewed), [dailies]);

  return {
    oorReadings,
    dailies: filteredDailies,
    alerts,
    aiInsight,
    cptLogs,
    layoutConfig,
    markDailyReviewed,
    bulkAcknowledgeDailies,
    acknowledgeOor,
    updateLayout,
  };
};