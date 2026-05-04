// src/components/patients/tabs/DevicesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { useDevicesStore } from '../../../stores/useDevicesStore';
import type { Patient } from '../../../types';
import { Plus, Monitor } from 'lucide-react';

interface DevicesTabProps {
  patient: Patient;
}

export default function DevicesTab({ patient }: DevicesTabProps) {
  const { devices, assignDevice, updateDeviceStatus } = useDevicesStore();
  
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const patientDevices = devices.filter(d => d.patientId === patient.id);
  const availableDevices = devices.filter(d => !d.patientId || d.status === 'Available');

  const handleAssignDevice = (deviceId: string) => {
    assignDevice(deviceId, patient.id);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Devices</h3>
          <p className="text-gray-600">Assign RPM devices to patients. Track serial numbers, assignments, and audit history.</p>
        </div>
        
        <Button onClick={() => setIsAssignModalOpen(true)} disabled={availableDevices.length === 0}>
          <Plus className="w-4 h-4 mr-2" />
          Assign Devices
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">IMEI / SERIAL</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">DEVICE TYPE</th>
                <th className="text-center py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">CURRENT STATUS</th>
                <th className="text-center py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patientDevices.length > 0 ? (
                patientDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-mono text-gray-900 font-medium">
                      {device.serialNumber}
                    </td>
                    <td className="py-5 px-6 text-gray-700">{device.type}</td>
                    <td className="text-center">
                      <Badge 
                        variant={device.status === 'Assigned' ? "success" : "warning"}
                        className="capitalize"
                      >
                        {device.status}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateDeviceStatus(device.id, 'Available')}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        Unlink
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
                      <Monitor className="w-10 h-10 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700">No Devices Assigned</h4>
                    <p className="text-gray-500 mt-2">Assign a device to start remote monitoring</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Assign Device Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-black">Assign Device</h3>
              <p className="text-black mb-6">Select an available device for {patient.name}</p>

              {availableDevices.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {availableDevices.map((device) => (
                    <div 
                      key={device.id}
                      onClick={() => handleAssignDevice(device.id)}
                      className="border border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-2xl p-5 cursor-pointer transition-all flex justify-between items-center group"
                    >
                      <div>
                        <p className="font-medium text-black">{device.type}</p>
                        <p className="font-mono text-sm text-black">{device.serialNumber}</p>
                      </div>
                      <div className="text-blue-600 group-hover:scale-110 transition-transform">
                        Assign →
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-12 text-gray-500">No available devices found.</p>
              )}
            </div>

            <div className="border-t p-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}