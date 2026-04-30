// // src/pages/Staff.tsx
import { useState } from 'react';
import { mockStaff } from '../data/mockData';
import type { User } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Search, Plus, UserCircle, Clock, Users, TrendingUp } from 'lucide-react';

import AddStaffModal from '../components/staff/AddStaffModal';
import EditStaffModal from '../components/staff/EditStaffModal';
import PermissionsModal from '../components/staff/PermissionsModal';

export default function Staff() {
  const [staff, setStaff] = useState<User[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (member: User) => {
    setSelectedStaff(member);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--text-h))]">Staff Management</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">Team performance and assignments</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Assigned Patients', val: staff.reduce((sum, s) => sum + (s.patientsAssigned || 0), 0), icon: Users, color: 'blue' },
          { label: 'Logged Minutes', val: staff.reduce((sum, s) => sum + (s.minutesLogged || 0), 0), icon: Clock, color: 'amber' },
          { label: 'Avg Contact Rate', val: `${Math.round(staff.reduce((sum, s) => sum + (s.contactRate || 0), 0) / staff.length)}%`, icon: TrendingUp, color: 'emerald' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm p-5">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[rgb(var(--text-h))]">{stat.val}</p>
                <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-visible">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search by name, role or email..."
            className="w-full pl-12 py-3 bg-[rgb(var(--muted))] border-none rounded-[var(--radius-btn)] outline-none focus:ring-2 focus:ring-[rgb(var(--primary)/0.2)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <div key={member.id} className="bg-white border border-[rgb(var(--border))] rounded-[var(--radius-card)] p-5 hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 border-b border-[rgb(var(--border))] pb-4">
                <div className="w-12 h-12 bg-[rgb(var(--primary)/0.1)] rounded-full flex items-center justify-center text-[rgb(var(--primary))]">
                  <UserCircle className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[rgb(var(--text-h))] truncate">{member.name}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] truncate">{member.role}</p>
                </div>
                <Badge status="Active" />
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 text-center">
                <div>
                  <p className="text-lg font-bold text-[rgb(var(--primary))]">{member.patientsAssigned}</p>
                  <p className="text-[10px] uppercase text-[rgb(var(--muted-foreground))]">Patients</p>
                </div>
                <div className="border-x border-[rgb(var(--border))]">
                  <p className="text-lg font-bold text-[rgb(var(--text-h))]">{member.minutesLogged}</p>
                  <p className="text-[10px] uppercase text-[rgb(var(--muted-foreground))]">Mins</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-600">{member.contactRate}%</p>
                  <p className="text-[10px] uppercase text-[rgb(var(--muted-foreground))]">Reach</p>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => openEditModal(member)}>Edit</Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => {setSelectedStaff(member); setIsPermissionsModalOpen(true);}}>Permissions</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <AddStaffModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={(s) => setStaff([...staff, s])} />
      <EditStaffModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} staff={selectedStaff} onSave={(updated) => setStaff(staff.map(s => s.id === updated.id ? updated : s))} />
      <PermissionsModal isOpen={isPermissionsModalOpen} onClose={() => setIsPermissionsModalOpen(false)} staff={selectedStaff} />
    </div>
  );
}