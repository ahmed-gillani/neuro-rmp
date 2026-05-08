// src/pages/Communication.tsx
import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { MessageSquare, Phone, Send, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function Communication() {
  const [activeTab, setActiveTab] = useState<'all' | 'sms' | 'calls'>('all');

  const messages = [
    { id: '1', type: 'sms', direction: 'outbound', patient: "Muhammad Ahmed", content: "Your blood pressure reading is high today. Please take medication and rest.", time: "10:45 AM" },
    { id: '2', type: 'call', direction: 'outbound', patient: "Fatima Khan", content: "Call - Discussed glucose levels (3 min)", time: "YESTERDAY" },
    { id: '3', type: 'sms', direction: 'inbound', patient: "Imran Malik", content: "I missed my morning reading. Will do it now.", time: "2 DAYS AGO" },
  ];

  return (
    <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
        <div>
          <h1 className="text-lg font-medium text-[#1e293b] tracking-tight">Patient Communication</h1>
          <p className="text-slate-400 text-[12px] font-medium uppercase tracking-widest leading-none mt-0.5">Engagement & Support History</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="h-8 bg-blue-600 text-white text-[12px] px-4 font-medium"><Send size={12} className="mr-1.5" /> New SMS</Button>
          <Button size="sm" variant="outline" className="h-8 text-[12px] px-4 font-medium border-slate-200 text-slate-600"><Phone size={12} className="mr-1.5" /> Log Call</Button>
        </div>
      </div>

      <div className="flex border-b border-slate-100 pt-2">
        {['all', 'sms', 'calls'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2.5 font-medium text-[11px] uppercase tracking-widest border-b-2 transition-all ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
          >
            {tab} messages
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {messages.filter(m => activeTab === 'all' || m.type === activeTab).map((msg) => (
          <Card key={msg.id} noPadding className="border-slate-100 shadow-none hover:border-blue-100 transition-all">
            <div className="flex gap-4 p-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.type === 'sms' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                {msg.type === 'sms' ? <MessageSquare size={18} /> : <Phone size={18} />}
              </div>

              <div className="flex-1 min-w-0 font-sans">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[13px] font-medium text-[#1e293b] leading-none">{msg.patient}</h3>
                  <span className="text-[12px] text-slate-400 font-medium">{msg.time}</span>
                </div>

                <p className="text-[11px] font-normal text-slate-600 leading-normal italic">"{msg.content}"</p>

                <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-slate-50">
                  <Badge status="Active" className="text-[8px] font-medium px-2 py-0" />
                  <div className="flex items-center gap-1">
                    {msg.direction === 'outbound' ? <ArrowUpRight size={10} className="text-blue-500" /> : <ArrowDownLeft size={10} className="text-emerald-500" />}
                    <span className="text-[9px] font-medium text-slate-400 uppercase tracking-tighter">{msg.direction}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}