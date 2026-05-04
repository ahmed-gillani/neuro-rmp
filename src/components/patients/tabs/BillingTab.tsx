// src/components/patients/tabs/BillingTab.tsx
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import type { Patient } from '../../../types';

interface BillingTabProps {
  patient: Patient;
}

export default function BillingTab({ patient }: BillingTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Billing Summary — {patient.name}</h3>
          <Button variant="outline" size="sm">Download PDF</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-4">CPT Code</th>
                <th className="text-left py-4">Description</th>
                <th className="text-right py-4">Amount</th>
                <th className="text-center py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-4 font-medium">99457</td>
                <td>RPM Treatment Management (20+ mins)</td>
                <td className="text-right font-medium">$89.00</td>
                <td className="text-center"><Badge variant="success">Billed</Badge></td>
              </tr>
              <tr>
                <td className="py-4 font-medium">99454</td>
                <td>Device Supply &amp; Data Transmission</td>
                <td className="text-right font-medium">$62.00</td>
                <td className="text-center"><Badge variant="success">Billed</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Monthly Monitoring Time">
        <div className="text-center py-8">
          <p className="text-5xl font-black text-green-600">1,248</p>
          <p className="text-gray-500 mt-2">Minutes Logged This Month</p>
          <p className="text-sm text-green-600 font-medium mt-1">Qualifies for CPT 99457</p>
        </div>
      </Card>
    </div>
  );
}