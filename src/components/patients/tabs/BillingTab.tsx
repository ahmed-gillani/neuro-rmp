// src/components/patients/tabs/BillingTab.tsx
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import type { Patient } from '../../../types';

export default function BillingTab({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">Billing & Claims</h3>
          <p className="text-slate-600">RPM & CCM Billing Summary</p>
        </div>
        <Button className="btn-primary">Export PDF Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <p className="stat-value font-bold text-emerald-600">1,248</p>
          <p className="text-slate-600 mt-3">Minutes Logged</p>
          <p className="text-xs text-emerald-600 mt-1">Qualifies for 99457</p>
        </Card>
        <Card className="text-center">
          <p className="stat-value font-bold text-teal-600">$1,847</p>
          <p className="text-slate-600 mt-3">Billed This Month</p>
        </Card>
        <Card className="text-center">
          <p className="stat-value font-bold text-indigo-600">92%</p>
          <p className="text-slate-600 mt-3">Reimbursement Rate</p>
        </Card>
      </div>

      <Card title="Billing History">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="text-left py-5 px-6">ICD-10</th>
                <th className="text-left py-5 px-6">Date</th>
                <th className="text-left py-5 px-6">Service</th>
                <th className="text-center py-5 px-6">Amount</th>
                <th className="text-center py-5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { code: "G47.33", date: "May 5", service: "RPM", amount: "$187", status: "Paid" },
                { code: "I10", date: "May 1", service: "CCM", amount: "$142", status: "Pending" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-5 px-6 font-mono">{row.code}</td>
                  <td className="py-5 px-6">{row.date}</td>
                  <td className="py-5 px-6">{row.service}</td>
                  <td className="py-5 px-6 text-center font-semibold">{row.amount}</td>
                  <td className="py-5 px-6 text-center">
                    <Badge status={row.status === "Paid" ? "Active" : "OOR"}>{row.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}