// src/components/patients/tabs/DevicesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { useDevicesStore } from '../../../stores/useDevicesStore';
import type { Patient } from '../../../types';
import { Plus, Monitor, Unlink } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">Assigned Devices</h3>
          <p className="text-slate-600 mt-1">Remote Patient Monitoring Hardware</p>
        </div>
        
        <Button 
          onClick={() => setIsAssignModalOpen(true)} 
          className="btn-primary flex items-center gap-2"
          disabled={availableDevices.length === 0}
        >
          <Plus className="w-5 h-5" />
          Assign New Device
        </Button>
      </div>

      {/* Devices List */}
      <Card>
        {patientDevices.length > 0 ? (
          <div className="space-y-4">
            {patientDevices.map((device) => (
              <div 
                key={device.id} 
                className="device-card flex flex-col md:flex-row md:items-center justify-between p-6 border border-slate-100 rounded-2xl hover:border-teal-200 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-900">{device.type}</p>
                    <p className="font-mono text-sm text-slate-500">{device.serialNumber}</p>
                    {device.lastConnected && (
                      <p className="text-xs text-slate-400 mt-1">
                        Last connected: {new Date(device.lastConnected).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6 md:mt-0">
                  <Badge status={device.status} />
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateDeviceStatus(device.id, 'Available')}
                    className="text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Unlink className="w-4 h-4" />
                    Unlink
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Monitor className="w-16 h-16 mx-auto text-slate-300 mb-6" />
            <h4 className="text-xl font-semibold text-slate-700">No Devices Assigned</h4>
            <p className="text-slate-500 mt-2">Assign a device to start remote monitoring for this patient</p>
            <Button 
              onClick={() => setIsAssignModalOpen(true)} 
              className="mt-6 btn-primary"
            >
              Assign First Device
            </Button>
          </div>
        )}
      </Card>

      {/* Assign Device Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900">Assign Device</h3>
              <p className="text-slate-600 mt-1">Select available device for {patient.name}</p>

              <div className="mt-8 space-y-3 max-h-[420px] overflow-y-auto pr-2">
                {availableDevices.length > 0 ? (
                  availableDevices.map((device) => (
                    <div 
                      key={device.id}
                      onClick={() => handleAssignDevice(device.id)}
                      className="border border-slate-200 hover:border-teal-400 hover:bg-teal-50 p-5 rounded-2xl cursor-pointer transition-all flex justify-between items-center group"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{device.type}</p>
                        <p className="font-mono text-sm text-slate-500">{device.serialNumber}</p>
                      </div>
                      <div className="text-teal-600 font-medium group-hover:translate-x-1 transition-transform">
                        Assign →
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-12 text-slate-500">No available devices at the moment.</p>
                )}
              </div>
            </div>

            <div className="border-t p-4">
              <Button 
                variant="outline" 
                className="w-full py-6 text-base"
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