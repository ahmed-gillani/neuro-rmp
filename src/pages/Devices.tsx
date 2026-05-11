// src/pages/Devices.tsx
import { useState } from 'react';
import { useDevicesStore } from '../stores/useDevicesStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Plus, Monitor, Trash2, Edit, Search } from 'lucide-react';

export default function Devices() {
  const { devices, updateDeviceStatus } = useDevicesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Available' | 'Assigned' | 'In Repair'>('all');

  return (
    <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
        <div>
          <h1 className="text-lg font-medium text-[#1e293b] tracking-tight">Device Inventory</h1>
          <p className="text-slate-400 text-[12px] font-medium uppercase tracking-widest leading-none mt-0.5">Asset & Hardware Management</p>
        </div>
        {/* Fixed: Back to Blue */}
        <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-4 font-medium shadow-sm border-none">
          <Plus size={12} className="mr-1.5" /> Register Device
        </Button>
      </div>

      <Card className="p-3 bg-slate-50/50 border-slate-200/60 shadow-none">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search SN or device type..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-400 font-sans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-white p-1 rounded-lg border border-slate-200 w-fit">
            {['all', 'Available', 'Assigned', 'In Repair'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-3 py-1 text-[12px] font-medium rounded-md transition-all uppercase tracking-tighter ${statusFilter === status ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {devices.filter(d => statusFilter === 'all' || d.status === statusFilter).map((device) => (
          <Card key={device.id} className="border-slate-100 shadow-none hover:border-blue-200 transition-all p-3 font-sans">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <Monitor size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-medium text-[#1e293b] leading-tight uppercase truncate">{device.type}</h4>
                  <p className="text-[9px] font-medium text-slate-700 font-mono tracking-tighter">{device.serialNumber}</p>
                </div>
              </div>
              <Badge status={device.status === 'Available' ? 'Active' : 'OOR'} className="text-[8px]" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}