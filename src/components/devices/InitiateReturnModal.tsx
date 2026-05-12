// src/components/devices/InitiateReturnModal.tsx
// RPM-009: Initiate a device return request

import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useDevicesStore } from '../../stores/useDevicesStore';
import { RotateCcw } from 'lucide-react';
import type { Device, ReturnReason } from '../../types/devices';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  device: Device;
}

const RETURN_REASONS: ReturnReason[] = [
  'Patient Discharged',
  'Device Malfunction',
  'Patient Request',
  'Upgrade',
  'Other',
];

export default function InitiateReturnModal({ isOpen, onClose, device }: Props) {
  const { initiateReturn } = useDevicesStore();
  const [reason, setReason] = useState<ReturnReason>('Patient Discharged');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    if (!confirmed) return;
    // patientId & initiatedBy would come from context in live mode
    initiateReturn(device.id, device.patientId ?? '', 'stf_current', reason, notes.trim() || undefined);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initiate Device Return">
      <div className="space-y-4">
        {/* Device summary */}
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
          <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-1">Returning Device</p>
          <p className="text-sm font-semibold text-slate-800">{device.type}</p>
          <p className="text-[10px] font-mono text-slate-400 mt-0.5">{device.serialNumber}</p>
          {device.patientId && (
            <p className="text-[10px] text-slate-400 mt-1">Assigned to patient: <span className="font-mono">{device.patientId}</span></p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Return Reason</label>
          <div className="space-y-1.5">
            {RETURN_REASONS.map((r) => (
              <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="return-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-blue-600"
                />
                <span className="text-[12px] text-slate-700 group-hover:text-slate-900">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Describe the issue or reason..."
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-400 resize-none"
          />
        </div>

        {/* Confirmation */}
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 accent-blue-600"
          />
          <span className="text-[11px] text-slate-500 leading-relaxed">
            I confirm this return request. The device will be unassigned and marked for return processing.
          </span>
        </label>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} size="sm">Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!confirmed}
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-white border-none"
          >
            <RotateCcw size={11} className="mr-1.5" /> Initiate Return
          </Button>
        </div>
      </div>
    </Modal>
  );
}