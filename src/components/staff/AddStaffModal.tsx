// src/components/staff/AddStaffModal.tsx
import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { UserPlus, X } from 'lucide-react';
import type { User } from '../../types';

export default function AddStaffModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (u: User) => void }) {
  const [formData, setFormData] = useState<Partial<User>>({ role: 'Nurse' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    const newStaff: User = { id: `stf_${Date.now()}`, name: formData.name, email: formData.email, role: formData.role || 'Nurse', patientsAssigned: 0, minutesLogged: 0, contactRate: 85 };
    onAdd(newStaff);
    onClose();
    setFormData({ role: 'Nurse' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Staff Member">
      <form onSubmit={handleSubmit} className="space-y-4 font-sans py-2">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
            <input required type="text" placeholder="John Doe" className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-blue-400" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <input required type="email" placeholder="john@healthcare.com" className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-blue-400" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider ml-1">Assigned Role</label>
            <select className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-blue-400" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}>
              <option value="Doctor">Doctor</option><option value="Nurse">Nurse</option><option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" className="flex-1 h-10 text-[11px] font-medium" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="flex-1 h-10 bg-[#0f172a] text-white border-none text-[11px] font-medium shadow-sm"><UserPlus size={14} className="mr-2" /> Register Staff</Button>
        </div>
      </form>
    </Modal>
  );
}