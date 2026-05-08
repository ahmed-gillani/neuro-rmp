// src/components/careplan/CurrentPlanTab.tsx
import Card from '../common/Card';
import { Target, Activity } from 'lucide-react';

export default function CurrentPlanTab({ isEditing, carePlan, setCarePlan }: any) {
  return (
    <div className="space-y-4 font-sans">
      {/* Background ko sakti se Gradient Blue/Navy kiya gaya hai taake white text visible ho */}
      <Card noPadding className="border-0 shadow-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white overflow-hidden">
        <div className="p-7">
          <div className="flex justify-between items-start mb-8">
            <div>
              {/* Light blue text for labels on dark background */}
              <p className="text-blue-200 text-[12px] font-medium tracking-[0.15em] uppercase opacity-90">
                Current Strategy
              </p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-2 w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-sm font-medium text-white outline-none focus:border-white transition-all"
                  value={carePlan.patientName}
                  onChange={(e) => setCarePlan({ patientName: e.target.value })}
                />
              ) : (
                <h2 className="text-2xl font-medium mt-1.5 tracking-tight text-white italic">
                  {carePlan.patientName}
                </h2>
              )}
            </div>
            {/* Status Badge with Solid Emerald for Visibility */}
            <div className="bg-emerald-500 text-white text-[12px] font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
              On Track
            </div>
          </div>

          <div className="mb-8">
            {/* Clinical Goal Section */}
            <p className="text-blue-100 text-[12px] font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
              <Target size={14} className="text-blue-300" /> Primary Clinical Goal
            </p>
            {isEditing ? (
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-sm font-medium text-white min-h-[100px] outline-none focus:border-white transition-all"
                value={carePlan.careGoal}
                onChange={(e) => setCarePlan({ careGoal: e.target.value })}
              />
            ) : (
              <p className="text-base font-normal leading-relaxed text-white">
                {carePlan.careGoal}
              </p>
            )}
          </div>

          <div>
            {/* Interventions Section */}
            <p className="text-blue-100 text-[12px] font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
              <Activity size={14} className="text-blue-300" /> Key Interventions
            </p>
            {isEditing ? (
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-sm font-medium text-white min-h-[120px] outline-none focus:border-white transition-all"
                value={carePlan.interventions}
                onChange={(e) => setCarePlan({ interventions: e.target.value })}
              />
            ) : (
              <div className="text-[14px] font-normal leading-relaxed text-blue-50/90 whitespace-pre-line bg-white/5 p-4 rounded-xl border border-white/10">
                {carePlan.interventions}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Footer Stats Row - Normal Slate Colors for Balance */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Enrollment Date', val: carePlan.startDate },
          { label: 'Quarterly Review', val: carePlan.nextReview },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[12px] font-medium uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
            <p className="text-sm font-medium text-slate-800 font-sans">{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}