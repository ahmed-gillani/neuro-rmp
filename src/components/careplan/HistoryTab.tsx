// src/components/careplan/HistoryTab.tsx
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

type HistoryItem = {
  id: string;
  action: string;
  date: string;
  time: string;
  status: 'Completed' | 'Updated' | 'Pending' | 'Missed';
  details: string;
};

export default function HistoryTab() {
  const historyData: HistoryItem[] = [
    {
      id: 'h1',
      action: 'Care Plan Updated',
      date: 'Apr 28, 2026',
      time: '10:30 AM',
      status: 'Updated',
      details: 'Primary goal adjusted based on latest BP readings.'
    },
    {
      id: 'h2',
      action: 'Monthly Review',
      date: 'Mar 15, 2026',
      time: '02:15 PM',
      status: 'Completed',
      details: 'Patient showing significant improvement in sodium intake.'
    },
    {
      id: 'h3',
      action: 'Medication Adjustment',
      date: 'Feb 10, 2026',
      time: '09:00 AM',
      status: 'Missed',
      details: 'Scheduled follow-up call was not answered.'
    }
  ];

  const getStatusVariant = (status: HistoryItem['status']) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Updated': return 'info';
      case 'Missed': return 'error';
      default: return 'warning';
    }
  };

  return (
    <div className="space-y-4">
      {historyData.map((item) => (
        <Card key={item.id} className="border-gray-100 hover:border-gray-200 transition-colors">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700">
                  <CheckCircle2 size={20} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-900 tracking-tight">{item.action}</h4>   {/* font-black → font-semibold */}
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">   {/* font-medium → text-gray-600 */}
                  {item.details}
                </p>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={14} />
                <span className="text-xs font-medium">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={14} />
                <span className="text-xs font-medium">{item.time}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}