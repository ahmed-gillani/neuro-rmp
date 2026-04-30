// src/components/careplan/GoalsTab.tsx
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Trash2, Plus } from 'lucide-react';
import Button from '../common/Button';

type Goal = {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: 'On Track' | 'Needs Attention';
};

interface GoalsTabProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  isEditing: boolean;
  newGoal: { title: string; target: string };
  setNewGoal: (goal: { title: string; target: string }) => void;
  addGoal: () => void;
  deleteGoal: (id: string) => void;
}

export default function GoalsTab({
  goals,
  isEditing,
  newGoal,
  setNewGoal,
  addGoal,
  deleteGoal
}: GoalsTabProps) {
  return (
    <div className="space-y-6">
      {/* Add New Goal Section - Visible only in Edit Mode */}
      {isEditing && (
        <Card className="border-dashed border-2 border-primary-200 bg-primary-50/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Goal Title</label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 outline-none focus:border-primary-500 font-medium"
                placeholder="e.g. Blood Sugar Level"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Target</label>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 outline-none focus:border-primary-500 font-medium"
                placeholder="e.g. < 140 mg/dL"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              />
            </div>
            <Button onClick={addGoal} className="h-[52px] w-full md:w-auto shadow-lg shadow-primary-100">
              <Plus className="w-5 h-5 mr-2" /> Add Goal
            </Button>
          </div>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-md transition-all duration-200 group border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-xl font-black text-gray-900 tracking-tight">{goal.title}</h4>

                  {/* Fixed: Logic to map status to Badge variant */}
                  <Badge variant={goal.status === 'On Track' ? 'success' : 'warning'}>
                    {goal.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Target: <span className="text-primary-600 font-black">{goal.target}</span>
                </p>
              </div>

              {/* Progress Section */}
              <div className="w-full md:w-72 space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em]">Progress</span>
                  <span className="text-lg font-black text-gray-900">{goal.progress}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ease-out ${goal.status === 'On Track' ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}