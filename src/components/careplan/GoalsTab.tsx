// src/components/careplan/GoalsTab.tsx
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Trash2, Plus, Target } from 'lucide-react';
import Button from '../common/Button';

export default function GoalsTab({ goals, isEditing, newGoal, setNewGoal, addGoal, deleteGoal }: any) {
  return (
    <div className="space-y-4 font-sans">
      {isEditing && (
        <Card className="border-dashed border-2 border-blue-100 bg-blue-50/20 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">Goal Title</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-blue-400" placeholder="e.g. Daily SpO2" value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">Target Metric</label>
              <input type="text" className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-medium outline-none focus:border-blue-400" placeholder="e.g. > 96%" value={newGoal.target} onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })} />
            </div>
            <Button onClick={addGoal} size="sm" className="h-10 bg-blue-600 text-white font-medium border-none shadow-sm text-xs"><Plus size={14} className="mr-1.5" /> Add Goal</Button>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {goals.map((goal: any) => (
          <Card key={goal.id} noPadding className="border-slate-100 hover:border-blue-100 transition-all shadow-none">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
              <div className="flex-1 min-w-0 font-sans">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[13px] font-medium text-[#1e293b]">{goal.title}</h4>
                  <Badge status={goal.status === 'On Track' ? 'Active' : 'OOR'} className="text-[8px] font-medium" />
                </div>
                <p className="text-[11px] font-normal text-slate-500 tracking-tight">Target: <span className="text-slate-800 font-medium">{goal.target}</span></p>
              </div>

              <div className="w-full md:w-48 font-sans">
                <div className="flex justify-between text-[10px] mb-1.5 font-medium text-slate-500">
                  <span>Adherence</span>
                  <span className="text-slate-900">{goal.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${goal.status === 'On Track' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${goal.progress}%` }} />
                </div>
              </div>

              {isEditing && (
                <button onClick={() => deleteGoal(goal.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}