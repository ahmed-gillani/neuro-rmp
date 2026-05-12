// src/components/devices/DeviceAssignModal.tsx
// RPM-009: Assign an available device to a patient

import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useDevicesStore } from '../../stores/useDevicesStore';
import { usePatientsStore } from '../../stores/usePatientsStore';
import { Link2 } from 'lucide-react';
import type { Device } from '../../types/devices';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  device: Device;
}

export default function DeviceAssignModal({ isOpen, onClose, device }: Props) {
  const { assignDevice } = useDevicesStore();
  const { patients } = usePatientsStore();
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [search, setSearch] = useState('');

  const filtered = patients.filter(
    (p) =>
      p.status !== 'Discharged' &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAssign = () => {
    if (!selectedPatientId) return;
    // 'stf_current' would be replaced by auth context in live mode
    assignDevice(device.id, selectedPatientId, 'stf_current');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Device">
      <div className="space-y-4">
        {/* Device summary */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Device</p>
          <p className="text-sm font-semibold text-slate-800">{device.type}</p>
          <p className="text-[10px] font-mono text-slate-400 mt-0.5">{device.serialNumber}</p>
        </div>

        {/* Patient search */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Select Patient</p>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-400 mb-2"
          />
          <div className="space-y-1.5 max-h-56 overflow-y-auto">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedPatientId === p.id
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className="text-[12px] font-semibold text-slate-800">{p.name}</p>
                  <p className="text-[10px] text-slate-400">{p.primaryProvider}</p>
                </div>
                <span className="text-[9px] font-mono text-slate-400">{p.id}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-center text-slate-400 py-6">No patients found</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} size="sm">Cancel</Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedPatientId}
            size="sm"
            className="bg-blue-600 text-white border-none"
          >
            <Link2 size={11} className="mr-1.5" /> Assign Device
          </Button>
        </div>
      </div>
    </Modal>
  );
}