//src/components/devices/DeviceCard.tsx
import React from 'react';
import { Monitor, ChevronRight, Link2, RotateCcw, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import Card from '../common/Card';
import type { Device } from '../../types';

interface DeviceCardProps {
  device: Device;
  onAssign?: (device: Device) => void;
  onReturn?: (device: Device) => void;
  onClick?: (device: Device) => void;
}

export default function DeviceCard({ device, onAssign, onReturn, onClick }: DeviceCardProps) {
  // ── Connection status colour helpers ────────────────────────────────────────
  const connColor = (status: Device['connectionStatus']): string => {
    const colors: Record<Device['connectionStatus'], string> = {
      Online: 'text-emerald-500',
      Offline: 'text-slate-400',
      Degraded: 'text-amber-500',
      'Never Connected': 'text-slate-300',
    };
    return colors[status] ?? 'text-slate-400';
  };

  const connIcon = (status: Device['connectionStatus']) =>
    status === 'Online' ? (
      <Wifi size={12} className="text-emerald-500" />
    ) : status === 'Degraded' ? (
      <AlertTriangle size={12} className="text-amber-500" />
    ) : (
      <WifiOff size={12} className="text-slate-400" />
    );

  // ── Status pill colour ────────────────────────────────────────────────────
  const statusPill = (status: Device['status']) => {
    const map: Record<string, string> = {
      Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Assigned: 'bg-blue-50 text-blue-700 border-blue-200',
      'In Repair': 'bg-amber-50 text-amber-700 border-amber-200',
      Retired: 'bg-slate-100 text-slate-500 border-slate-200',
      Lost: 'bg-rose-50 text-rose-700 border-rose-200',
    };
    return `text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${map[status] ?? 'bg-slate-50 text-slate-500'}`;
  };

  return (
    <Card
      className="border-slate-100 shadow-none hover:border-blue-200 hover:shadow-sm transition-all p-4 cursor-pointer group"
      onClick={() => onClick?.(device)}
    >
      {/* Card header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <Monitor size={17} />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] font-semibold text-slate-800 leading-tight uppercase tracking-tight truncate">
              {device.type}
            </h4>
            <p className="text-[9px] text-slate-400 font-mono tracking-tighter mt-0.5">
              {device.serialNumber}
            </p>
          </div>
        </div>
        <ChevronRight size={13} className="text-slate-300 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
          {device.vendor}
        </span>
        {device.firmware && (
          <span className="text-[9px] text-slate-400 font-mono">v{device.firmware}</span>
        )}
      </div>

      {/* Status + Connection */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-50">
        <span className={statusPill(device.status)}>{device.status}</span>
        <span className={`flex items-center gap-1 text-[10px] font-medium ${connColor(device.connectionStatus)}`}>
          {connIcon(device.connectionStatus)}
          {device.connectionStatus}
        </span>
      </div>

      {/* Last connected */}
      {device.lastConnected && (
        <p className="text-[10px] text-slate-600 mt-2 font-medium">
          Last seen {new Date(device.lastConnected).toLocaleDateString()}
        </p>
      )}

      {/* Quick actions */}
      {(onAssign || onReturn) && (
        <div
          className="flex gap-2 mt-3 pt-2.5 border-t border-slate-50"
          onClick={(e) => e.stopPropagation()}
        >
          {device.status === 'Available' && onAssign && (
            <button
              onClick={() => onAssign(device)}
              className="flex items-center gap-1 text-[10px] text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              <Link2 size={11} /> Assign
            </button>
          )}
          {device.status === 'Assigned' && onReturn && (
            <button
              onClick={() => onReturn(device)}
              className="flex items-center gap-1 text-[10px] text-amber-600 font-medium hover:text-amber-800 transition-colors"
            >
              <RotateCcw size={11} /> Return
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
