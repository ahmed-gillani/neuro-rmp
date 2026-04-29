import Card from '../../common/Card';

export default function BillingTab() {
  return (
    <Card>
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold">Billing Summary</h3>
        <button className="text-primary-600">Download PDF</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">CPT Code</th>
              <th className="text-left py-3">Description</th>
              <th className="text-right py-3">Amount</th>
              <th className="text-center py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">99457</td>
              <td>RPM Treatment Management</td>
              <td className="text-right">$89.00</td>
              <td className="text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Billed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}