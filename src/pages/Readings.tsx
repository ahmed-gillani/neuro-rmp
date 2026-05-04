// src/pages/Readings.tsx
import Card from '../components/common/Card';
import ReadingChart from '../components/common/ReadingChart';
import { useReadingsStore } from '../stores/useReadingsStore';
import Button from '../components/common/Button';

export default function Readings() {
  const { readings } = useReadingsStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Patient Readings</h1>
        <Button onClick={() => {/* Open manual entry modal */}}>
          + Manual Entry
        </Button>
      </div>

      <Card title="Vitals Trends (Last 7 Days)">
        <ReadingChart />
      </Card>

      <Card title="Recent Readings">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Date</th>
                <th className="text-left py-4">Type</th>
                <th className="text-left py-4">Value</th>
                <th className="text-left py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {readings.slice(0, 10).map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="py-4">{new Date(r.timestamp).toLocaleDateString()}</td>
                  <td>{r.type}</td>
                  <td className="font-mono font-bold">{r.value}</td>
                  <td>
                    {r.isOOR ? (
                      <span className="text-red-600 font-medium">Out of Range</span>
                    ) : (
                      <span className="text-green-600 font-medium">Normal</span>
                    )}
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