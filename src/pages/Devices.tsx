// // // src/pages/Devices.tsx
// // import { useState } from 'react';
// // import { useDevicesStore } from '../stores/useDevicesStore';
// // import Card from '../components/common/Card';
// // import Button from '../components/common/Button';
// // import Badge from '../components/common/Badge';
// // import { Plus, Monitor, Search } from 'lucide-react';

// // export default function Devices() {
// //   const { devices } = useDevicesStore();
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState<'all' | 'Available' | 'Assigned' | 'In Repair'>('all');

// //   return (
// //     <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
// //         <div>
// //           <h1 className="text-[15px] font-medium text-[#1e293b] uppercase tracking-widest leading-none">Device Inventory</h1>
// //           <p className="text-slate-400 text-[12px] font-medium uppercase tracking-widest leading-none mt-0.5">Asset & Hardware Management</p>
// //         </div>
// //         <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-4 font-medium shadow-sm border-none">
// //           <Plus size={12} className="mr-1.5" /> Register Device
// //         </Button>
// //       </div>

// //       <Card className="p-3 bg-slate-50/50 border-slate-200/60 shadow-none">
// //         <div className="flex flex-col md:flex-row gap-3">
// //           {/* Search Bar */}
// //           <div className="relative flex-1">
// //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
// //             <input
// //               type="text"
// //               placeholder="Search SN or device type..."
// //               className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-400 font-sans"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </div>

// //           {/* Responsive & Scrollable Tabs */}
// //           <div className="flex bg-white p-1 rounded-lg border border-slate-200 w-full md:w-fit overflow-x-auto no-scrollbar scroll-smooth">
// //             <div className="flex flex-nowrap gap-1 min-w-full">
// //               {['all', 'Available', 'Assigned', 'In Repair'].map((status) => (
// //                 <button
// //                   key={status}
// //                   onClick={() => setStatusFilter(status as any)}
// //                   className={`px-3 md:px-4 py-1 text-[10px] md:text-[12px] font-medium rounded-md transition-all uppercase tracking-tighter whitespace-nowrap flex-1 md:flex-none ${
// //                     statusFilter === status 
// //                     ? 'bg-blue-600 text-white shadow-sm' 
// //                     : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
// //                   }`}
// //                 >
// //                   {status}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </Card>

// //       {/* Grid Section */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //         {devices
// //           .filter(d => statusFilter === 'all' || d.status === statusFilter)
// //           .filter(d => d.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) || d.type.toLowerCase().includes(searchTerm.toLowerCase()))
// //           .map((device) => (
// //             <Card key={device.id} className="border-slate-100 shadow-none hover:border-blue-200 transition-all p-3 font-sans">
// //               <div className="flex items-center justify-between mb-3">
// //                 <div className="flex items-center gap-2.5">
// //                   <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
// //                     <Monitor size={16} />
// //                   </div>
// //                   <div className="min-w-0">
// //                     <h4 className="text-[11px] font-medium text-[#1e293b] leading-tight uppercase truncate">{device.type}</h4>
// //                     <p className="text-[9px] font-medium text-slate-700 font-mono tracking-tighter">{device.serialNumber}</p>
// //                   </div>
// //                 </div>
// //                 <Badge status={device.status === 'Available' ? 'Active' : 'OOR'} className="text-[8px]" />
// //               </div>
// //             </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




















// // src/pages/Devices.tsx
// // RPM-009: Device Management | RPM-010: Device Integration
// // Tabs: Inventory | Assignments | Returns | Integration Monitor
// import { useState } from 'react';
// import { useDevicesStore } from '../stores/useDevicesStore';

// import Card from '../components/common/Card';
// import Button from '../components/common/Button';
// import Badge from '../components/common/Badge';

// import {
//   Plus,
//   Monitor,
//   Search,
//   Wifi,
//   WifiOff,
//   RotateCcw,
//   Link2,
//   AlertTriangle,
//   CheckCircle,
//   Clock,
//   ChevronRight,
// } from 'lucide-react';

// // Device-specific components
// import RegisterDeviceModal from '../components/devices/RegisterDeviceModal';
// import DeviceAssignModal from '../components/devices/DeviceAssignModal';
// import InitiateReturnModal from '../components/devices/InitiateReturnModal';
// import DeviceIntegrationPanel from '../components/devices/DeviceIntegrationPanel';
// import DeviceDetailDrawer from '../components/devices/DeviceDetailDrawer';
// import DeviceCard from '../components/devices/DeviceCard';
// import type { Device, DeviceAssignment, DeviceReturnRequest } from '../types';

