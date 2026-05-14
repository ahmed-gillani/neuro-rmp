// src/hooks/useOnboarding.ts
// ─────────────────────────────────────────────────────────────────────────────
// Manages the 4-step Patient Onboarding flow.
// Keeps form state across steps, validates each step, and submits via service.
//
// USAGE (in PatientOnboarding.tsx):
//   const { step, form, errors, next, back, updateDemographics, submit } = useOnboarding();
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../services/patientService';
import { usePatientsStore } from '../stores/usePatientsStore';
import type {
  OnboardingFormState,
  OnboardingStepId,
  PatientDemographics,
  InsurancePlan,
  PatientFull,
} from '../types/patient';

const STEP_ORDER: OnboardingStepId[] = [
  'demographics',
  'insurance',
  'program',
  'documents',
  'review',
];

type FieldErrors = Record<string, string>;

const INITIAL_FORM: OnboardingFormState = {
  demographics: { status: undefined, phone: '+92 ' },
  insurance: { isPrimary: true, eligibilityStatus: 'Not Checked' },
  program: { primaryDiagnoses: [] },
  documents: { pendingUploads: [] },
};

export function useOnboarding() {
  const navigate = useNavigate();
  const { addPatient } = usePatientsStore();

  const [currentStep, setCurrentStep] = useState<OnboardingStepId>('demographics');
  const [form, setForm] = useState<OnboardingFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentStep === 'review';

  // ── Per-step validators ───────────────────────────────────────────────────

  const validateStep = useCallback((): boolean => {
    const newErrors: FieldErrors = {};

    if (currentStep === 'demographics') {
      const d = form.demographics;
      if (!d.name?.trim()) newErrors.name = 'Full name is required';
      if (!d.dob) newErrors.dob = 'Date of birth is required';
      if (!d.gender) newErrors.gender = 'Gender is required';
      if (!d.phone || d.phone.replace(/\D/g, '').length < 7)
        newErrors.phone = 'Valid phone number is required';
    }

    if (currentStep === 'insurance') {
      const ins = form.insurance;
      // Insurance is optional — but if provider is given, memberId is required
      if (ins.provider && !ins.memberId?.trim()) {
        newErrors.memberId = 'Member ID is required when provider is specified';
      }
      if (ins.provider && !ins.planType) {
        newErrors.planType = 'Plan type is required';
      }
    }

    if (currentStep === 'program') {
      if (!form.program.selectedProgramId) {
        newErrors.program = 'Please select an RPM program';
      }
      if (form.program.primaryDiagnoses.length === 0) {
        newErrors.diagnoses = 'At least one ICD-10 diagnosis code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, form]);

  // ── Navigation ────────────────────────────────────────────────────────────

  const next = useCallback(() => {
    if (!validateStep()) return;
    if (!isLastStep) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  }, [validateStep, isLastStep, currentIndex]);

  const back = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
      setErrors({});
    }
  }, [isFirstStep, currentIndex]);

  const goToStep = useCallback((step: OnboardingStepId) => {
    const targetIdx = STEP_ORDER.indexOf(step);
    // Only allow jumping backwards (forward requires validation)
    if (targetIdx < currentIndex) {
      setCurrentStep(step);
      setErrors({});
    }
  }, [currentIndex]);

  // ── Form updaters (typed per section) ────────────────────────────────────

  const updateDemographics = useCallback(
    (field: keyof PatientDemographics, value: string) => {
      setForm((prev) => ({
        ...prev,
        demographics: { ...prev.demographics, [field]: value },
      }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    },
    [errors]
  );

  const updateInsurance = useCallback(
    (field: keyof InsurancePlan, value: string | boolean) => {
      setForm((prev) => ({
        ...prev,
        insurance: { ...prev.insurance, [field]: value },
      }));
      if (errors[field as string]) setErrors((prev) => ({ ...prev, [field as string]: '' }));
    },
    [errors]
  );

  const updateProgram = useCallback(
    (field: keyof OnboardingFormState['program'], value: string | string[]) => {
      setForm((prev) => ({
        ...prev,
        program: { ...prev.program, [field]: value },
      }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    },
    [errors]
  );

  const addDiagnosis = useCallback((code: string) => {
    setForm((prev) => ({
      ...prev,
      program: {
        ...prev.program,
        primaryDiagnoses: [...prev.program.primaryDiagnoses, code],
      },
    }));
  }, []);

  const removeDiagnosis = useCallback((code: string) => {
    setForm((prev) => ({
      ...prev,
      program: {
        ...prev.program,
        primaryDiagnoses: prev.program.primaryDiagnoses.filter((d) => d !== code),
      },
    }));
  }, []);

  const addPendingFile = useCallback((file: File) => {
    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        pendingUploads: [...prev.documents.pendingUploads, file],
      },
    }));
  }, []);

  const removePendingFile = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        pendingUploads: prev.documents.pendingUploads.filter((_, i) => i !== index),
      },
    }));
  }, []);

  // ── Final submission ──────────────────────────────────────────────────────

  const submit = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const patient: PatientFull = await patientService.onboard(form);
      // Sync new patient into the Zustand list store
      addPatient({
        id: patient.id,
        name: patient.name,
        dob: patient.dob,
        gender: patient.gender,
        phone: patient.phone,
        status: patient.status,
        primaryProvider: patient.primaryProvider,
        enrollmentDate: patient.enrollmentDate,
        address: patient.address,
      });
      navigate(`/patients/${patient.id}`);
      return true;
    } catch (err) {
      setSubmitError((err as Error).message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, addPatient, navigate]);

  return {
    // State
    currentStep,
    currentIndex,
    totalSteps: STEP_ORDER.length,
    isFirstStep,
    isLastStep,
    form,
    errors,
    isSubmitting,
    submitError,

    // Navigation
    next,
    back,
    goToStep,

    // Form updaters
    updateDemographics,
    updateInsurance,
    updateProgram,
    addDiagnosis,
    removeDiagnosis,
    addPendingFile,
    removePendingFile,

    // Submit
    submit,
  };
}