// src/components/patients/tabs/MonitoringTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { useToast } from '../../../context/ToastContext';
import type { Patient } from '../../../types';

interface MonitoringTabProps {
  patient: Patient;
}

export default function MonitoringTab({ patient }: MonitoringTabProps) {
  const { showToast } = useToast();
  
  const [monitoringTime, setMonitoringTime] = useState({
    hours: 15,
    minutes: 18,
    seconds: 47,
  });

  const [history, setHistory] = useState([
    { date: "2026-04-28", time: "15h 18m", status: "Completed" },
    { date: "2026-04-27", time: "12h 45m", status: "Completed" },
    { date: "2026-04-26", time: "8h 10m", status: "Partial" },
  ]);

  const handleSave = () => {
    const totalTime = `${monitoringTime.hours}h ${monitoringTime.minutes}m`;
    
    setHistory([
      { 
        date: new Date().toISOString().split('T')[0], 
        time: totalTime, 
        status: "Completed" 
      },
      ...history
    ]);

    showToast(`Monitoring time logged for ${patient.name} (${totalTime})`, "success");
  };

  const handleInputChange = (field: 'hours' | 'minutes' | 'seconds', value: string) => {
    const num = parseInt(value) || 0;
    setMonitoringTime(prev => ({ ...prev, [field]: Math.max(0, num) }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Log Monitoring Time */}
      <Card title="Log Monitoring Time">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-600 mb-1">Hours</p>
            <input 
              type="number" 
              value={monitoringTime.hours}
              onChange={(e) => handleInputChange('hours', e.target.value)}
              className="w-full text-3xl font-bold text-gray-900 text-center border border-gray-300 rounded-2xl p-3 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Minutes</p>
            <input 
              type="number" 
              value={monitoringTime.minutes}
              onChange={(e) => handleInputChange('minutes', e.target.value)}
              className="w-full text-3xl font-bold text-gray-900 text-center border border-gray-300 rounded-2xl p-3 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Seconds</p>
            <input 
              type="number" 
              value={monitoringTime.seconds}
              onChange={(e) => handleInputChange('seconds', e.target.value)}
              className="w-full text-3xl font-bold text-gray-900 text-center border border-gray-300 rounded-2xl p-3 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Monitoring Entry
        </Button>
      </Card>

      {/* Monitoring History */}
      <Card title="Recent Monitoring History">
        <div className="space-y-4 text-sm">
          {history.map((entry, index) => (
            <div key={index} className="flex justify-between items-center py-4 border-b last:border-b-0">
              <div className="font-medium">{entry.date}</div>
              <div className="font-semibold text-gray-900">{entry.time}</div>
              <div className={`font-medium ${
                entry.status === 'Completed' ? 'text-green-600' : 'text-amber-600'
              }`}>
                {entry.status}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}