// type PageTab = 'inventory' | 'assignments' | 'returns' | 'integration';

// const PAGE_TABS: { key: PageTab; label: string }[] = [
//   { key: 'inventory', label: 'Inventory' },
//   { key: 'assignments', label: 'Assignments' },
//   { key: 'returns', label: 'Returns' },
//   { key: 'integration', label: 'Integration Monitor' },
// ];

// export default function Devices() {
//   const {
//     filters,
//     setFilters,
//     getFilteredDevices,
//     getDeviceStats,
//     getReturnRequests,
//     assignments,
//     vendorIntegrations,
//     setSelectedDevice,
//     selectedDeviceId,
//   } = useDevicesStore();

//   const [activeTab, setActiveTab] = useState<PageTab>('inventory');
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//   const [assignTarget, setAssignTarget] = useState<Device | null>(null);
//   const [returnTarget, setReturnTarget] = useState<Device | null>(null);
//   const [drawerDevice, setDrawerDevice] = useState<Device | null>(null);

//   const devices = getFilteredDevices();
//   const stats = getDeviceStats();
//   const returnRequests = getReturnRequests();
//   const pendingReturns = returnRequests.filter((r: DeviceReturnRequest) => r.status === 'Pending').length;
//   const handleTabClick = (key: PageTab) => {
//   setActiveTab(key);   // ← Now properly typed

//   // Auto-scroll clicked tab to center
//   setTimeout(() => {
//     const tabElement = document.querySelector(`[data-tab="${key}"]`) as HTMLButtonElement;
    
//     if (tabElement) {
//       tabElement.scrollIntoView({
//         behavior: 'smooth',
//         inline: 'center',
//         block: 'nearest',
//       });
//     }
//   }, 10);
// };

//   // ── Connection status colour helpers ────────────────────────────────────────


//   // ── Status pill colour ────────────────────────────────────────────────────


//   return (
//     <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">
//       {/* ── Header ──────────────────────────────────────────────────────────── */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
//         <div>
//           <h1 className="text-[15px] font-medium text-[#1e293b] uppercase tracking-widest leading-none">
//             Device Management
//           </h1>
//           <p className="text-slate-600 text-[12px] font-medium uppercase tracking-widest leading-none mt-0.5">
//             RPM-009 / RPM-010 · Inventory & Integration
//           </p>
//         </div>
//         <Button
//           size="sm"
//           onClick={() => setIsRegisterOpen(true)}
//           className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-4 font-medium shadow-sm border-none"
//         >
//           <Plus size={12} className="mr-1.5" /> Register Device
//         </Button>
//       </div>

