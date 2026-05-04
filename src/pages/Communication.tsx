//src/pages/Communication.tsx
import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { MessageSquare, Phone, Send } from 'lucide-react';

type Message = {
  id: string;
  type: 'sms' | 'call';
  direction: 'outbound' | 'inbound';
  patient: string;
  content: string;
  time: string;
};

export default function Communication() {
  const [activeTab, setActiveTab] = useState<'all' | 'sms' | 'calls'>('all');

  const messages: Message[] = [
    {
      id: '1',
      type: 'sms',
      direction: 'outbound',
      patient: "Muhammad Ahmed",
      content: "Your blood pressure reading is high today. Please take medication and rest.",
      time: "10:45 AM",
    },
    {
      id: '2',
      type: 'call',
      direction: 'outbound',
      patient: "Fatima Khan",
      content: "Call - Discussed glucose levels (3 min)",
      time: "YESTERDAY",
    },
    {
      id: '3',
      type: 'sms',
      direction: 'inbound',
      patient: "Imran Malik",
      content: "I missed my morning reading. Will do it now.",
      time: "2 DAYS AGO",
    },
  ];

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'sms') return msg.type === 'sms';
    if (activeTab === 'calls') return msg.type === 'call';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Communication</h1>
          <p className="text-gray-600">SMS • Calls • Patient Engagement</p>
        </div>
        <div className="flex gap-3">
          <Button><Send className="w-4 h-4 mr-2" /> New SMS</Button>
          <Button variant="outline"><Phone className="w-4 h-4 mr-2" /> Log Call</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 pb-1">
        {['all', 'sms', 'calls'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-3 font-bold text-sm uppercase tracking-widest border-b-4 transition-all ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'all' ? 'ALL MESSAGES' : tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <Card key={msg.id} className="p-6 hover:shadow-lg transition-all border border-gray-200">
            <div className="flex gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                msg.type === 'sms' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
              }`}>
                {msg.type === 'sms' ? <MessageSquare size={28} /> : <Phone size={28} />}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl text-gray-900">{msg.patient}</h3>
                  <span className="text-sm text-gray-500 font-medium">{msg.time}</span>
                </div>

                <p className="mt-2 text-gray-700 text-[15.5px] leading-relaxed">
                  {msg.content}
                </p>

                <div className="flex gap-3 mt-4">
                  <Badge status="Active" className="bg-emerald-100 text-emerald-700 text-xs px-4 py-1">
                    ACTIVE
                  </Badge>
                  <span className="px-4 py-1 text-xs font-bold tracking-widest rounded-full bg-gray-100 text-gray-600">
                    {msg.direction.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card className="p-20 text-center text-gray-400">
          No messages in this category
        </Card>
      )}
    </div>
  );
}