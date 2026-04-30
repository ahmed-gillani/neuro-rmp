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
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Communication</h1>
          <p className="text-gray-500 font-medium mt-1">SMS • Calls • Patient Engagement</p>
        </div>
        <div className="flex gap-3">
          <Button variant='outline' className="shadow-sm">
            <Send className="w-4 h-4 mr-2" />
            New SMS
          </Button>
          <Button variant="outline" className="shadow-sm">
            <Phone className="w-4 h-4 mr-2" />
            Log Call
          </Button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex border-b border-gray-200">
        {['all', 'sms', 'calls'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 font-bold text-sm tracking-wide uppercase border-b-4 transition-all ${activeTab === tab
                ? 'border-primary-600 text-primary-600 bg-primary-50/30'
                : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
          >
            {tab === 'all' ? 'All Messages' : tab}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <Card key={msg.id} className="bg-[#1e3a8a] text-white border-0 p-6 shadow-xl hover:bg-[#1e3a8a]/95 transition-all group">
            <div className="flex gap-5">
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 ${msg.type === 'sms' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                {msg.type === 'sms' ? <MessageSquare size={28} /> : <Phone size={28} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-lg text-white">{msg.patient}</p>
                  <p className="text-xs font-medium text-white/50 tracking-tighter uppercase">{msg.time}</p>
                </div>

                {/* Message Content with improved typography */}
                <p className="text-white/90 mt-3 text-[16px] leading-relaxed font-medium max-w-2xl">
                  {msg.content}
                </p>

                <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10">
                  <Badge
                    status={msg.status === 'answered' || msg.status === 'delivered' ? "Active" : "New"}
                    className="bg-white/20 text-white border-0 px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                  />
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span className="text-[11px] text-white/60 font-bold uppercase tracking-widest">{msg.direction}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'SMS Sent This Week', value: '47', color: 'text-gray-900' },
          { label: 'Calls Logged', value: '18', color: 'text-gray-900' },
          { label: 'Response Rate', value: '89%', color: 'text-green-600' }
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <p className={`text-5xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
            <p className="text-xs font-bold text-gray-700 mt-3 uppercase tracking-widest">{stat.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}