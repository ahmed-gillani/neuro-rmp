import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Trash2 } from 'lucide-react';

type Goal = {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: 'On Track' | 'Needs Attention' | 'Completed';
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
  setGoals,
  isEditing,
  newGoal,
  setNewGoal,
  addGoal,
  deleteGoal,
}: GoalsTabProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Active Goals</h3>
        {isEditing && (
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Target"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
            />
            <Button onClick={addGoal} size="sm">Add Goal</Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border border-gray-200 rounded-2xl p-6 flex justify-between items-center">
            <div className="flex-1">
              <p className="font-semibold">{goal.title}</p>
              <p className="text-sm text-black-500">Target: {goal.target}</p>
            </div>
            <div className="text-right flex items-center gap-4">
              <div>
                <p className="text-3xl font-bold text-primary-600">{goal.progress}%</p>
                <Badge status={goal.status} />
              </div>
              {isEditing && (
                <Button variant="danger" size="sm" onClick={() => deleteGoal(goal.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}