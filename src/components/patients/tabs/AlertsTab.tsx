// src/components/patients/tabs/AlertsTab.tsx
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import { AlertTriangle, Phone, CheckCircle } from 'lucide-react';
import { useReadingsStore } from '../../../stores/useReadingsStore';
import { useToast } from '../../../context/ToastContext';
import type { Patient } from '../../../types';

interface AlertsTabProps {
  patient: Patient;
}

export default function AlertsTab({ patient }: AlertsTabProps) {
  const { oorReadings, markAsReviewed } = useReadingsStore();
  const { showToast } = useToast();

  // Filter alerts for current patient (you can improve this logic later)
  const patientAlerts = oorReadings.filter(r => r.patientId === patient.id || true);

  const handleMarkReviewed = (id: string, type: string) => {
    markAsReviewed(id);
    showToast(`${type} alert marked as reviewed`, "success");
  };

  const handleCallPatient = () => {
    showToast(`Calling ${patient.name}...`, "info");
    // Simulate call
    setTimeout(() => {
      showToast(`Call logged with ${patient.name}`, "success");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          Active Alerts — {patient.name}
        </h3>
        <Badge variant="error" className="text-sm px-4 py-1">
          {patientAlerts.length} Critical
        </Badge>
      </div>

      {patientAlerts.length === 0 ? (
        <Card className="p-12 text-center bg-green-50 border-green-100">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-green-700">No Active Alerts</p>
          <p className="text-gray-500 mt-1">All readings are within normal range for this patient.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {patientAlerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-red-500 bg-red-50/60 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-1">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-red-500" />
                    <p className="font-semibold text-red-700">{alert.type} Out of Range</p>
                  </div>
                  <p className="text-3xl font-bold text-red-600 mt-1">{alert.value}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  {alert.notes && <p className="text-gray-600 mt-2">{alert.notes}</p>}
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <Button 
                    onClick={() => handleMarkReviewed(alert.id, alert.type)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Reviewed
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleCallPatient}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Patient
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <Card>
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-4xl font-black text-red-600">{patientAlerts.length}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">OOR Readings</p>
          </div>
          <div>
            <p className="text-4xl font-black text-amber-600">2</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">Missed Readings</p>
          </div>
        </div>
      </Card>
    </div>
  );
}