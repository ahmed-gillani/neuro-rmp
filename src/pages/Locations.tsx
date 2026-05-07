// src/pages/Locations.tsx
import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { Plus, Edit2, Trash2, Clock, MapPin, Phone } from 'lucide-react';

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
      fax: "+92 55 1234567",
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
        fax: formData.fax,
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
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm gap-2">
       <div className="min-w-0"> 
    {/* Font-bold replaced with font-medium, and tracking adjusted for readability */}
    <h2 className="text-[12px] font-medium text-[#1e293b] uppercase tracking-wider truncate">
      Registered Locations
    </h2>
    {/* Text-slate-400 replaced with slate-500 for better visibility, and weight set to normal */}
    <p className="text-[10px] font-normal text-slate-500 uppercase tracking-tight mt-0.5">
      {locations.length} branches
    </p>
  </div>
  
  {/* Force button to stay on the same line and not grow */}
  <Button 
    size="sm" 
    onClick={handleAddNew} 
    className="px-3 py-1.5 w-fit whitespace-nowrap text-[10px] font-bold shrink-0 shadow-none border border-slate-200"
  >
    <Plus className="w-3 h-3 mr-1" /> Add New
  </Button>
</div>
      <Card noPadding className="w-full overflow-hidden border-slate-200/60 shadow-sm font-sans">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-3 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Location</th>
                <th className="px-3 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Physical Address</th>
                <th className="px-3 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
                <th className="px-3 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-3 py-2">
                    <p className="text-[11px] font-bold text-[#1e293b] leading-tight">{loc.name}</p>
                    <span className="text-[8px] font-bold text-blue-500 uppercase tracking-tighter">{loc.type}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-slate-300" />
                      <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[200px]">{loc.address}</p>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Badge variant={loc.status === "Active" ? "success" : "warning"} className="text-[8px] px-1.5 py-0 font-bold uppercase">
                      {loc.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(loc)} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={12} /></button>
                      <button onClick={() => handleDelete(loc.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingLocation ? "Edit Location" : "Add New Location"}
      >
        <div className="space-y-4 py-2 text-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Location Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Facility Type</label>
              <select
                value={formData.type || "CLINIC"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
              >
                <option value="CLINIC">CLINIC</option>
                <option value="HOSPITAL">HOSPITAL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Full Address *</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">City</label>
              <input type="text" value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">State</label>
              <input type="text" value={formData.state || ''} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Timezone</label>
              <select value={formData.timezone || "Asia/Karachi"} onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none">
                <option value="Asia/Karachi">Asia/Karachi</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Phone *</label>
              <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-500 mb-1">Working Hours</label>
              <input
                type="text"
                value={formData.workingHours || ''}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                placeholder="08:00 AM - 08:00 PM"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs">Cancel</Button>
            <Button onClick={handleSave} className="text-xs px-6">
              {editingLocation ? "Update Location" : "Save Location"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LocationManagement;