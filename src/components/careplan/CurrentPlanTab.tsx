//src/components/careplan/CurrentPlanTab.tsx
import Card from '../common/Card';
type CarePlanData = {
  patientName: string;
  careGoal: string;
  interventions: string;
  startDate: string;
  nextReview: string;
};

interface CurrentPlanTabProps {
  isEditing: boolean;
  carePlan: CarePlanData;
  setCarePlan: (data: Partial<CarePlanData>) => void;
}

export default function CurrentPlanTab({ 
  isEditing, 
  carePlan, 
  setCarePlan 
}: CurrentPlanTabProps) {
  return (
    <div className="space-y-8">
      {/* Main Care Plan Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white overflow-hidden">
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-blue-200 text-xs font-bold tracking-[0.15em] uppercase">CURRENT CARE PLAN</p>
              {isEditing ? (
                <input
                  type="text"
                  className="mt-3 w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-4xl font-bold text-white outline-none focus:border-white"
                  value={carePlan.patientName}
                  onChange={(e) => setCarePlan({ patientName: e.target.value })}
                />
              ) : (
                <h2 className="text-5xl font-bold mt-2 tracking-tight">{carePlan.patientName}</h2>
              )}
            </div>

            <div className="bg-emerald-500 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg">
              ON TRACK
            </div>
          </div>

          {/* Primary Goal */}
          <div className="mb-10">
            <p className="text-blue-200 text-xs font-bold tracking-[0.15em] uppercase mb-3">PRIMARY CARE GOAL</p>
            {isEditing ? (
              <textarea
                className="w-full bg-white/10 border border-white/30 rounded-3xl p-6 text-lg text-white min-h-[110px] resize-y outline-none focus:border-white"
                value={carePlan.careGoal}
                onChange={(e) => setCarePlan({ careGoal: e.target.value })}
              />
            ) : (
              <p className="text-white text-2xl leading-tight font-medium">
                {carePlan.careGoal}
              </p>
            )}
          </div>

          {/* Key Interventions */}
          <div>
            <p className="text-blue-200 text-xs font-bold tracking-[0.15em] uppercase mb-3">KEY INTERVENTIONS</p>
            {isEditing ? (
              <textarea
                className="w-full bg-white/10 border border-white/30 rounded-3xl p-6 text-lg text-white min-h-[130px] resize-y outline-none focus:border-white"
                value={carePlan.interventions}
                onChange={(e) => setCarePlan({ interventions: e.target.value })}
              />
            ) : (
              <p className="text-blue-100 text-[17px] leading-relaxed">
                {carePlan.interventions}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 border border-gray-100">
          <p className="uppercase text-xs font-bold tracking-widest text-gray-500">Start Date</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{carePlan.startDate}</p>
        </Card>

        <Card className="p-8 border border-gray-100">
          <p className="uppercase text-xs font-bold tracking-widest text-gray-500">Next Review</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{carePlan.nextReview}</p>
        </Card>
      </div>
    </div>
  );
}