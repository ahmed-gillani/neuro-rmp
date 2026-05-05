// src/components/patients/tabs/AlertsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import { AlertCircle, AlertTriangle, Phone } from 'lucide-react';
import { useReadingsStore } from '../../../stores/useReadingsStore';
import type { Patient } from '../../../types';

interface AlertsTabProps {
  patient: Patient;
}

export default function AlertsTab({ patient }: AlertsTabProps) {
  const { markAsReviewed } = useReadingsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Critical' | 'Warnings'>('All');

  // Enhanced mock alerts
  const alertsData = [
    {
      id: 'a1',
      type: 'Blood Pressure',
      message: 'Blood pressure reading above critical threshold — 145/92 mmHg',
      time: '2 min ago',
      severity: 'CRITICAL',
      provider: 'Maria Johnson'
    },
    {
      id: 'a2',
      type: 'Glucose',
      message: 'Glucose spike detected — 210 mg/dL (post-meal)',
      time: '8 min ago',
      severity: 'WARNING',
      provider: 'Sarah Chen'
    },
    {
      id: 'a3',
      type: 'Device',
      message: 'Device D-1006 disconnected for over 1 hour',
      time: '23 min ago',
      severity: 'WARNING',
      provider: 'Tom Baker'
    },
    {
      id: 'a4',
      type: 'Heart Rate',
      message: 'Heart rate elevated — 112 bpm (resting)',
      time: '15 min ago',
      severity: 'WARNING',
      provider: 'Emily Park'
    },
    {
      id: 'a5',
      type: 'SpO2',
      message: 'SpO2 dropped below 95% briefly — 93%',
      time: '30 min ago',
      severity: 'CRITICAL',
      provider: 'Robert Davis'
    },
  ];

  // Search + Filter Logic
  const filteredAlerts = alertsData
    .filter(alert => {
      const matchesSearch = 
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = 
        activeFilter === 'All' || 
        (activeFilter === 'Critical' && alert.severity === 'CRITICAL') ||
        (activeFilter === 'Warnings' && alert.severity === 'WARNING');

      return matchesSearch && matchesFilter;
    });

  const handleMarkAsRead = (id: string) => {
    markAsReviewed(id);
    alert('Alert marked as read');
  };

  const handleCallPatient = () => {
    alert(`Calling ${patient.name}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Alerts</h3>
          <p className="text-gray-600">Manage alerts for the patient in one place.</p>
        </div>

        {/* Functional Search Bar */}
        <input
          type="text"
          placeholder="Search alerts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-2xl px-5 py-3 w-full md:w-80 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-1">
        {['All', 'Critical', 'Warnings'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as any)}
            className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter} {filter !== 'All' && `(${filteredAlerts.filter(a => a.severity === (filter === 'Critical' ? 'CRITICAL' : 'WARNING')).length})`}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No alerts found matching your search.</p>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`p-6 border-l-4 transition-all hover:shadow-md ${
                alert.severity === 'CRITICAL' 
                  ? 'border-l-red-500 bg-red-50' 
                  : 'border-l-amber-500 bg-amber-50'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {alert.severity === 'CRITICAL' ? <AlertCircle size={24} /> : <AlertTriangle size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{alert.provider}</p>
                        <Badge variant={alert.severity === 'CRITICAL' ? "error" : "warning"}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                  <p className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</p>
                  <Button 
                    onClick={() => handleMarkAsRead(alert.id)}
                    variant="outline"
                    className="text-emerald-600 hover:bg-emerald-50 whitespace-nowrap"
                  >
                    Mark as read
                  </Button>
                  <Button 
                    onClick={handleCallPatient}
                    variant="outline"
                    className="whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Patient
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}