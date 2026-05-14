import { setupWorker } from 'msw/browser';
import { patientHandlers } from './handlers/patientHandlers';
export const worker = setupWorker(...patientHandlers);