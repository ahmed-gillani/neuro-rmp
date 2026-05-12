// src/components/devices/RegisterDeviceModal.tsx
// RPM-009: Register a new device into inventory

import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useDevicesStore } from '../../stores/useDevicesStore';
import type { DeviceType, DeviceVendor } from '../../types/devices';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DEVICE_TYPES: DeviceType[] = [
  'Blood Pressure Monitor',
  'Glucose Meter',
  'SpO2 Monitor',
  'Weight Scale',
  'Thermometer',
  'ECG Monitor',
  'Peak Flow Meter',
];

const VENDORS: DeviceVendor[] = ['Tenovi', 'Withings', 'iHealth', 'Omron', 'Other'];

export default function RegisterDeviceModal({ isOpen, onClose }: Props) {
  const { addDevice } = useDevicesStore();
  const [form, setForm] = useState({
    type: DEVICE_TYPES[0],
    vendor: VENDORS[0],
    serialNumber: '',
    imei: '',
    firmware: '',
    purchasedAt: '',
    warrantyExpiry: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.serialNumber.trim()) e.serialNumber = 'Serial number is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    addDevice({
      type: form.type as DeviceType,
      vendor: form.vendor as DeviceVendor,
      serialNumber: form.serialNumber.trim().toUpperCase(),
      imei: form.imei.trim() || undefined,
      firmware: form.firmware.trim() || undefined,
      status: 'Available',
      connectionStatus: 'Never Connected',
      purchasedAt: form.purchasedAt || undefined,
      warrantyExpiry: form.warrantyExpiry || undefined,
      notes: form.notes.trim() || undefined,
    });
    onClose();
  };

  const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: undefined })); }}
        className={`w-full px-3 py-2 text-xs border rounded-lg outline-none focus:border-blue-400 bg-white ${errors[key] ? 'border-rose-400' : 'border-slate-200'}`}
      />
      {errors[key] && <p className="text-[10px] text-rose-500 mt-0.5">{errors[key]}</p>}
    </div>
  );

  const selectField = (label: string, key: keyof typeof form, options: string[]) => (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</label>
      <select
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-400 bg-white"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Device">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {selectField('Device Type', 'type', DEVICE_TYPES)}
          {selectField('Vendor', 'vendor', VENDORS)}
        </div>
        {field('Serial Number *', 'serialNumber', 'text', 'e.g. TENOVI-BP-78492')}
        <div className="grid grid-cols-2 gap-3">
          {field('IMEI (optional)', 'imei', 'text', '15-digit IMEI')}
          {field('Firmware Version', 'firmware', 'text', 'e.g. 2.4.1')}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {field('Purchase Date', 'purchasedAt', 'date')}
          {field('Warranty Expiry', 'warrantyExpiry', 'date')}
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={2}
            placeholder="Any additional notes..."
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-400 bg-white resize-none"
          />
        </div>
        <div className="flex gap-3 justify-end pt-1">
          <Button variant="outline" onClick={onClose} size="sm">Cancel</Button>
          <Button onClick={handleSubmit} size="sm" className="bg-blue-600 text-white border-none">Register Device</Button>
        </div>
      </div>
    </Modal>
  );
}