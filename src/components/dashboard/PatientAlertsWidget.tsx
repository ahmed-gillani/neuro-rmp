// src/components/dashboard/PatientAlertsWidget.tsx
import { useState, useMemo } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { PatientAlert } from '../../types/rpm';

interface Props {
  alerts: PatientAlert[];
  onViewPatient: (id: string) => void;
  onResolveAlert?: (id: string) => void; // New: Mark as resolved
}

export default function PatientAlertsWidget({ 
  alerts, 
  onViewPatient, 
  onResolveAlert 
}: Props) {
  const [filter, setFilter] = useState<'All' | 'high' | 'medium' | 'low'>('All');
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const activeAlerts = alerts.filter(a => !resolvedIds.includes(a.id));

  const filteredAlerts = useMemo(() => {
    if (filter === 'All') return activeAlerts;
    return activeAlerts.filter(a => a.severity === filter);
  }, [activeAlerts, filter]);

  const handleResolve = (id: string) => {
    if (onResolveAlert) {
      onResolveAlert(id);
    } else {
      setResolvedIds(prev => [...prev, id]);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getVariant = (severity: string) => 
    severity === 'high' ? 'error' : severity === 'medium' ? 'warning' : 'info';

  return (
    <Card title="ACTIVE PATIENT ALERTS" className="h-auto">
      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 border-b pb-3">
        {(['All', 'high', 'medium', 'low'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 text-xs font-medium rounded-full transition-all ${
              filter === f 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {f === 'All' ? 'All' : f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-[380px] overflow-auto pr-1">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="w-10 h-10 text-emerald-500 mb-3" />
            <p className="font-medium text-slate-600">No active alerts</p>
            <p className="text-xs text-slate-400 mt-1">All clear for now</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="group bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-4 transition-all hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="mt-0.5">
                  {getSeverityIcon(alert.severity)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {alert.patientName}
                    </p>
                    <Badge 
                      variant={getVariant(alert.severity)} 
                      className="text-[9px] uppercase tracking-widest font-bold"
                    >
                      {alert.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-600 mt-1 leading-tight">
                    {alert.message}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400">
                    <Clock size={12} />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewPatient(alert.patientId)}
                  className="flex-1 text-xs h-8"
                >
                  View Patient
                </Button>

                {onResolveAlert && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolve(alert.id)}
                    className="flex-1 text-xs h-8 border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                  >
                    <CheckCircle size={14} className="mr-1" />
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Stats */}
      <div className="text-center text-[10px] text-slate-400 mt-5 pt-3 border-t">
        {activeAlerts.length} active • {resolvedIds.length} resolved today
      </div>
    </Card>
  );
}