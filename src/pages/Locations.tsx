// src/pages/Locations.tsx
import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { Plus, Edit2, Trash2, Clock, Users } from 'lucide-react';

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
    if (confirm("Delete this location?")) {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">Locations</h1>
          <p className="text-black mt-1">{locations.length} locations registered</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Location
        </Button>
      </div>

      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase tracking-widest text-black">
                <th className="pb-4 text-left">LOCATION NAME</th>
                <th className="pb-4 text-left">TYPE</th>
                <th className="pb-4 text-left">ADDRESS</th>
                <th className="pb-4 text-left">CONTACT</th>
                <th className="pb-4 text-left">WORKING HOURS</th>
                <th className="pb-4 text-left">TIMEZONE</th>
                <th className="pb-4 text-center">STAFF</th>
                <th className="pb-4 text-center">STATUS</th>
                <th className="pb-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-black">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-gray-50 group">
                  <td className="py-5 font-semibold">{loc.name}</td>
                  <td className="py-5"><span className="px-3 py-1 bg-gray-100 rounded-full text-xs">{loc.type}</span></td>
                  <td className="py-5">{loc.address}</td>
                  <td className="py-5 text-sm">{loc.phone}</td>
                  <td className="py-5 text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> {loc.workingHours}</td>
                  <td className="py-5 font-mono text-sm">{loc.timezone}</td>
                  <td className="py-5 text-center font-medium">{loc.assignedStaff}</td>
                  <td className="py-5 text-center">
                    <Badge variant={loc.status === "Active" ? "success" : "warning"}>
                      {loc.status}
                    </Badge>
                  </td>
                  <td className="py-5 text-center">
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => handleEdit(loc)} className="text-blue-600 hover:text-blue-700">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(loc.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Using your built-in Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingLocation ? "Edit Location" : "Add New Location"}
      >
        <div className="space-y-6 py-2 text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Location Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Type</label>
              <select
                value={formData.type || "CLINIC"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
              >
                <option value="CLINIC">CLINIC</option>
                <option value="HOSPITAL">HOSPITAL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Full Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">City</label>
              <input type="text" value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-2xl" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">State</label>
              <input type="text" value={formData.state || ''} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-2xl" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Timezone</label>
              <select value={formData.timezone || "Asia/Karachi"} onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-2xl">
                <option value="Asia/Karachi">Asia/Karachi</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Phone <span className="text-red-500">*</span></label>
              <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-2xl" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Fax (Optional)</label>
              <input type="text" value={formData.fax || ''} onChange={(e) => setFormData({ ...formData, fax: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-2xl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Working Hours</label>
            <input
              type="text"
              value={formData.workingHours || ''}
              onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
              placeholder="08:00 AM - 08:00 PM"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleSave}>
              {editingLocation ? "Update Location" : "Add Location"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LocationManagement;