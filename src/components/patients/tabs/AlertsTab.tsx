import Card from '../../common/Card';

export default function AlertsTab() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-2xl">
          <p className="font-medium text-red-700">Blood Pressure Out of Range</p>
          <p className="text-sm">148/92 mmHg — 2 minutes ago</p>
        </div>
      </Card>
      <Card>
        <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-2xl">
          <p className="font-medium text-yellow-700">Missed Reading</p>
          <p className="text-sm">Fatima Khan — 1 hour ago</p>
        </div>
      </Card>
    </div>
  );
}