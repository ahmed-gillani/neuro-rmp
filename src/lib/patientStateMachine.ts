// src/lib/patientStateMachine.ts
// ─────────────────────────────────────────────────────────────────────────────
// Implements the Patient Status lifecycle as a pure state machine.
// Used by usePatient to validate transitions BEFORE hitting the API,
// so the UI can show a specific error without a round trip.
//
// STATE DIAGRAM:
//
//   ┌─────────┐
//   │   New   │──────────────────────────────────────┐
//   └────┬────┘                                       │
//        │                                            │
//        ▼                                            │
//   ┌────────┐     reading OOR     ┌─────┐            │
//   │ Active │──────────────────►  │ OOR │            │
//   │        │◄────────────────── │     │            │
//   └────┬───┘    reading normal   └──┬──┘            │
//        │                           │                │
//        │   missed readings         │                ▼
//        ▼                           │          ┌────────────┐
//   ┌───────────┐                    │          │ Discharged │
//   │ Off Track │◄───────────────────┘          └────────────┘
//   └───────────┘                               (terminal)
//        │
//        └──────────────────────────────────────────►┘
//
// ─────────────────────────────────────────────────────────────────────────────

import type { PatientStatus } from '../types/patient';
import { PATIENT_STATUS_TRANSITIONS } from '../types/patient';

/**
 * Returns true if moving from `from` → `to` is a valid transition.
 */
export function canTransition(from: PatientStatus, to: PatientStatus): boolean {
  return PATIENT_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Returns all valid next statuses from a given current status.
 */
export function getValidTransitions(current: PatientStatus): PatientStatus[] {
  return PATIENT_STATUS_TRANSITIONS[current] ?? [];
}

/**
 * Throws a descriptive error if the transition is invalid.
 * Use this in service layer for defensive programming.
 */
export function assertValidTransition(from: PatientStatus, to: PatientStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(
      `Invalid status transition: "${from}" → "${to}". ` +
        `Valid transitions from "${from}": [${getValidTransitions(from).join(', ') || 'none'}].`
    );
  }
}

/**
 * Human-readable label and color for each status.
 * Use in StatusBadge components.
 */
export const STATUS_META: Record<
  PatientStatus,
  { label: string; color: string; bgColor: string; description: string }
> = {
  New: {
    label: 'New',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
    description: 'Recently enrolled, not yet active in monitoring',
  },
  Active: {
    label: 'Active',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
    description: 'Actively monitored, readings within normal range',
  },
  OOR: {
    label: 'Out of Range',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50 border-rose-200',
    description: 'Recent readings outside normal parameters — requires review',
  },
  'Off Track': {
    label: 'Off Track',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    description: 'Consistently missing readings or not meeting program goals',
  },
  Discharged: {
    label: 'Discharged',
    color: 'text-slate-500',
    bgColor: 'bg-slate-100 border-slate-200',
    description: 'No longer enrolled in the program',
  },
};