//       {/* ── Stats Row ────────────────────────────────────────────────────────── */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
//         {[
//           { label: 'Total', value: stats.total, accent: 'text-slate-700' },
//           { label: 'Available', value: stats.available, accent: 'text-emerald-600' },
//           { label: 'Assigned', value: stats.assigned, accent: 'text-blue-600' },
//           { label: 'In Repair', value: stats.inRepair, accent: 'text-amber-600' },
//           { label: 'Retired', value: stats.retired, accent: 'text-slate-400' },
//           { label: 'Online', value: stats.online, accent: 'text-emerald-500' },
//           { label: 'Offline', value: stats.offline, accent: 'text-rose-500' },
//         ].map(({ label, value, accent }) => (
//           <Card key={label} className="py-2.5 px-3 shadow-none border-slate-100 text-center">
//             <p className={`text-[18px] font-bold tabular-nums ${accent}`}>{value}</p>
//             <p className="text-[10px] uppercase tracking-widest text-slate-600 mt-0.5">{label}</p>
//           </Card>
//         ))}
//       </div>
//       {/* ── Page Tabs ────────────────────────────────────────────────────────── */}
//       <div className="relative">
//         <div
//           id="tabs-container"
//           className="flex border-b border-slate-100 text-slate-600 gap-1 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory"
//           style={{ scrollbarWidth: 'none' }} // Firefox
//         >
//           {PAGE_TABS.map(({ key, label }) => (
//             <button
//               key={key}
//               onClick={() => handleTabClick(key)}
//               className={`flex-shrink-0 px-5 py-3 text-sm font-semibold uppercase  transition-all border-b-2 -mb-px snap-start
//           ${activeTab === key
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-slate-400 hover:text-slate-700'
//                 }
//         `}
//             >
//               {label}
//               {key === 'returns' && pendingReturns > 0 && (
//                 <span className="ml-1.5 text-[10px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">
//                   {pendingReturns}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Gradient fade on right side when scrollable */}
//         <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-r from-transparent to-white pointer-events-none" />
//       </div>
//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {/* TAB: INVENTORY                                                        */}
//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {activeTab === 'inventory' && (
//         <div className="space-y-4">
//           {/* Filters */}
//           <Card className="p-3 bg-slate-50/50 border-slate-200/60 shadow-none">
//             <div className="flex flex-col md:flex-row gap-3">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search serial, type, vendor, IMEI..."
//                   className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-400"
//                   value={filters.searchQuery}
//                   onChange={(e) => setFilters({ searchQuery: e.target.value })}
//                 />
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {/* Status filter */}
//                 <select
//                   className="text-[11px] border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 font-medium outline-none focus:border-blue-400"
//                   value={filters.status}
//                   onChange={(e) => setFilters({ status: e.target.value as typeof filters.status })}
//                 >
//                   {['all', 'Available', 'Assigned', 'In Repair', 'Retired', 'Lost'].map((s) => (
//                     <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s}</option>
//                   ))}
//                 </select>
//                 {/* Vendor filter */}
//                 <select
//                   className="text-[11px] border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 font-medium outline-none focus:border-blue-400"
//                   value={filters.vendor}
//                   onChange={(e) => setFilters({ vendor: e.target.value as typeof filters.vendor })}
//                 >
//                   {['all', 'Tenovi', 'Withings', 'iHealth', 'Omron', 'Other'].map((v) => (
//                     <option key={v} value={v}>{v === 'all' ? 'All Vendors' : v}</option>
//                   ))}
//                 </select>
//                 {/* Connection filter */}
//                 <select
//                   className="text-[11px] border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 font-medium outline-none focus:border-blue-400"
//                   value={filters.connectionStatus}
//                   onChange={(e) => setFilters({ connectionStatus: e.target.value as typeof filters.connectionStatus })}
//                 >
//                   {['all', 'Online', 'Offline', 'Degraded', 'Never Connected'].map((c) => (
//                     <option key={c} value={c}>{c === 'all' ? 'All Connections' : c}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </Card>

//           {/* Device Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//             {devices.map((device: Device) => (
//               <DeviceCard
//                 key={device.id}
//                 device={device}
//                 onClick={setDrawerDevice}
//                 onAssign={setAssignTarget}
//                 onReturn={setReturnTarget}
//               />
//             ))}

