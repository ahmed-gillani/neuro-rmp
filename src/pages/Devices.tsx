// src/pages/Devices.tsx
import { useState } from 'react';
import { useDevicesStore } from '../stores/useDevicesStore';

import Card from '../components/common/Card';
import Button from '../components/common/Button';
import {
  Plus,
  Monitor,
  Search,
  RotateCcw,
  Clock,
  CheckCircle,
} from 'lucide-react';

import RegisterDeviceModal from '../components/devices/RegisterDeviceModal';
import DeviceAssignModal from '../components/devices/DeviceAssignModal';
import InitiateReturnModal from '../components/devices/InitiateReturnModal';
import DeviceIntegrationPanel from '../components/devices/DeviceIntegrationPanel';
import DeviceDetailContent from '../components/devices/DeviceDetailContent';
import DeviceCard from '../components/devices/DeviceCard';

import type { Device, DeviceAssignment, DeviceReturnRequest } from '../types';
import Modal from '../components/common/Modal';

type PageTab = 'inventory' | 'assignments' | 'returns' | 'integration';

interface DevicesPageProps {
  patientId?: string;
  embedded?: boolean;
}

const PAGE_TABS: { key: PageTab; label: string }[] = [
  { key: 'inventory', label: 'Inventory' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'returns', label: 'Returns' },
  { key: 'integration', label: 'Integration Monitor' },
];

