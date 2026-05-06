// src/components/patients/tabs/ReadingsTab.tsx
import { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { useReadingsStore } from '../../../stores/useReadingsStore';
import type { Patient } from '../../../types';
import ReadingChart from '../../common/ReadingChart';
import { Plus } from 'lucide-react';

interface ReadingsTabProps {
  patient: Patient;
}

export default function ReadingsTab({ patient }: ReadingsTabProps) {
  const { readings } = useReadingsStore();
  const patientReadings = readings.filter(r => r.patientId === patient.id);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Readings & Vitals</h3>
          <p className="text-slate-600 text-sm">Track and analyze patient vitals over time.</p>
        </div>
        <Button className="btn-primary whitespace-nowrap">+ Manual Entry</Button>
      </div>

      {/* Chart Card */}
      <Card>
        <h4 className="font-semibold mb-4 px-1">Blood Pressure Trend</h4>
        <div className="h-64 sm:h-80 md:h-96">
          <ReadingChart />
        </div>
      </Card>

      {/* Recent Readings - Fully Responsive Table */}
      <Card title="Recent Readings">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="pb-4 pl-1">Date</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Value</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {patientReadings.slice(0, 8).map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-4 pl-1 whitespace-nowrap text-slate-700">
                    {new Date(r.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-slate-700">{r.type}</td>
                  <td className="py-4 font-mono font-semibold text-slate-900">{r.value}</td>
                  <td className="py-4">
                    {r.isOOR ? (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                        Out of Range
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {patientReadings.length === 0 && (
          <p className="text-center py-12 text-slate-500">No readings available yet.</p>
        )}
      </Card>
    </div>
  );
}