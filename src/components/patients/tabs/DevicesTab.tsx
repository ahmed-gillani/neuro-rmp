// // src/components/patients/tabs/DevicesTab.tsx
// import { useState } from 'react';
// import Card from '../../common/Card';
// import Button from '../../common/Button';
// import Badge from '../../common/Badge';
// import { useDevicesStore } from '../../../stores/useDevicesStore';
// import type { Patient, Device } from '../../../types';
// import { Plus, X, Search, Monitor } from 'lucide-react';
// import DeviceCard from '../../devices/DeviceCard';
// import DeviceDetailDrawer from '../../devices/DeviceDetailDrawer';
// import InitiateReturnModal from '../../devices/InitiateReturnModal';
// import DeviceAssignModal from '../../devices/DeviceAssignModal';
// import Modal from '../../common/Modal';

// export default function DevicesTab({ patient }: { patient: Patient }) {
//   const { devices, assignDevice } = useDevicesStore();
//   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
//   const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
//   const [returnTarget, setReturnTarget] = useState<Device | null>(null);
//   const [assignTarget, setAssignTarget] = useState<Device | null>(null);

//   const patientDevices = devices.filter((d: Device) => d.patientId === patient.id);
//   const availableDevices = devices.filter((d: Device) => d.status === 'Available');

//   return (
//     <div className="space-y-4 font-sans animate-in fade-in duration-500">
//       <div className="flex items-center justify-between px-1">
//         <div>
//           <h3 className="text-[12px] font-semibold text-slate-900 uppercase tracking-widest">Hardware Inventory</h3>
//           <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-0.5">Assigned to this patient</p>
//         </div>
//         <Button
//           onClick={() => setIsAssignModalOpen(true)}
//           size="sm"
//           disabled={availableDevices.length === 0}
//           className="text-[11px] h-8 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-sm px-4 font-medium"
//         >
//           <Plus size={12} className="mr-1.5" /> Assign New Device
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//         {patientDevices.map((device: Device) => (
//           <DeviceCard
//             key={device.id}
//             device={device}
//             onClick={setSelectedDevice}
//             onReturn={setReturnTarget}
//           />
//         ))}
//         {patientDevices.length === 0 && (
//           <div className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
//             <Monitor size={24} className="text-slate-300 mb-2" />
//             <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">No devices assigned</p>
//           </div>
//         )}
//       </div>

//       {/* Detail Drawer */}
//       {selectedDevice && (
//         <DeviceDetailDrawer
//           device={selectedDevice}
//           onClose={() => setSelectedDevice(null)}
//         />
//       )}

//       {/* Return Modal */}
//       {returnTarget && (
//         <InitiateReturnModal
//           isOpen={!!returnTarget}
//           onClose={() => setReturnTarget(null)}
//           device={returnTarget}
//         />
//       )}

//       {/* Assign Modal (Using common Modal component) */}
//       <Modal
//         isOpen={isAssignModalOpen}
//         onClose={() => setIsAssignModalOpen(false)}
//         title="Available Inventory"
//       >
//         <div className="space-y-1">
//           <p className="text-[10px] text-slate-400 uppercase tracking-tighter mb-3 px-1">Select a device to assign</p>
//           <div className="max-h-[400px] overflow-y-auto space-y-1 pr-1">
//             {availableDevices.map((device: Device) => (
//               <div
//                 key={device.id}
//                 onClick={() => {
//                   assignDevice(device.id, patient.id, 'stf_current');
//                   setIsAssignModalOpen(false);
//                 }}
//                 className="group flex justify-between items-center p-3 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 cursor-pointer transition-all"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
//                     <Monitor size={15} />
//                   </div>
//                   <div>
//                     <p className="text-[12px] font-semibold text-slate-800">{device.type}</p>
//                     <p className="text-[10px] text-slate-400 font-mono">{device.serialNumber}</p>
//                   </div>
//                 </div>
//                 <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">Assign →</span>
//               </div>
//             ))}
//             {availableDevices.length === 0 && (
//               <div className="py-12 text-center">
//                 <p className="text-[11px] text-slate-400 uppercase tracking-widest">No available devices</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }
// src/components/patients/tabs/DevicesTab.tsx
import type { Patient } from '../../../types';
import Devices from '../../../pages/Devices';

interface Props {
  patient: Patient;
}

export default function DevicesTab({ patient }: Props) {
  return (
    <Devices 
      patientId={patient.id} 
      embedded={true} 
    />
  );
}