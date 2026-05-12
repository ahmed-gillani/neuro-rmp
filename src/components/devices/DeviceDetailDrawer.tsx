// src/components/devices/DeviceDetailDrawer.tsx
// Slide-over drawer showing full device details, assignment history, connection events

import { useDevicesStore } from '../../stores/useDevicesStore';
import { X, Monitor, Wifi, WifiOff, AlertTriangle, Clock, History, RotateCcw } from 'lucide-react';
import type { Device } from '../../types/devices';

interface Props {
  device: Device;
  onClose: () => void;
}

export default function DeviceDetailDrawer({ device, onClose }: Props) {
  const { getAssignmentHistory, getConnectionEvents } = useDevicesStore();
  const history = getAssignmentHistory(device.id);
  const events = getConnectionEvents(device.id, 20);

  const connIcon = () => {
    if (device.connectionStatus === 'Online') return <Wifi size={14} className="text-emerald-500" />;
    if (device.connectionStatus === 'Degraded') return <AlertTriangle size={14} className="text-amber-500" />;
    return <WifiOff size={14} className="text-slate-400" />;
  };

  const eventColor = (type: string) => ({
    'Connected': 'text-emerald-600 bg-emerald-50',
    'Disconnected': 'text-slate-500 bg-slate-50',
    'Reading Sent': 'text-blue-600 bg-blue-50',
    'Error': 'text-rose-600 bg-rose-50',
    'Firmware Update': 'text-violet-600 bg-violet-50',
  }[type] ?? 'text-slate-500 bg-slate-50');

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <Monitor size={17} />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-slate-800">{device.type}</h3>
              <p className="text-[10px] font-mono text-slate-400">{device.serialNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Status grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Status', value: device.status },
              { label: 'Vendor', value: device.vendor },
              { label: 'Firmware', value: device.firmware ?? '—' },
              { label: 'IMEI', value: device.imei ?? '—' },
              { label: 'Purchased', value: device.purchasedAt ? new Date(device.purchasedAt).toLocaleDateString() : '—' },
              { label: 'Warranty', value: device.warrantyExpiry ? new Date(device.warrantyExpiry).toLocaleDateString() : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-widest text-slate-600">{label}</p>
                <p className="text-[12px] font-semibold text-slate-700 mt-0.5 truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Connection status */}
          <div className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] uppercase tracking-widest text-slate-700">Connection</p>
              <span className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-800">
                {connIcon()} {device.connectionStatus}
              </span>
            </div>
            {device.lastConnected && (
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock size={10} /> Last connected: {new Date(device.lastConnected).toLocaleString()}
              </p>
            )}
          </div>

          {/* Assignment history */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 flex items-center gap-1.5">
              <History size={11} /> Assignment History
            </h4>
            {history.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">Never assigned</p>
            ) : (
              <div className="space-y-2">
                {history.map((a) => (
                  <div key={a.id} className="flex justify-between items-start text-[11px] border-b border-slate-50 pb-2">
                    <div>
                      <span className="font-mono text-slate-500">{a.patientId}</span>
                      {a.returnReason && (
                        <span className="ml-2 text-[10px] text-amber-500">({a.returnReason})</span>
                      )}
                    </div>
                    <div className="text-right text-slate-400 text-[10px]">
                      <p>{new Date(a.assignedAt).toLocaleDateString()}</p>
                      {a.unassignedAt && <p>→ {new Date(a.unassignedAt).toLocaleDateString()}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Connection events */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-slate-600 mb-2">Recent Events</h4>
            {events.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No events recorded</p>
            ) : (
              <div className="space-y-1.5">
                {events.map((ev) => (
                  <div key={ev.id} className="flex items-start justify-between gap-2">
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${eventColor(ev.eventType)}`}>
                      {ev.eventType}
                    </span>
                    <span className="text-[10px] text-slate-400 text-right shrink-0">
                      {new Date(ev.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          {device.notes && (
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">Notes</p>
              <p className="text-[12px] text-slate-600 leading-relaxed">{device.notes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}