import Card from '../../common/Card';
import Button from '../../common/Button';

export default function MonitoringTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Log Monitoring Time">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500">Hours</p>
            <input type="text" defaultValue="15" className="w-full text-3xl font-bold text-center border rounded-xl p-3" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Minutes</p>
            <input type="text" defaultValue="18" className="w-full text-3xl font-bold text-center border rounded-xl p-3" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Seconds</p>
            <input type="text" defaultValue="47" className="w-full text-3xl font-bold text-center border rounded-xl p-3" />
          </div>
        </div>
        <Button className="w-full">Save Monitoring Entry</Button>
      </Card>

      <Card title="Recent Monitoring History">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-3 border-b">
            <div>2026-04-28</div>
            <div>15h 18m</div>
            <div className="text-green-600">Completed</div>
          </div>
          <div className="flex justify-between py-3 border-b">
            <div>2026-04-27</div>
            <div>12h 45m</div>
            <div className="text-green-600">Completed</div>
          </div>
        </div>
      </Card>
    </div>
  );
}