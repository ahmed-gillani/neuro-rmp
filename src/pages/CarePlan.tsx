// src/pages/CarePlan.tsx
import { useState } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card'; // Fixed: Added missing Card import
import { Sparkles } from 'lucide-react';
import CurrentPlanTab from '../components/careplan/CurrentPlanTab';
import GoalsTab from '../components/careplan/GoalsTab';
import HistoryTab from '../components/careplan/HistoryTab';

export default function CarePlan() {
  const [activeTab, setActiveTab] = useState<'current' | 'goals' | 'history'>('current');
  const [isEditing, setIsEditing] = useState(false);
  const [aiMode, setAiMode] = useState<'chatbot' | 'document'>('chatbot');

  const [carePlan, setCarePlan] = useState({
    patientName: "Alex Morgan",
    careGoal: "Maintain daily symptom control, reduce COPD exacerbations, and support diabetes self-management.",
    interventions: "1. Remote vitals monitoring\n2. Medication adherence coaching\n3. Weekly telehealth check-ins\n4. Dietary and activity guidance",
    startDate: "2026-03-15",
    nextReview: "2026-05-15",
  });

  const [goals, setGoals] = useState([
    { id: 'g1', title: 'Blood Pressure Control', target: '< 130/80 mmHg', progress: 78, status: 'On Track' as const },
    { id: 'g2', title: 'Daily Glucose Monitoring', target: '80-130 mg/dL', progress: 45, status: 'Needs Attention' as const },
  ]);

  const [newGoal, setNewGoal] = useState({ title: '', target: '' });

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    setGoals([...goals, { 
      id: Date.now().toString(), 
      title: newGoal.title, 
      target: newGoal.target || "No target set", 
      progress: 0, 
      status: 'On Track' 
    }]);
    setNewGoal({ title: '', target: '' });
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="w-full space-y-4 font-sans animate-in fade-in duration-500">
      {/* Header - Darker Slates for Visibility */}
      <div className="px-1">
        <h1 className="text-xl font-medium text-[#0f172a] tracking-tight">Care Plan Builder</h1>
        <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider mt-0.5">Generate strategy with clinical AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Content Area */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-100 bg-slate-50/30 font-sans">
              {['current', 'goals', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-3 font-medium text-[11px] uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === tab ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-800'
                  }`}
                >
                  {tab === 'current' ? 'Current Plan' : tab}
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === 'current' && (
                <CurrentPlanTab 
                  isEditing={isEditing} 
                  carePlan={carePlan} 
                  setCarePlan={(u: any) => setCarePlan({...carePlan, ...u})} 
                />
              )}
              {activeTab === 'goals' && (
                <GoalsTab 
                  goals={goals} 
                  isEditing={isEditing} 
                  newGoal={newGoal} 
                  setNewGoal={setNewGoal} 
                  addGoal={addGoal} 
                  deleteGoal={deleteGoal} 
                />
              )}
              {activeTab === 'history' && <HistoryTab />}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-slate-50">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} size="sm" className="h-8 bg-blue-600 text-white text-[11px] px-6 font-medium border-none shadow-sm">
                    Edit Care Plan
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="h-8 text-[11px] font-medium border-slate-200 text-slate-600">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditing(false)} size="sm" className="h-8 bg-[#0f172a] text-white text-[11px] px-4 font-medium border-none shadow-sm">
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-5">
          <Card className="lg:sticky lg:top-4 border-slate-100 shadow-sm p-5 h-fit">
            <div className="flex items-center gap-3 mb-5 font-sans">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Sparkles size={18} />
              </div>
              <h3 className="font-medium text-sm text-[#1e293b]">Clinical AI Assistant</h3>
            </div>

            {/* AI Toggle */}
            <div className="flex bg-slate-100/80 rounded-lg p-1 mb-6">
              <button onClick={() => setAiMode('chatbot')} className={`flex-1 py-1.5 text-[10px] font-medium rounded-md uppercase transition-all ${aiMode === 'chatbot' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Chatbot</button>
              <button onClick={() => setAiMode('document')} className={`flex-1 py-1.5 text-[10px] font-medium rounded-md uppercase transition-all ${aiMode === 'document' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Document</button>
            </div>

            <div className="h-64 border border-slate-100 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-6 transition-all font-sans">
               <p className="text-[11px] font-medium text-slate-800 uppercase tracking-widest">{aiMode === 'chatbot' ? '💬 Direct Consultation' : '📄 Health Data Analysis'}</p>
               <p className="text-[10px] text-slate-500 mt-2 max-w-[200px] leading-relaxed">
                 {aiMode === 'chatbot' 
                   ? 'Ask questions about clinical guidelines or patient goal optimization.' 
                   : 'Upload medical history or health reports to generate a data-driven plan.'}
               </p>
               <Button size="sm" className="mt-6 h-9 bg-[#0f172a] text-white text-[11px] px-8 font-medium border-none shadow-sm hover:bg-slate-800">
                 Initialize AI
               </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}