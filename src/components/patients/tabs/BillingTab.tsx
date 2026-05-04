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
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Billing</h3>
          <p className="text-gray-600">Create CPT codes and manage billing items in one place.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">RPM</Button>
          <Button variant="outline" size="sm">CCM</Button>
          <Button size="sm" className="flex items-center gap-2">
            <span>↓</span> PDF
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">ICD-10</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">RPM Time</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">Setup Date</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">Reading Days</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-xs tracking-widest">DOS</th>
                <th className="text-center py-5 px-4 font-bold text-gray-700 uppercase text-xs tracking-widest">99470</th>
                <th className="text-center py-5 px-4 font-bold text-gray-700 uppercase text-xs tracking-widest">99457</th>
                <th className="text-center py-5 px-4 font-bold text-gray-700 uppercase text-xs tracking-widest">99458</th>
                <th className="text-center py-5 px-4 font-bold text-gray-700 uppercase text-xs tracking-widest">99445</th>
                <th className="text-center py-5 px-4 font-bold text-gray-700 uppercase text-xs tracking-widest">99454</th>
                <th className="text-center py-5 px-4 font-bold text-gray-700 uppercase text-xs tracking-widest">99453</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { code: "G47.33", time: "00:20:00", setup: "12-05-2025", days: "30", dos: "12-05-2025", c1: "billable", c2: "paid", c3: "non billable", c4: "billable", c5: "paid", c6: "non billable" },
                { code: "I10", time: "00:15:00", setup: "20-05-2025", days: "14", dos: "20-05-2025", c1: "non billable", c2: "billable", c3: "paid", c4: "non billable", c5: "billable", c6: "paid" },
                { code: "E11.65", time: "00:25:00", setup: "08-05-2025", days: "28", dos: "08-05-2025", c1: "billable", c2: "paid", c3: "billable", c4: "paid", c5: "non billable", c6: "billable" },
                { code: "J45.909", time: "00:18:00", setup: "16-05-2025", days: "20", dos: "16-05-2025", c1: "paid", c2: "billable", c3: "non billable", c4: "billable", c5: "paid", c6: "billable" },
                { code: "I50.9", time: "00:22:00", setup: "28-05-2025", days: "26", dos: "28-05-2025", c1: "non billable", c2: "paid", c3: "billable", c4: "non billable", c5: "billable", c6: "paid" },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-6 font-medium text-gray-900">{row.code}</td>
                  <td className="py-5 px-6 text-gray-600 font-mono">{row.time}</td>
                  <td className="py-5 px-6 text-gray-600">{row.setup}</td>
                  <td className="py-5 px-6 text-center text-gray-600">{row.days}</td>
                  <td className="py-5 px-6 text-gray-600">{row.dos}</td>
                  {[row.c1, row.c2, row.c3, row.c4, row.c5, row.c6].map((status, i) => (
                    <td key={i} className="text-center py-5 px-3">
                      <Badge 
                        variant={status === "billable" || status === "paid" ? "success" : "warning"}
                        className="text-xs capitalize font-medium px-4 py-1"
                      >
                        {status}
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-8">
          <p className="text-5xl font-black text-emerald-600">1,248</p>
          <p className="text-gray-600 mt-3">Minutes Logged</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Qualifies for 99457</p>
        </Card>

        <Card className="text-center p-8">
          <p className="text-5xl font-black text-blue-600">$1,847</p>
          <p className="text-gray-600 mt-3">Billed This Month</p>
        </Card>

        <Card className="text-center p-8">
          <p className="text-5xl font-black text-amber-600">92%</p>
          <p className="text-gray-600 mt-3">Reimbursement Rate</p>
        </Card>
      </div>
    </div>
  );
}