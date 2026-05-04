// src/components/patients/tabs/DevicesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { useDevicesStore } from '../../../stores/useDevicesStore';
import type { Patient } from '../../../types';
import { Plus, Monitor, Activity } from 'lucide-react';
import DeviceAssignModal from '../../devices/DeviceAssignModal';

interface DevicesTabProps {
  patient: Patient;
}

export default function DevicesTab({ patient }: DevicesTabProps) {
  const { devices, assignDevice } = useDevicesStore();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDeviceForAssign, setSelectedDeviceForAssign] = useState<string | null>(null);

  const patientDevices = devices.filter(d => d.patientId === patient.id);
  const availableDevices = devices.filter(d => d.status === 'Available');

  const handleAssign = (deviceId: string) => {
    assignDevice(deviceId, patient.id);
    setIsAssignModalOpen(false);
    setSelectedDeviceForAssign(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-600" />
          Devices — {patient.name}
        </h3>
        <Button onClick={() => setIsAssignModalOpen(true)} disabled={availableDevices.length === 0}>
          <Plus className="w-4 h-4 mr-2" />
          Assign New Device
        </Button>
      </div>

      {patientDevices.length === 0 ? (
        <Card className="p-16 text-center border-dashed border-2 border-gray-300 bg-gray-50">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <Monitor className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-700">No Devices Assigned</h4>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">
            This patient doesn't have any monitoring devices assigned yet.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patientDevices.map((device) => (
            <Card key={device.id} className="hover:shadow-md transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{device.type}</p>
                    <p className="font-mono text-sm text-gray-500">{device.serialNumber}</p>
                  </div>
                </div>
                <Badge variant="success">Connected</Badge>
              </div>

              {device.lastConnected && (
                <div className="mt-6 text-sm text-gray-500">
                  Last connected: <span className="font-medium text-gray-700">
                    {new Date(device.lastConnected).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="mt-6 flex gap-3 border-t pt-5">
                <Button variant="outline" size="sm" className="flex-1">
                  View Readings
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
                  Disconnect
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Assign Device Modal */}
      <DeviceAssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        deviceId={selectedDeviceForAssign || ''}
        onAssign={handleAssign}
        patients={[patient]}   // Only show current patient
      />
    </div>
  );
}