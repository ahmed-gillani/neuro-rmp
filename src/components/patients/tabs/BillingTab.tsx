// src/components/patients/tabs/BillingTab.tsx
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import { DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function BillingTab() {
  return (
    <div className="space-y-3 animate-in fade-in duration-500">
      {/* Stats - Normal Weights */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Logged Minutes', val: '1,248', icon: Clock, color: 'text-blue-600', sub: '99457 Eligible' },
          { label: 'Billed Amount', val: '$1,847', icon: DollarSign, color: 'text-emerald-600', sub: 'May 2026' },
          { label: 'Reimbursement', val: '92%', icon: CheckCircle, color: 'text-indigo-600', sub: 'Success Rate' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl py-2 px-4 shadow-sm flex items-center gap-3 min-w-[160px] flex-1 sm:flex-none">
            <div className={`w-8 h-8 rounded-lg bg-slate-50 ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-slate-500 uppercase tracking-tight mb-0.5 truncate leading-none">
                {stat.label}
              </p>
              <p className="text-lg font-medium text-slate-900 leading-none">{stat.val}</p>
              <p className="text-[9px] font-medium text-blue-500 mt-1 uppercase tracking-tighter leading-none">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* History Table - Professional & Clean */}
      <Card noPadding title="Billing History" className="border-slate-100 shadow-none">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-4 py-2 text-[12px] font-medium text-slate-500 uppercase tracking-widest">ICD-10</th>
                <th className="px-4 py-2 text-[12px] font-medium text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-4 py-2 text-[12px] font-medium text-slate-500 uppercase tracking-widest text-center">Amount</th>
                <th className="px-4 py-2 text-[12px] font-medium text-slate-500 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { code: "G47.33", date: "May 5, 2026", amount: "$187.00", status: "Paid" },
                { code: "I10.00", date: "May 1, 2026", amount: "$142.50", status: "Pending" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-[11px] font-medium text-slate-700 tracking-tight">{row.code}</td>
                  <td className="px-4 py-2.5 text-[11px] text-slate-500">{row.date}</td>
                  <td className="px-4 py-2.5 text-[11px] font-medium text-slate-900 text-center">{row.amount}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`text-[9px] px-2 py-0.5 rounded font-medium uppercase tracking-tight ${row.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                      {row.status}
                    </span>
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