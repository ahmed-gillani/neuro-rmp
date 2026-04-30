import Card from '../common/Card';
import Badge from '../common/Badge';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

// Define the structure for history items
type HistoryItem = {
  id: string;
  action: string;
  date: string;
  time: string;
  status: 'Completed' | 'Updated' | 'Pending' | 'Missed';
  details: string;
};

export default function HistoryTab() {
  // Mock data - in a real app, this would come from props or an API
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

  // Helper function to map your log status to Badge variants
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
        <Card key={item.id} className="border-gray-100 hover:border-primary-100 transition-colors">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  <CheckCircle2 size={20} />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-black text-gray-900 tracking-tight">{item.action}</h4>
                  {/* FIXED: Passing the mapped variant instead of status */}
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-50">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={14} />
                <span className="text-[11px] font-black uppercase tracking-widest">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={14} />
                <span className="text-[11px] font-black uppercase tracking-widest">{item.time}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}