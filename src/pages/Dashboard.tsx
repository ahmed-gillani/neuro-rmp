//src/pages/Dashboard.tsx
import { mockPatients, mockStats, mockReadings } from '../data/mockData';
import StatCard from '../components/common/StatCard';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { AlertTriangle,  } from 'lucide-react';

export default function Dashboard() {
  const oorReadings = mockReadings.filter(r => r.isOOR);

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#b6c8d9]">Good morning, Dr. Ahmed 👋</h1>
        <p className="text-[#b6c8d9] mt-1">Here's what's happening with your RPM program today</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            className="bg-[#13395e] text-[#b6c8d9]"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OOR Readings */}
        <Card title="Out of Range Readings (Today)" className="bg-[#13395e] text-[#b6c8d9]">
          <div className="space-y-4">
            {oorReadings.length > 0 ? (
              oorReadings.map((reading, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="font-medium text-[#b6c8d9]">Muhammad Ahmed</p>
                      <p className="text-sm text-gray-400">
                        {reading.type}: <span className="font-medium text-[#b6c8d9]">{reading.value}</span>
                      </p>
                    </div>
                  </div>
                  <Badge status="OOR" className="bg-red-600 text-white" />
                </div>
              ))
            ) : (
              <p className="text-[#b6c8d9]">No out-of-range readings for today.</p>
            )}
          </div>
        </Card>

        {/* Other Section */}
        <Card title="Other Insights" className="bg-[#13395e] text-[#b6c8d9]">
          <p className="text-[#b6c8d9]">Additional content goes here...</p>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card title="Recent Patients">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPatients.slice(0, 4).map((patient) => (
            <div key={patient.id} className="p-5 border border-gray-200 rounded-2xl hover:border-primary-200 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.primaryProvider}</p>
                </div>
                <Badge status={patient.status} />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Last Reading: {patient.lastReadingDate || 'No readings yet'}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}