//             {devices.length === 0 && (
//               <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
//                 <Monitor size={32} className="mb-3 opacity-30" />
//                 <p className="text-sm font-medium">No devices match your filters</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {/* TAB: ASSIGNMENTS                                                      */}
//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {activeTab === 'assignments' && (
//         <Card className="shadow-none border-slate-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-xs">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50/60">
//                   {['Device', 'Serial', 'Patient ID', 'Assigned By', 'Assigned At', 'Status', ''].map((h) => (
//                     <th key={h} className="py-2.5 px-3 text-[10px] uppercase tracking-widest text-slate-600 font-semibold whitespace-nowrap">
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50">
//                 {assignments.map((a: DeviceAssignment) => {
//                   const device = useDevicesStore.getState().devices.find((d: Device) => d.id === a.deviceId);
//                   const isActive = !a.unassignedAt;
//                   return (
//                     <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
//                       <td className="py-2.5 px-3 font-medium text-slate-700">{device?.type ?? '—'}</td>
//                       <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{device?.serialNumber ?? a.deviceId}</td>
//                       <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{a.patientId}</td>
//                       <td className="py-2.5 px-3 text-slate-600">{a.assignedBy}</td>
//                       <td className="py-2.5 px-3 text-slate-800 whitespace-nowrap">
//                         {new Date(a.assignedAt).toLocaleDateString()}
//                       </td>
//                       <td className="py-2.5 px-3">
//                         <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${isActive
//                             ? 'bg-blue-50 text-blue-700 border-blue-200'
//                             : 'bg-slate-50 text-slate-500 border-slate-200'
//                           }`}>
//                           {isActive ? 'Active' : 'Returned'}
//                         </span>
//                       </td>
//                       <td className="py-2.5 px-3">
//                         {a.unassignedAt && (
//                           <span className="text-[11px] text-slate-700">
//                             Returned {new Date(a.unassignedAt).toLocaleDateString()}
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {/* TAB: RETURNS                                                          */}
//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {activeTab === 'returns' && (
//         <div className="space-y-3">
//           {returnRequests.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-slate-400">
//               <CheckCircle size={32} className="mb-3 opacity-30" />
//               <p className="text-sm font-medium">No return requests</p>
//             </div>
//           ) : (
//             returnRequests.map((req: DeviceReturnRequest) => {
//               const device = useDevicesStore.getState().devices.find((d: Device) => d.id === req.deviceId);
//               const returnStatusColor: Record<string, string> = {
//                 Pending: 'bg-amber-50 text-amber-700 border-amber-200',
//                 Shipped: 'bg-blue-50 text-blue-700 border-blue-200',
//                 Received: 'bg-emerald-50 text-emerald-700 border-emerald-200',
//                 Cancelled: 'bg-slate-50 text-slate-500 border-slate-200',
//               };
//               return (
//                 <Card key={req.id} className="shadow-none border-slate-100 p-4">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-9 h-9 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
//                         <RotateCcw size={16} />
//                       </div>
//                       <div>
//                         <p className="text-[12px] font-semibold text-slate-800">{device?.type ?? req.deviceId}</p>
//                         <p className="text-[10px] text-slate-400 font-mono">{device?.serialNumber}</p>
//                       </div>
//                     </div>
//                     <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
//                       <span><span className="text-slate-400">Patient:</span> {req.patientId}</span>
//                       <span><span className="text-slate-400">Reason:</span> {req.reason}</span>
//                       <span className="flex items-center gap-1 text-slate-500">
//                         <Clock size={11} /> {new Date(req.initiatedAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border whitespace-nowrap ${returnStatusColor[req.status]}`}>
//                       {req.status}
//                     </span>
//                   </div>
//                   {req.notes && (
//                     <p className="mt-2 text-[11px] text-slate-400 pl-12">{req.notes}</p>
//                   )}
//                 </Card>
//               );
//             })
//           )}
//         </div>
//       )}

//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {/* TAB: INTEGRATION MONITOR (RPM-010)                                   */}
//       {/* ══════════════════════════════════════════════════════════════════════ */}
//       {activeTab === 'integration' && (
//         <DeviceIntegrationPanel integrations={vendorIntegrations} />
//       )}

//       {/* ── Modals ──────────────────────────────────────────────────────────── */}
//       {isRegisterOpen && (
//         <RegisterDeviceModal
//           isOpen={isRegisterOpen}
//           onClose={() => setIsRegisterOpen(false)}
//         />
//       )}
//       {assignTarget && (
//         <DeviceAssignModal
//           isOpen={!!assignTarget}
//           onClose={() => setAssignTarget(null)}
//           device={assignTarget}
//         />
//       )}
//       {returnTarget && (
//         <InitiateReturnModal
//           isOpen={!!returnTarget}
//           onClose={() => setReturnTarget(null)}
//           device={returnTarget}
//         />
//       )}
//       {drawerDevice && (
//         <DeviceDetailDrawer
//           device={drawerDevice}
//           onClose={() => setDrawerDevice(null)}
//         />
//       )}
//     </div>
//   );
// }






















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
            <h1 className="text-[15px] font-medium text-[#1e293b] uppercase tracking-widest leading-none">
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

      {/* Tabs */}
      <div className="relative">
        <div
          id="tabs-container"
          className="flex border-b border-slate-100 text-slate-600 gap-1 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {PAGE_TABS.map(({ key, label }) => (
            <button
              key={key}
              data-tab={key}
              onClick={() => handleTabClick(key)}
              className={`flex-shrink-0 px-5 py-3 text-sm font-semibold uppercase tracking-widest transition-all border-b-2 -mb-px snap-start
                ${activeTab === key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
            >
              {label}
              {key === 'returns' && pendingReturns > 0 && (
                <span className="ml-1.5 text-[10px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">
                  {pendingReturns}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-r from-transparent to-white pointer-events-none" />
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