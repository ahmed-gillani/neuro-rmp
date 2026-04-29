import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { MessageSquare, Phone,  Send } from 'lucide-react';

type Message = {
  id: string;
  type: 'sms' | 'call';
  direction: 'outbound' | 'inbound';
  patient: string;
  content: string;
  time: string;
  status: 'sent' | 'delivered' | 'failed' | 'answered' | 'voicemail';
};

export default function Communication() {
  const [messages] = useState<Message[]>([
    {
      id: 'm1',
      type: 'sms',
      direction: 'outbound',
      patient: "Muhammad Ahmed",
      content: "Your blood pressure reading is high today. Please take medication and rest.",
      time: "10:45 AM",
      status: 'delivered'
    },
    {
      id: 'm2',
      type: 'call',
      direction: 'outbound',
      patient: "Fatima Khan",
      content: "Call - Discussed glucose levels (3 min)",
      time: "Yesterday",
      status: 'answered'
    },
    {
      id: 'm3',
      type: 'sms',
      direction: 'inbound',
      patient: "Imran Malik",
      content: "I missed my morning reading. Will do it now.",
      time: "2 days ago",
      status: 'delivered'
    },
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'sms' | 'calls'>('all');

  const filteredMessages = messages.filter(m => {
    if (activeTab === 'sms') return m.type === 'sms';
    if (activeTab === 'calls') return m.type === 'call';
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
          <p className="text-gray-600">SMS • Calls • Patient Engagement</p>
        </div>
        <div className="flex gap-3">
          <Button variant='outline'>
            <Send className="w-5 h-5 mr-2" />
            New SMS
          </Button>
          <Button variant="outline">
            <Phone className="w-5 h-5 mr-2" />
            Log Call
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['all', 'sms', 'calls'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'all' ? 'All Messages' : tab.toUpperCase()}
          </button>
        ))}
      </div>

      <Card>
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="flex gap-4 p-5 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${msg.type === 'sms' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                {msg.type === 'sms' ? <MessageSquare size={26} /> : <Phone size={26} />}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-semibold">{msg.patient}</p>
                  <p className="text-xs text-gray-500">{msg.time}</p>
                </div>
                <p className="text-gray-700 mt-1 text-sm">{msg.content}</p>
                
                <div className="flex items-center gap-3 mt-3">
                  <Badge status={msg.status === 'answered' || msg.status === 'delivered' ? "Active" : "New"} />
                  <span className="text-xs text-gray-500 capitalize">{msg.direction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-4xl font-bold">47</p>
          <p className="text-sm text-gray-500 mt-2">SMS Sent This Week</p>
        </Card>
        <Card>
          <p className="text-4xl font-bold">18</p>
          <p className="text-sm text-gray-500 mt-2">Calls Logged</p>
        </Card>
        <Card>
          <p className="text-4xl font-bold text-green-600">89%</p>
          <p className="text-sm text-gray-500 mt-2">Response Rate</p>
        </Card>
      </div>
    </div>
  );
}