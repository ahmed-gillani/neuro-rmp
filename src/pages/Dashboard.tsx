import { mockPatients, mockStats, mockReadings } from '../data/mockData';
import StatCard from '../components/common/StatCard';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { AlertTriangle, Clock, Users } from 'lucide-react';

export default function Dashboard() {
  const oorReadings = mockReadings.filter(r => r.isOOR);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. Ahmed 👋</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your RPM program today</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OOR Readings Widget */}
        <Card title="Out of Range Readings (Today)">
          <div className="space-y-4">
            {oorReadings.length > 0 ? (
              oorReadings.map((reading) => (
                <div key={reading.id} className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="font-medium">Muhammad Ahmed</p>
                      <p className="text-sm text-gray-600">
                        {reading.type}: <span className="font-medium">{reading.value} {reading.unit}</span>
                      </p>
                    </div>
                  </div>
                  <Badge status="OOR" />
                </div>
              ))
            ) : (
              <p className="text-green-600 py-8 text-center">All readings are within normal range 🎉</p>
            )}
          </div>
          <Button className="w-full mt-4">Review All OOR Readings</Button>
        </Card>

        {/* Quick Stats / Today's Activity */}
        <Card title="Today's Activity">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">12 Patients Reviewed</p>
                <p className="text-sm text-gray-500">8 new readings • 3 messages sent</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold">487 Monitoring Minutes Logged</p>
                <p className="text-sm text-gray-500">Goal: 600 minutes • On track</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card title="Recent Patients">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPatients.slice(0, 4).map((patient) => (
            <div key={patient.id} className="p-5 border border-gray-200 rounded-2xl hover:border-primary-200 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.primaryProvider}</p>
                </div>
                <Badge status={patient.status} />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Last Reading: {patient.lastReadingDate || 'No readings yet'}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}