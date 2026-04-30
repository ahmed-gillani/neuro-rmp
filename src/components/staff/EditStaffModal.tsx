// src/components/staff/EditStaffModal.tsx
import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import type { User } from '../../types';


interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: User | null;
  onSave: (updatedStaff: User) => void;
}

export default function EditStaffModal({ isOpen, onClose, staff, onSave }: EditStaffModalProps) {
  const [formData, setFormData] = useState(staff || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    onSave(formData as User);
    onClose();
  };

  if (!staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Staff Member">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
          >
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
            <option value="Biller">Biller</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}