export default function Devices({ patientId, embedded = false }: DevicesPageProps = {}) {
  const {
    filters,
    setFilters,
    getFilteredDevices,
    getDeviceStats,
    getReturnRequests,
    assignments,
    vendorIntegrations,
  } = useDevicesStore();

  const [activeTab, setActiveTab] = useState<PageTab>('inventory');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [assignTarget, setAssignTarget] = useState<Device | null>(null);
  const [returnTarget, setReturnTarget] = useState<Device | null>(null);
  const [drawerDevice, setDrawerDevice] = useState<Device | null>(null);

  const allDevices = getFilteredDevices();
  const devices = patientId
    ? allDevices.filter((d: Device) => d.patientId === patientId)
    : allDevices;

  const stats = getDeviceStats();
  const returnRequests = getReturnRequests();
  const pendingReturns = returnRequests.filter((r: DeviceReturnRequest) => r.status === 'Pending').length;

  const handleTabClick = (key: PageTab) => {
    setActiveTab(key);
    setTimeout(() => {
      const tabElement = document.querySelector(`[data-tab="${key}"]`) as HTMLButtonElement;
      if (tabElement) {
        tabElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }, 10);
  };

  return (
    <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">
      {/* Header - Hidden in embedded mode (Patient Devices Tab) */}
      {!embedded && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
          <div>
            <h1 className="text-[20px] font-medium text-[#1e293b] uppercase tracking-widest leading-none">
              Device Management
            </h1>
            <p className="text-slate-600 text-[12px] font-medium uppercase tracking-widest leading-none mt-0.5">
              RPM-009 / RPM-010 · Inventory & Integration
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsRegisterOpen(true)}
            className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-4 font-medium shadow-sm border-none"
          >
            <Plus size={12} className="mr-1.5" /> Register Device
          </Button>
        </div>
      )}

      {/* Stats - Hidden in embedded mode */}
      {!embedded && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { label: 'Total', value: stats.total, accent: 'text-slate-700' },
            { label: 'Available', value: stats.available, accent: 'text-emerald-600' },
            { label: 'Assigned', value: stats.assigned, accent: 'text-blue-600' },
            { label: 'In Repair', value: stats.inRepair, accent: 'text-amber-600' },
            { label: 'Retired', value: stats.retired, accent: 'text-slate-400' },
            { label: 'Online', value: stats.online, accent: 'text-emerald-500' },
            { label: 'Offline', value: stats.offline, accent: 'text-rose-500' },
          ].map(({ label, value, accent }) => (
            <Card key={label} className="py-2.5 px-3 shadow-none border-slate-100 text-center">
              <p className={`text-[18px] font-bold tabular-nums ${accent}`}>{value}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-600 mt-0.5">{label}</p>
            </Card>
          ))}
        </div>
      )}

      {/* ── Page Tabs ────────────────────────────────────────────────────────── */}
      <div className="relative">
        <div
          id="tabs-container"
          className="flex border-b border-slate-100 text-slate-900 gap-1 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory"
        >
          {PAGE_TABS.map(({ key, label }) => (
            <button
              key={key}
              data-tab={key}
              onClick={() => handleTabClick(key)}
              className={`flex-shrink-0 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-widest transition-all border-b-2 -mb-px snap-start
          ${activeTab === key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-800 hover:text-slate-700'
                }`}
            >
              {label}
              {key === 'returns' && pendingReturns > 0 && (
                <span className="ml-1.5 text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">
                  {pendingReturns}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white pointer-events-none" />
      </div>

      {/* ====================== INVENTORY TAB ====================== */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {!embedded && (
            <Card className="p-3 bg-slate-50/50 border-slate-200/60 shadow-none">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search serial, type, vendor, IMEI..."
                    className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-400"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ searchQuery: e.target.value })}
                  />
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {devices.map((device: Device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onClick={setDrawerDevice}
                onAssign={setAssignTarget}
                onReturn={setReturnTarget}
              />
            ))}
            {devices.length === 0 && (
              <Card className="col-span-full py-16 text-center text-slate-400">
                <Monitor size={32} className="mx-auto mb-3 opacity-30" />
                <p>No devices found</p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* ====================== ASSIGNMENTS TAB ====================== */}
      {activeTab === 'assignments' && (
        <Card className="shadow-none border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {['Device', 'Serial', 'Patient ID', 'Assigned By', 'Assigned At', 'Status', ''].map((h) => (
                    <th key={h} className="py-2.5 px-3 text-[10px] uppercase tracking-widest text-slate-600 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {assignments.map((a: DeviceAssignment) => {
                  const device = useDevicesStore.getState().devices.find((d: Device) => d.id === a.deviceId);
                  const isActive = !a.unassignedAt;
                  return (
                    <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-700">{device?.type ?? '—'}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{device?.serialNumber ?? a.deviceId}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{a.patientId}</td>
                      <td className="py-2.5 px-3 text-slate-600">{a.assignedBy}</td>
                      <td className="py-2.5 px-3 text-slate-800 whitespace-nowrap">
                        {new Date(a.assignedAt).toLocaleDateString()}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${isActive
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                          }`}>
                          {isActive ? 'Active' : 'Returned'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {a.unassignedAt && (
                          <span className="text-[11px] text-slate-700">
                            Returned {new Date(a.unassignedAt).toLocaleDateString()}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ====================== RETURNS TAB ====================== */}
      {activeTab === 'returns' && (
        <div className="space-y-3">
          {returnRequests.length === 0 ? (
            <Card className="py-16 text-center text-slate-400">
              <CheckCircle size={32} className="mx-auto mb-3 opacity-30" />
              <p>No return requests</p>
            </Card>
          ) : (
            returnRequests.map((req: DeviceReturnRequest) => {
              const device = useDevicesStore.getState().devices.find((d: Device) => d.id === req.deviceId);
              const returnStatusColor: Record<string, string> = {
                Pending: 'bg-amber-50 text-amber-700 border-amber-200',
                Shipped: 'bg-blue-50 text-blue-700 border-blue-200',
                Received: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                Cancelled: 'bg-slate-50 text-slate-500 border-slate-200',
              };
              return (
                <Card key={req.id} className="shadow-none border-slate-100 p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                        <RotateCcw size={16} />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-slate-800">{device?.type ?? req.deviceId}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{device?.serialNumber}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
                      <span><span className="text-slate-400">Patient:</span> {req.patientId}</span>
                      <span><span className="text-slate-400">Reason:</span> {req.reason}</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock size={11} /> {new Date(req.initiatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border whitespace-nowrap ${returnStatusColor[req.status]}`}>
                      {req.status}
                    </span>
                  </div>
                  {req.notes && (
                    <p className="mt-2 text-[11px] text-slate-400 pl-12">{req.notes}</p>
                  )}
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* ====================== INTEGRATION TAB ====================== */}
      {activeTab === 'integration' && (
        <DeviceIntegrationPanel integrations={vendorIntegrations} />
      )}

      {/* ====================== MODALS ====================== */}
      {isRegisterOpen && (
        <RegisterDeviceModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      )}
      {assignTarget && (
        <DeviceAssignModal
          isOpen={!!assignTarget}
          onClose={() => setAssignTarget(null)}
          device={assignTarget}
        />
      )}
      {returnTarget && (
        <InitiateReturnModal
          isOpen={!!returnTarget}
          onClose={() => setReturnTarget(null)}
          device={returnTarget}
        />
      )}

      {/* Device Detail Modal (Common Modal) */}
      <Modal
        isOpen={!!drawerDevice}
        onClose={() => setDrawerDevice(null)}
        title={drawerDevice?.type || "Device Details"}
      >
        {drawerDevice && (
          <DeviceDetailContent
            device={drawerDevice}
            onClose={() => setDrawerDevice(null)}
            onReturn={() => {
              setReturnTarget(drawerDevice);
              setDrawerDevice(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}