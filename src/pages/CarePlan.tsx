//src/pages/CarePlan.tsx
import { useState } from 'react';
import Button from '../components/common/Button';
import { Edit3, Save, X, Activity } from 'lucide-react';

// Import Tab Components
import CurrentPlanTab from '../components/careplan/CurrentPlanTab';
import GoalsTab from '../components/careplan/GoalsTab';
import HistoryTab from '../components/careplan/HistoryTab';

export default function CarePlan() {
  const [activeTab, setActiveTab] = useState<'current' | 'goals' | 'history'>('current');
  const [isEditing, setIsEditing] = useState(false);

  const [carePlan, setCarePlan] = useState({
    patientName: "Muhammad Ahmed",
    careGoal: "Maintain Blood Pressure below 130/80 mmHg",
    interventions: "Daily BP monitoring, medication adherence, low sodium diet",
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
    // In a real app, you'd trigger an API call here
    console.log('Saving Plan:', { carePlan, goals });
  };

  const addGoal = () => {
    if (!newGoal.title) return;
    setGoals([...goals, {
      id: Date.now().toString(),
      title: newGoal.title,
      target: newGoal.target,
      progress: 0,
      status: 'On Track'
    }]);
    setNewGoal({ title: '', target: '' });
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
            <Activity size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Care Plan Management</h1>
            <p className="text-gray-500 font-medium">Personalized goals • Progress tracking • AI recommendations</p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {!isEditing ? (
            <Button onClick={toggleEdit} className="flex-1 md:flex-none shadow-md">
              <Edit3 className="w-5 h-5 mr-2" />
              Edit Plan
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={toggleEdit} className="flex-1 md:flex-none">
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button onClick={saveChanges} className="flex-1 md:flex-none shadow-lg shadow-primary-200">
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
        {['current', 'goals', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-10 py-5 font-bold text-sm tracking-wide uppercase border-b-4 transition-all whitespace-nowrap ${activeTab === tab
                ? 'border-primary-600 text-primary-600 bg-primary-50/30'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
          >
            {tab === 'current' ? 'Current Plan' : tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div className="transition-all duration-300 ease-in-out">
        {activeTab === 'current' && (
          <CurrentPlanTab
            isEditing={isEditing}
            carePlan={carePlan}
            setCarePlan={setCarePlan}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsTab
            goals={goals}
            setGoals={setGoals}
            isEditing={isEditing}
            newGoal={newGoal}
            setNewGoal={setNewGoal}
            addGoal={addGoal}
            deleteGoal={deleteGoal}
          />
        )}

        {activeTab === 'history' && <HistoryTab />}
      </div>
    </div>
  );
}