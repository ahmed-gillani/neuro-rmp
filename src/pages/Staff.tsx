// src/pages/Staff.tsx
import { useState } from 'react';
import { useStaffStore } from '../stores/useStaffStore';
import type { User } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Search, Plus, UserCircle, Clock, Users, TrendingUp, Filter } from 'lucide-react';

import AddStaffModal from '../components/staff/AddStaffModal';
import EditStaffModal from '../components/staff/EditStaffModal';
import PermissionsModal from '../components/staff/PermissionsModal';

export default function Staff() {
  const { staff, addStaff, updateStaff } = useStaffStore();
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
    <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl font-medium text-[#0f172a] tracking-tight leading-none">Staff Management</h1>
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider mt-1.5">Team Performance & Load</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)} 
          size="sm" 
          className="h-9 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-sm px-4 font-medium transition-all"
        >
          <Plus size={14} className="mr-2" /> Add Staff Member
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: 'Assigned Patients', val: staff.reduce((sum, s) => sum + (s.patientsAssigned || 0), 0), icon: Users, color: '#3b82f6' },
          { label: 'Logged Minutes', val: staff.reduce((sum, s) => sum + (s.minutesLogged || 0), 0), icon: Clock, color: '#f59e0b' },
          { label: 'Avg Contact Rate', val: `${Math.round(staff.reduce((sum, s) => sum + (s.contactRate || 0), 0) / staff.length)}%`, icon: TrendingUp, color: '#10b981' },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-100 shadow-sm p-3.5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-lg font-medium text-[#1e293b] leading-none tracking-tight">{stat.val}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1.5">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Compact Action Bar - Search & Filter integrated */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        <div className="relative w-full sm:w-72"> {/* w-72 sets a professional compact width */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, role..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-400 text-[11px] font-medium font-sans shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-medium text-slate-600 uppercase tracking-wider hover:bg-slate-100 transition-colors">
            <Filter size={12} /> All Roles
          </button>
        </div>
      </div>

      {/* Staff Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((member) => (
          <Card key={member.id} noPadding className="border-slate-100 hover:border-blue-100 transition-all shadow-none font-sans overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                <UserCircle size={24} />
              </div>
              <div className="flex-1 min-w-0 font-sans">
                <p className="text-[13px] font-medium text-slate-900 truncate leading-none">{member.name}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tight mt-1">{member.role}</p>
              </div>
              <Badge status="Active" className="text-[8px] h-fit" />
            </div>

            <div className="grid grid-cols-3 gap-2 p-4 text-center bg-slate-50/30">
              <div>
                <p className="text-sm font-medium text-blue-600 leading-none">{member.patientsAssigned}</p>
                <p className="text-[9px] uppercase text-slate-400 font-medium tracking-tighter mt-1.5">Patients</p>
              </div>
              <div className="border-x border-slate-100">
                <p className="text-sm font-medium text-slate-800 leading-none">{member.minutesLogged}</p>
                <p className="text-[9px] uppercase text-slate-400 font-medium tracking-tighter mt-1.5">Mins</p>
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-600 leading-none">{member.contactRate}%</p>
                <p className="text-[9px] uppercase text-slate-400 font-medium tracking-tighter mt-1.5">Reach</p>
              </div>
            </div>

            <div className="p-2 bg-white flex gap-2 border-t border-slate-50">
              <button className="flex-1 py-2 text-[10px] font-medium uppercase text-slate-600 hover:bg-slate-50 rounded-md transition-colors" onClick={() => openEditModal(member)}>Edit</button>
              <button className="flex-1 py-2 text-[10px] font-medium uppercase text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={() => { setSelectedStaff(member); setIsPermissionsModalOpen(true); }}>Permissions</button>
            </div>
          </Card>
        ))}
      </div>

      <AddStaffModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addStaff} />
      <EditStaffModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} staff={selectedStaff} onSave={(updated) => updateStaff(updated.id, updated)} />
      <PermissionsModal isOpen={isPermissionsModalOpen} onClose={() => setIsPermissionsModalOpen(false)} staff={selectedStaff} />
    </div>
  );
}