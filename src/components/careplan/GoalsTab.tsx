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
      {isEditing && (
        <Card className="border-dashed border-2 border-blue-200 bg-blue-50/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-800">Goal Title</label>
              <input
                type="text"
                className="w-full p-4 rounded-2xl border border-gray-300 focus:border-blue-500 outline-none"
                placeholder="e.g. Blood Sugar Level"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-800">Target</label>
              <input
                type="text"
                className="w-full p-4 rounded-2xl border border-gray-300 focus:border-blue-500 outline-none"
                placeholder="e.g. < 140 mg/dL"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              />
            </div>
            <Button onClick={addGoal} className="h-[54px]">
              <Plus className="w-5 h-5 mr-2" /> Add Goal
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-md transition-all border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-1">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-semibold text-gray-900">{goal.title}</h4>
                  <Badge variant={goal.status === 'On Track' ? 'success' : 'warning'}>
                    {goal.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  Target: <span className="font-medium text-gray-900">{goal.target}</span>
                </p>
              </div>

              <div className="w-full md:w-64">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">Progress</span>
                  <span className="font-semibold text-gray-900">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${goal.status === 'On Track' ? 'bg-green-500' : 'bg-amber-500'}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-xl"
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