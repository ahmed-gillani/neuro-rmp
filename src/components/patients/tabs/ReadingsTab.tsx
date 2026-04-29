import Card from '../../common/Card';
import { mockReadings } from '../../../data/mockData';

export default function ReadingsTab() {
  return (
    <div className="space-y-6">
      <Card title="Latest Readings">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockReadings.map((reading, idx) => (
            <div key={idx} className="p-4 border rounded-2xl">
              <p className="text-sm text-gray-500">{reading.type}</p>
              <p className="text-3xl font-bold mt-1">{reading.value}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(reading.timestamp).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Trends (Last 7 Days)">
        <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
          Chart will be added here (Recharts)
        </div>
      </Card>
    </div>
  );
}