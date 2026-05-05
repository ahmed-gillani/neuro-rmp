// src/pages/Admin.tsx
import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Edit3, Users, UserCheck } from 'lucide-react';
import LocationManagement from './Locations';
import Staff from './Staff';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'organization' | 'locations' | 'staff' | 'providers' | 'statuses'>('organization');
  const [showEditModal, setShowEditModal] = useState(false);

  // Original RPM Data
  const [orgData, setOrgData] = useState({
    name: "HealthCare RPM Network",
    regNumber: "HCN-2024-001",
    npiNumber: "1234567890",
    founded: "2018",
    type: "Healthcare Provider Organization",
    accreditation: "Joint Commission Accredited",
    website: "https://healthcarerpm.com",
    contact: "+1 (555) 100-2000",
    email: "admin@healthcarerpm.com",
    address: "123 Medical Plaza, Suite 400\nSan Francisco, CA"
  });

  const [editForm, setEditForm] = useState({ ...orgData });

  const openEditModal = () => {
    setEditForm({ ...orgData });
    setShowEditModal(true);
  };

  const handleSaveOrg = () => {
    setOrgData(editForm);
    setShowEditModal(false);
    // You can add toast notification here later
    alert("Organization details updated successfully!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
        <p className="text-black mt-1">Organization management</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-6 text-center">
          <div className="flex justify-center mb-3"><Users className="w-8 h-8 text-gray-400" /></div>
          <p className="text-4xl font-bold text-black">100</p>
          <p className="text-sm text-gray-500 mt-1">Total Users</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex justify-center mb-3"><Users className="w-8 h-8 text-emerald-500" /></div>
          <p className="text-4xl font-bold text-black">100</p>
          <p className="text-sm text-gray-500 mt-1">Active Users</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex justify-center mb-3"><UserCheck className="w-8 h-8 text-blue-500" /></div>
          <p className="text-4xl font-bold text-black">14</p>
          <p className="text-sm text-gray-500 mt-1">Providers</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex justify-center mb-3"><Users className="w-8 h-8 text-purple-500" /></div>
          <p className="text-4xl font-bold text-black">9</p>
          <p className="text-sm text-gray-500 mt-1">Phlebotomists</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="flex justify-center mb-3"><Users className="w-8 h-8 text-rose-500" /></div>
          <p className="text-4xl font-bold text-black">68</p>
          <p className="text-sm text-gray-500 mt-1">Patients</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto pb-1 bg-white rounded-3xl p-1 shadow-sm">
        {[
          { id: 'organization', label: 'Organization' },
          { id: 'locations', label: 'Locations' },
          { id: 'staff', label: 'Staff' },
          { id: 'providers', label: 'Providers' },
          { id: 'statuses', label: 'Statuses' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 text-sm font-semibold rounded-2xl mx-1 transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Organization Section */}
      {activeTab === 'organization' && (
        <Card className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">{orgData.name}</h2>
              <p className="text-gray-500">Organization Settings</p>
            </div>
            <Button onClick={openEditModal}>
              <Edit3 className="w-4 h-4 mr-2" /> Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Facility Name</p>
                <p className="font-semibold text-black mt-1">{orgData.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Registration Number</p>
                <p className="font-semibold text-black mt-1">{orgData.regNumber}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">NPI Number</p>
                <p className="font-semibold text-black mt-1">{orgData.npiNumber}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Contact</p>
                <p className="font-semibold text-black mt-1">{orgData.contact}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Email</p>
                <p className="font-semibold text-black mt-1">{orgData.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">Address</p>
                <p className="font-semibold text-black mt-1 whitespace-pre-line">{orgData.address}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Other Tabs */}
      {activeTab === 'locations' && <LocationManagement />}
      {activeTab === 'staff' && <Staff />}
      {activeTab === 'providers' && <div className="p-12 text-center text-gray-500">Providers Management - Coming Soon</div>}
      {activeTab === 'statuses' && <div className="p-12 text-center text-gray-500">Statuses Management - Coming Soon</div>}

      {/* Edit Organization Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Organization Details"
      >
        <div className="space-y-5 text-black">
          <div>
            <label className="block text-sm font-bold mb-2">Organization Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Registration Number</label>
              <input 
                type="text" 
                value={editForm.regNumber} 
                onChange={(e) => setEditForm({ ...editForm, regNumber: e.target.value })} 
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">NPI Number</label>
              <input 
                type="text" 
                value={editForm.npiNumber} 
                onChange={(e) => setEditForm({ ...editForm, npiNumber: e.target.value })} 
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Full Address</label>
            <textarea
              value={editForm.address}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button onClick={handleSaveOrg}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;