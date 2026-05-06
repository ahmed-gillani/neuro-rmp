// src/pages/Devices.tsx
import { useState } from 'react';
import { useDevicesStore } from '../stores/useDevicesStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Plus, Monitor, Trash2, Edit, Search } from 'lucide-react';
import type { Device } from '../types';

export default function Devices() {
  const { devices, updateDeviceStatus, addDevice } = useDevicesStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Available' | 'Assigned' | 'In Repair'>('all');

  const filteredDevices = devices
    .filter(device => {
      const matchesSearch = device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || device.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a) => (a.status === 'Available' ? -1 : 1));

  const availableCount = devices.filter(d => d.status === 'Available').length;

  const handleStatusChange = (id: string, newStatus: Device['status']) => {
    updateDeviceStatus(id, newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="hero-title font-bold text-gray-900">Device Inventory</h1>
          <p className="text-gray-500">Manage all monitoring devices • {availableCount} Available</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Device
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by device type or serial number..."
              className="w-full pl-12 py-3 border border-gray-300 rounded-2xl focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {['all', 'Available', 'Assigned', 'In Repair'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap ${statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                {status === 'all' ? 'All Devices' : status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <Card key={device.id} className="hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{device.type}</h4>
                  <p className="font-mono text-sm text-gray-500">{device.serialNumber}</p>
                </div>
              </div>

              <Badge
                variant={
                  device.status === 'Available' ? 'success' :
                    device.status === 'Assigned' ? 'info' : 'warning'
                }
              >
                {device.status}
              </Badge>
            </div>

            {device.patientId && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Assigned To</p>
                <p className="font-medium text-gray-900">Patient ID: {device.patientId}</p>
              </div>
            )}

            {device.lastConnected && (
              <div className="mt-4 text-xs text-gray-500">
                Last connected: {new Date(device.lastConnected).toLocaleDateString()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              {device.status === 'Available' && (
                <Button
                  variant="outline"
                  className="flex-1 text-blue-600"
                  onClick={() => {
                    // You can open assign modal here later
                    alert(`Assign ${device.serialNumber} to a patient`);
                  }}
                >
                  Assign to Patient
                </Button>
              )}

              {device.status === 'Assigned' && (
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:bg-red-50"
                  onClick={() => handleStatusChange(device.id, 'Available')}
                >
                  Unassign
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="px-4"
                onClick={() => handleStatusChange(device.id,
                  device.status === 'In Repair' ? 'Available' : 'In Repair'
                )}
              >
                <Edit className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="px-4 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card className="p-20 text-center">
          <Monitor className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No devices found</p>
        </Card>
      )}
    </div>
  );
}