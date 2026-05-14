// src/hooks/usePatient.ts
// ─────────────────────────────────────────────────────────────────────────────
// The primary hook for working with a single patient's full data.
//
// - Calls patientService (never fetch/axios directly)
// - Syncs mutations back into usePatientsStore (for list views to stay fresh)
// - Validates status transitions via the state machine before calling API
// - Provides typed loading/error states for every async operation
//
// USAGE:
//   const { patient, isLoading, transitionStatus, uploadDocument } = usePatient('pat_001');
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react';
import { patientService } from '../services/patientService';
import { usePatientsStore } from '../stores/usePatientsStore';
import { canTransition } from '../lib/patientStateMachine';
import type { PatientFull, PatientStatus, PatientDemographics, PatientDocument } from '../types/patient';

// ── Async operation state shape (reusable across any mutation) ────────────────

interface AsyncState<T = void> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function defaultAsyncState<T = void>(): AsyncState<T> {
  return { data: null, isLoading: false, error: null };
}

// ── Hook return type ──────────────────────────────────────────────────────────

interface UsePatientReturn {
  // Data
  patient: PatientFull | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;

  // Status transitions
  transitionStatus: (
    newStatus: PatientStatus,
    reason?: string
  ) => Promise<boolean>;
  statusOp: AsyncState;

  // Demographics
  updateDemographics: (data: Partial<PatientDemographics>) => Promise<boolean>;
  demographicsOp: AsyncState;

  // Document upload
  uploadDocument: (
    file: File,
    category: PatientDocument['category']
  ) => Promise<PatientDocument | null>;
  uploadOp: AsyncState<PatientDocument>;

  // Insurance eligibility check
  checkEligibility: (insuranceId: string) => Promise<boolean>;
  eligibilityOp: AsyncState;

  // Discharge
  discharge: (reason: string) => Promise<boolean>;
  dischargeOp: AsyncState;
}

// ── Hook implementation ───────────────────────────────────────────────────────

export function usePatient(patientId: string): UsePatientReturn {
  const { updatePatient } = usePatientsStore();

  // Main data state
  const [patient, setPatient] = useState<PatientFull | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Per-operation states
  const [statusOp, setStatusOp] = useState(defaultAsyncState());
  const [demographicsOp, setDemographicsOp] = useState(defaultAsyncState());
  const [uploadOp, setUploadOp] = useState(defaultAsyncState<PatientDocument>());
  const [eligibilityOp, setEligibilityOp] = useState(defaultAsyncState());
  const [dischargeOp, setDischargeOp] = useState(defaultAsyncState());

  // Abort controller — cancels in-flight fetch on unmount / patientId change
  const abortRef = useRef<AbortController | null>(null);

  const fetchPatient = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    try {
      const data = await patientService.getById(patientId);
      setPatient(data);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchPatient();
    return () => abortRef.current?.abort();
  }, [fetchPatient]);

  // ── Status Transition ───────────────────────────────────────────────────────

  const transitionStatus = useCallback(
    async (newStatus: PatientStatus, reason?: string): Promise<boolean> => {
      if (!patient) return false;

      // Guard: validate against state machine before hitting the API
      if (!canTransition(patient.status, newStatus)) {
        setStatusOp({
          data: null,
          isLoading: false,
          error: `Cannot transition from "${patient.status}" to "${newStatus}".`,
        });
        return false;
      }

      setStatusOp({ data: null, isLoading: true, error: null });
      try {
        const updated = await patientService.transitionStatus(patient.id, newStatus, reason);
        setPatient(updated);
        // Keep slim list store in sync
        updatePatient(patient.id, { status: newStatus });
        setStatusOp({ data: null, isLoading: false, error: null });
        return true;
      } catch (err) {
        setStatusOp({ data: null, isLoading: false, error: (err as Error).message });
        return false;
      }
    },
    [patient, updatePatient]
  );

  // ── Demographics Update ─────────────────────────────────────────────────────

  const updateDemographics = useCallback(
    async (data: Partial<PatientDemographics>): Promise<boolean> => {
      if (!patient) return false;
      setDemographicsOp({ data: null, isLoading: true, error: null });
      try {
        const updated = await patientService.updateDemographics(patient.id, data);
        setPatient(updated);
        updatePatient(patient.id, { name: updated.name, phone: updated.phone });
        setDemographicsOp({ data: null, isLoading: false, error: null });
        return true;
      } catch (err) {
        setDemographicsOp({ data: null, isLoading: false, error: (err as Error).message });
        return false;
      }
    },
    [patient, updatePatient]
  );

  // ── Document Upload ─────────────────────────────────────────────────────────

  const uploadDocument = useCallback(
    async (file: File, category: PatientDocument['category']): Promise<PatientDocument | null> => {
      if (!patient) return null;
      setUploadOp({ data: null, isLoading: true, error: null });
      try {
        const doc = await patientService.uploadDocument(patient.id, file, category);
        // Append to local state so UI updates immediately without a full refetch
        setPatient((prev) =>
          prev
            ? { ...prev, documents: [...(prev.documents ?? []), doc] }
            : prev
        );
        setUploadOp({ data: doc, isLoading: false, error: null });
        return doc;
      } catch (err) {
        setUploadOp({ data: null, isLoading: false, error: (err as Error).message });
        return null;
      }
    },
    [patient]
  );

  // ── Insurance Eligibility Check ─────────────────────────────────────────────

  const checkEligibility = useCallback(
    async (insuranceId: string): Promise<boolean> => {
      if (!patient) return false;
      setEligibilityOp({ data: null, isLoading: true, error: null });
      try {
        const updated = await patientService.checkEligibility(patient.id, insuranceId);
        setPatient((prev) =>
          prev
            ? {
                ...prev,
                insurance: prev.insurance?.map((i) =>
                  i.id === insuranceId ? updated : i
                ),
              }
            : prev
        );
        setEligibilityOp({ data: null, isLoading: false, error: null });
        return true;
      } catch (err) {
        setEligibilityOp({ data: null, isLoading: false, error: (err as Error).message });
        return false;
      }
    },
    [patient]
  );

  // ── Discharge ───────────────────────────────────────────────────────────────

  const discharge = useCallback(
    async (reason: string): Promise<boolean> => {
      if (!patient) return false;
      setDischargeOp({ data: null, isLoading: true, error: null });
      try {
        const updated = await patientService.discharge(patient.id, reason);
        setPatient(updated);
        updatePatient(patient.id, { status: 'Discharged' });
        setDischargeOp({ data: null, isLoading: false, error: null });
        return true;
      } catch (err) {
        setDischargeOp({ data: null, isLoading: false, error: (err as Error).message });
        return false;
      }
    },
    [patient, updatePatient]
  );

  return {
    patient,
    isLoading,
    error,
    refetch: fetchPatient,
    transitionStatus,
    statusOp,
    updateDemographics,
    demographicsOp,
    uploadDocument,
    uploadOp,
    checkEligibility,
    eligibilityOp,
    discharge,
    dischargeOp,
  };
}