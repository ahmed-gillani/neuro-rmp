// src/components/staff/PermissionsModal.tsx
import Modal from '../common/Modal';
import Button from '../common/Button';
import type { User } from '../../types';

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: User | null;
}

export default function PermissionsModal({ isOpen, onClose, staff }: PermissionsModalProps) {
  if (!staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Permissions - ${staff.name}`}>
      <div className="space-y-6">
        <p className="text-slate-800">Manage access rights for <strong>{staff.name}</strong></p>

        <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span>Patient Management</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center">
            <span>Readings & Monitoring</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center">
            <span>Billing Access</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex justify-between items-center">
            <span>Staff Management</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>

        <Button className="w-full" onClick={onClose}>
          Save Permissions
        </Button>
      </div>
    </Modal>
  );
}