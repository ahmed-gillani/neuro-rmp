// src/hooks/useDocumentPolling.ts
// ─────────────────────────────────────────────────────────────────────────────
// Polls for AI document processing status until the job completes or fails.
//
// STRATEGY:
//   The frontend uploads a document → backend queues an AI job → frontend polls
//   GET /patients/:id/documents/:docId/status every N seconds until the
//   aiStatus becomes 'Completed' or 'Failed'.
//
//   If the backend later adds WebSocket/SSE support, swap the polling interval
//   for a socket.on('ai_job_complete') listener. This hook's return interface
//   stays identical — components need zero changes.
//
// BACKOFF:
//   Starts at 2s, doubles each interval up to a max of 30s.
//   Stops automatically on completion, failure, or unmount.
//
// USAGE:
//   const { document, isPolling, error } = useDocumentPolling(patientId, doc);
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react';
import { patientService } from '../services/patientService';
import type { PatientDocument, AiProcessingStatus } from '../types/patient';

const TERMINAL_STATUSES: AiProcessingStatus[] = ['Completed', 'Failed'];
const INITIAL_INTERVAL_MS = 2_000;
const MAX_INTERVAL_MS = 30_000;
const MAX_ATTEMPTS = 40; // ~15 minutes worst case with backoff

interface UseDocumentPollingReturn {
  document: PatientDocument;       // latest version — always up to date
  isPolling: boolean;
  error: string | null;
  stopPolling: () => void;
  restartPolling: () => void;      // call after a 'Failed' job to retry
}

export function useDocumentPolling(
  patientId: string,
  initialDocument: PatientDocument
): UseDocumentPollingReturn {
  const [document, setDocument] = useState<PatientDocument>(initialDocument);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptsRef = useRef(0);
  const intervalRef = useRef(INITIAL_INTERVAL_MS);
  const isMountedRef = useRef(true);

  const stopPolling = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPolling(false);
  }, []);

  const poll = useCallback(async () => {
    if (!isMountedRef.current) return;
    if (attemptsRef.current >= MAX_ATTEMPTS) {
      setError('AI processing timed out. Please try again.');
      stopPolling();
      return;
    }

    attemptsRef.current += 1;

    try {
      const latest = await patientService.getDocumentStatus(patientId, initialDocument.id);
      if (!isMountedRef.current) return;

      setDocument(latest);

      if (TERMINAL_STATUSES.includes(latest.aiStatus)) {
        // Job done — stop polling regardless of success/failure
        stopPolling();
        if (latest.aiStatus === 'Failed') {
          setError(latest.aiErrorMessage ?? 'AI processing failed. Please re-upload the document.');
        }
        return;
      }

      // Schedule next poll with exponential backoff
      intervalRef.current = Math.min(intervalRef.current * 1.5, MAX_INTERVAL_MS);
      timerRef.current = setTimeout(poll, intervalRef.current);
    } catch (err) {
      if (!isMountedRef.current) return;
      setError((err as Error).message);
      stopPolling();
    }
  }, [patientId, initialDocument.id, stopPolling]);

  const startPolling = useCallback(() => {
    attemptsRef.current = 0;
    intervalRef.current = INITIAL_INTERVAL_MS;
    setError(null);
    setIsPolling(true);
    timerRef.current = setTimeout(poll, INITIAL_INTERVAL_MS);
  }, [poll]);

  const restartPolling = useCallback(() => {
    stopPolling();
    startPolling();
  }, [stopPolling, startPolling]);

  // Auto-start polling if document is not yet in a terminal state
  useEffect(() => {
    isMountedRef.current = true;
    const isTerminal = TERMINAL_STATUSES.includes(initialDocument.aiStatus);
    if (!isTerminal) {
      startPolling();
    }
    return () => {
      isMountedRef.current = false;
      stopPolling();
    };
  }, [initialDocument.id]); // Only re-run if the document ID changes (new upload)

  return { document, isPolling, error, stopPolling, restartPolling };
}

// ─────────────────────────────────────────────────────────────────────────────
// FUTURE: WebSocket / SSE alternative (swap in when backend supports it)
//
// export function useDocumentPolling(patientId, initialDocument) {
//   const [document, setDocument] = useState(initialDocument);
//
//   useEffect(() => {
//     const socket = new WebSocket(`wss://api.yourdomain.com/ws`);
//     socket.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       if (msg.type === 'ai_job_complete' && msg.documentId === initialDocument.id) {
//         setDocument(msg.document);
//         socket.close();
//       }
//     };
//     return () => socket.close();
//   }, [initialDocument.id]);
//
//   return { document, isPolling: document.aiStatus === 'Processing', error: null, ... };
// }
// ─────────────────────────────────────────────────────────────────────────────