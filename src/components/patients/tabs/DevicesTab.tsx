// src/components/patients/tabs/DevicesTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { useDevicesStore } from '../../../stores/useDevicesStore';
import type { Patient } from '../../../types';
import { Plus, Monitor, Unlink, X } from 'lucide-react';

export default function DevicesTab({ patient }: { patient: Patient }) {
  const { devices, assignDevice, updateDeviceStatus } = useDevicesStore();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const patientDevices = devices.filter(d => d.patientId === patient.id);
  const availableDevices = devices.filter(d => !d.patientId || d.status === 'Available');

  return (
    <div className="space-y-4 font-sans animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Hardware Inventory</h3>
        <Button 
          onClick={() => setIsAssignModalOpen(true)} 
          size="sm" 
          disabled={availableDevices.length === 0}
          className="text-[10px] h-7 bg-blue-600 text-white border-none shadow-sm px-3 font-medium"
        >
          <Plus size={12} className="mr-1.5" /> Assign New Device
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {patientDevices.map((device) => (
          <Card key={device.id} className="py-3 px-4 border-slate-100 shadow-none hover:border-blue-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-50 text-blue-500 shadow-inner"><Monitor size={18} /></div>
              <div className="flex-1 min-w-0 font-sans">
                <p className="text-[11px] font-medium text-slate-900 leading-tight">{device.type}</p>
                <p className="text-[9px] font-medium text-slate-400 mt-1 tracking-tighter uppercase">{device.serialNumber}</p>
              </div>
              <button 
                onClick={() => updateDeviceStatus(device.id, 'Available')}
                className="text-slate-300 hover:text-rose-500 p-1.5 transition-colors"
              >
                <Unlink size={13} />
              </button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
              <Badge status={device.status} className="text-[8px]" />
              {device.lastConnected && (
                <span className="text-[9px] font-medium text-slate-400 font-sans">
                  Last: {new Date(device.lastConnected).toLocaleDateString()}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h4 className="text-sm font-medium text-slate-900 uppercase tracking-tight">Available Inventory</h4>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={16} /></button>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar py-2">
              {availableDevices.map(device => (
                <div 
                  key={device.id}
                  onClick={() => { assignDevice(device.id, patient.id); setIsAssignModalOpen(false); }}
                  className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-all"
                >
                  <div className="font-sans">
                    <p className="text-[11px] font-medium text-slate-800">{device.type}</p>
                    <p className="text-[9px] text-slate-400 font-mono">{device.serialNumber}</p>
                  </div>
                  <span className="text-[10px] text-blue-600 font-medium uppercase">Assign →</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}