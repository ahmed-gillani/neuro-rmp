import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Bell, AlertTriangle} from 'lucide-react';

type Alert = {
  id: string;
  type: 'OOR' | 'Missed' | 'Billing' | 'System';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
};

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'a1',
      type: 'OOR',
      title: 'Out of Range Reading',
      message: 'Muhammad Ahmed - Blood Pressure 148/92 mmHg',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 'a2',
      type: 'Missed',
      title: 'Missed Reading',
      message: 'Fatima Khan has not submitted readings for 2 days',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 'a3',
      type: 'Billing',
      title: 'Billing Threshold Reached',
      message: 'Dr. Sarah Ahmed has reached 85% of monthly monitoring minutes',
      time: 'Yesterday',
      read: true,
      priority: 'low'
    },
  ]);

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-600">{unreadCount} unread notifications</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Card>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all ${alert.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}
              onClick={() => markAsRead(alert.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${alert.type === 'OOR' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                  {alert.type === 'OOR' ? <AlertTriangle size={22} /> : <Bell size={22} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-semibold text-gray-900">{alert.title}</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</p>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                </div>

                {!alert.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold mb-2">OOR Alerts</h3>
          <p className="text-3xl font-bold text-red-600">7</p>
          <Button variant="outline" size="sm" className="mt-4 w-full">Review All OOR</Button>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">Missed Readings</h3>
          <p className="text-3xl font-bold text-amber-600">12</p>
          <Button variant="outline" size="sm" className="mt-4 w-full">Send Reminders</Button>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">System Alerts</h3>
          <p className="text-3xl font-bold text-gray-600">2</p>
          <Button variant="outline" size="sm" className="mt-4 w-full">View Logs</Button>
        </Card>
      </div>
    </div>
  );
}