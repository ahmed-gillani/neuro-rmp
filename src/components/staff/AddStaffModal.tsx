// src/components/staff/AddStaffModal.tsx
import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import type { User } from '../../types';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newStaff: User) => void;
}

export default function AddStaffModal({ isOpen, onClose, onAdd }: AddStaffModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    role: 'Nurse',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newStaff: User = {
      id: `stf_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role || 'Nurse',
      patientsAssigned: 0,
      minutesLogged: 0,
      contactRate: 85,
    };

    onAdd(newStaff);
    onClose();
    setFormData({ role: 'Nurse' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Staff Member">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500"
            placeholder="Enter full name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500"
            placeholder="staff@rpm.com"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
          >
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
            <option value="Biller">Biller</option>
            <option value="Case Manager">Case Manager</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">Add Staff Member</Button>
        </div>
      </form>
    </Modal>
  );
}