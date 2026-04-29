import { mockDevices } from '../../../data/mockData';
import Badge from '../../common/Badge';
import Card from '../../common/Card';

export default function DevicesTab() {
  return (
    <Card>
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold">Assigned Devices</h3>
        <button className="text-primary-600 font-medium">+ Assign New Device</button>
      </div>
      {mockDevices.map((device) => (
        <div key={device.id} className="flex justify-between py-4 border-b last:border-0">
          <div>
            <p className="font-medium">{device.type}</p>
            <p className="text-sm text-gray-500">{device.serialNumber}</p>
          </div>
          <Badge status={device.status || 'Active'} />
        </div>
      ))}
    </Card>
  );
}