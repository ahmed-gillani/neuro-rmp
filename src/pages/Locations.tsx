// src/pages/Locations.tsx
import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  fax?: string;
  email: string;
  timezone: string;
  workingHours: string;
  status: 'Active' | 'Inactive';
  assignedStaff: number;
}

const LocationManagement: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: "Main Clinic - Gujranwala",
      type: "CLINIC",
      address: "GT Road, Near WAPDA Town",
      city: "Gujranwala",
      state: "Punjab",
      phone: "+92 300 1234567",
      email: "info@gujranwalaclinic.com",
      timezone: "Asia/Karachi",
      workingHours: "08:00 AM - 08:00 PM",
      status: "Active",
      assignedStaff: 12
    },
    {
      id: 2,
      name: "Satellite Clinic",
      type: "CLINIC",
      address: "Satellite Town, Block C",
      city: "Gujranwala",
      state: "Punjab",
      phone: "+92 301 9876543",
      email: "satellite@gujranwalaclinic.com",
      timezone: "Asia/Karachi",
      workingHours: "09:00 AM - 05:00 PM",
      status: "Active",
      assignedStaff: 7
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({});

  const handleAddNew = () => {
    setEditingLocation(null);
    setFormData({
      type: "CLINIC",
      status: "Active",
      timezone: "Asia/Karachi",
      workingHours: "08:00 AM - 08:00 PM"
    });
    setShowModal(true);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({ ...location });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this location?")) {
      setLocations(prev => prev.filter(loc => loc.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name?.trim() || !formData.address?.trim() || !formData.phone?.trim()) {
      alert("Name, Address and Phone are required!");
      return;
    }

    if (editingLocation) {
      setLocations(prev => prev.map(loc =>
        loc.id === editingLocation.id ? { ...loc, ...formData } as Location : loc
      ));
    } else {
      const newLoc: Location = {
        id: Date.now(),
        name: formData.name!,
        type: formData.type || "CLINIC",
        address: formData.address!,
        city: formData.city || "",
        state: formData.state || "",
        phone: formData.phone!,
        email: formData.email || "",
        timezone: formData.timezone || "Asia/Karachi",
        workingHours: formData.workingHours || "",
        status: formData.status || "Active",
        assignedStaff: 0,
      };
      setLocations(prev => [...prev, newLoc]);
    }

    setShowModal(false);
    setFormData({});
    setEditingLocation(null);
  };

  return (
    <div className="space-y-4 font-sans animate-in fade-in duration-500">
      {/* Header Section - Matches Admin Dashboard Style */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <div className="min-w-0 px-1">
          <h2 className="text-[13px] font-medium text-[#1e293b] uppercase tracking-widest leading-none">
            Registered Locations
          </h2>
          <p className="text-[12px] font-medium text-slate-500 uppercase tracking-tight mt-1.5">
            {locations.length} active branches
          </p>
        </div>

        <Button
          size="sm"
          onClick={handleAddNew}
          className="h-8 px-3 text-[12px] font-medium border-slate-200 shadow-none hover:bg-slate-50 shrink-0"
          variant="outline"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Add New
        </Button>
      </div>

      {/* Table Section */}
      <Card noPadding className="w-full overflow-hidden border-slate-100 shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-4 py-2.5 text-[11px] font-medium text-slate-500 uppercase tracking-widest">Location</th>
                <th className="px-4 py-2.5 text-[11px] font-medium text-slate-500 uppercase tracking-widest">Physical Address</th>
                <th className="px-4 py-2.5 text-[11px] font-medium text-slate-500 uppercase tracking-widest text-center">Status</th>
                <th className="px-4 py-2.5 text-[11px] font-medium text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-4 py-3">
                    <p className="text-[13px] font-medium text-[#1e293b] uppercase tracking-widest leading-none">{loc.name}</p>
                    <span className="text-[10px] font-medium text-blue-500 uppercase tracking-widest mt-1 block">{loc.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-slate-400 shrink-0" />
                      <p className="text-[13px] text-slate-600 leading-tight truncate max-w-[250px]">{loc.address}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={loc.status === "Active" ? "success" : "warning"} className="text-[10px] px-2 py-0.5 font-medium text-slate-600 uppercase tracking-tighter">
                      {loc.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1.5 justify-end">
                      <button onClick={() => handleEdit(loc)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => handleDelete(loc.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal - Aligned with Admin dashboard inputs */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingLocation ? "Edit Location" : "Add New Location"}
      >
        <div className="space-y-4 py-2 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">Location Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">Facility Type</label>
              <select
                value={formData.type || "CLINIC"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg bg-white outline-none text-slate-700"
              >
                <option value="CLINIC">CLINIC</option>
                <option value="HOSPITAL">HOSPITAL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">Full Address *</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg outline-none text-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">City</label>
              <input type="text" value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">State</label>
              <input type="text" value={formData.state || ''} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">Timezone</label>
              <select value={formData.timezone || "Asia/Karachi"} onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg bg-white outline-none">
                <option value="Asia/Karachi">Asia/Karachi</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">Phone *</label>
              <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase text-slate-500 mb-1.5 tracking-tight">Working Hours</label>
              <input
                type="text"
                value={formData.workingHours || ''}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg outline-none"
                placeholder="08:00 AM - 08:00 PM"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <Button variant="outline" onClick={() => setShowModal(false)} className="text-[12px] h-9 px-4 font-medium border-slate-200">Cancel</Button>
            <Button onClick={handleSave} className="text-[12px] h-9 px-6 font-medium bg-blue-600 text-white">
              {editingLocation ? "Update Location" : "Save Location"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LocationManagement;