import { useState } from 'react';
import Button from '../components/common/Button';
import { Edit3, Save, X } from 'lucide-react';

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
    alert('✅ Care Plan saved successfully!');
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Care Plan Management</h1>
          <p className="text-gray-600">Personalized goals • Progress tracking • AI recommendations</p>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <Button onClick={toggleEdit}>
              <Edit3 className="w-5 h-5 mr-2" />
              Edit Plan
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={toggleEdit}>
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button onClick={saveChanges}>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {['current', 'goals', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-4 font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'current' ? 'Current Plan' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      {activeTab === 'current' && (
        <CurrentPlanTab isEditing={isEditing} carePlan={carePlan} setCarePlan={setCarePlan} />
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
  );
}