// src/pages/CarePlan.tsx
import { useState } from 'react';
import Button from '../components/common/Button';
import {   Sparkles } from 'lucide-react';

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

  const toggleEdit = () => setIsEditing(!isEditing);

  const saveChanges = () => {
    setIsEditing(false);
    alert("Care Plan Saved Successfully!");
  };

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

  const updateCarePlan = (updates: any) => {
    setCarePlan(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-black">CarePlan</h1>
        <p className="text-gray-500 mt-1">Build and generate patient care plans using AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {/* Internal Tabs */}
            <div className="flex border-b mb-8">
              {['current', 'goals', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-4 font-semibold text-sm border-b-2 transition-all ${
                    activeTab === tab 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-black'
                  }`}
                >
                  {tab === 'current' ? 'Current Plan' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'current' && <CurrentPlanTab isEditing={isEditing} carePlan={carePlan} setCarePlan={updateCarePlan} />}
            {activeTab === 'goals' && <GoalsTab goals={goals} setGoals={setGoals} isEditing={isEditing} newGoal={newGoal} setNewGoal={setNewGoal} addGoal={addGoal} deleteGoal={deleteGoal} />}
            {activeTab === 'history' && <HistoryTab />}

            <div className="flex justify-end gap-4 mt-10">
              {!isEditing ? (
                <Button onClick={toggleEdit}>Edit Plan</Button>
              ) : (
                <>
                  <Button variant="outline" onClick={toggleEdit}>Cancel</Button>
                  <Button onClick={saveChanges}>Save Care Plan</Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-black">AI Assistant</h3>
            </div>

            {/* Chatbot / Document Tabs */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
              <button 
                onClick={() => setAiMode('chatbot')}
                className={`flex-1 py-3 text-sm font-medium rounded-xl ${aiMode === 'chatbot' ? 'bg-white shadow' : 'text-gray-500'}`}
              >
                Chatbot
              </button>
              <button 
                onClick={() => setAiMode('document')}
                className={`flex-1 py-3 text-sm font-medium rounded-xl ${aiMode === 'document' ? 'bg-white shadow' : 'text-gray-500'}`}
              >
                Document
              </button>
            </div>

            {aiMode === 'chatbot' ? (
              <div className="h-80 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-6">💬</div>
                <p className="font-medium text-black">Start AI Conversation</p>
                <p className="text-sm text-gray-500 mt-2">Ask anything about care plan</p>
                <Button className="mt-8 px-10">Start Chat</Button>
              </div>
            ) : (
              <div className="h-80 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4">📄</div>
                <p className="font-medium">Upload Clinical Document</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOCX, TXT supported</p>
                <Button className="mt-8">Upload Document</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}