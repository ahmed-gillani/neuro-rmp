// src/components/devices/DeviceDetailContent.tsx
import Button from '../common/Button';
import { RotateCcw } from 'lucide-react';
import type { Device } from '../../types';

interface Props {
  device: Device;
  onClose: () => void;
  onReturn: () => void;
}

export default function DeviceDetailContent({ device, onClose, onReturn }: Props) {
  return (
    <div className="space-y-6 py-2">
      {/* Device Information */}
      <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">DEVICE</p>
        <p className="text-xl font-semibold text-slate-900">{device.type}</p>
        <p className="font-mono text-sm text-slate-500 mt-1">{device.serialNumber}</p>
        
        {device.patientId && (
          <p className="text-xs text-slate-500 mt-3">
            Assigned to Patient: <span className="font-medium">{device.patientId}</span>
          </p>
        )}
      </div>

      {/* Status Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Status</p>
          <p className="font-semibold text-slate-800 mt-1">{device.status}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Connection</p>
          <p className="font-semibold text-slate-800 mt-1">{device.connectionStatus}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-slate-100">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="flex-1"
        >
          Close
        </Button>

        {device.patientId && (
          <Button
            onClick={onReturn}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
          >
            <RotateCcw size={16} className="mr-2" />
            Initiate Return
          </Button>
        )}
      </div>
    </div>
  );
}