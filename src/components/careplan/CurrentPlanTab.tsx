// import Card from '../common/Card';
// import Button from '../common/Button';
// import { useState } from 'react';

// type CarePlanData = {
//   patientName: string;
//   careGoal: string;
//   interventions: string;
//   startDate: string;
//   nextReview: string;
// };

// interface CurrentPlanTabProps {
//   isEditing: boolean;
//   carePlan: CarePlanData;
//   setCarePlan: (data: CarePlanData) => void;
// }

// export default function CurrentPlanTab({ isEditing, carePlan, setCarePlan }: CurrentPlanTabProps) {
//   return (
//     <Card>
//       <div className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium mb-2">Patient Name</label>
//           {isEditing ? (
//             <input
//               type="text"
//               className="w-full border border-black-300 rounded-xl p-3"
//               value={carePlan.patientName}
//               onChange={(e) => setCarePlan({ ...carePlan, patientName: e.target.value })}
//             />
//           ) : (
//             <p className="font-semibold text-lg">{carePlan.patientName}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Primary Care Goal</label>
//           {isEditing ? (
//             <textarea
//               className="w-full border border-black-300 rounded-xl p-3 h-24"
//               value={carePlan.careGoal}
//               onChange={(e) => setCarePlan({ ...carePlan, careGoal: e.target.value })}
//             />
//           ) : (
//             <p className="text-gray-700">{carePlan.careGoal}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Interventions</label>
//           {isEditing ? (
//             <textarea
//               className="w-full border border-black-300 rounded-xl p-3 h-32"
//               value={carePlan.interventions}
//               onChange={(e) => setCarePlan({ ...carePlan, interventions: e.target.value })}
//             />
//           ) : (
//             <p className="text-gray-700">{carePlan.interventions}</p>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }


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
  setCarePlan: (data: CarePlanData) => void;
}

export default function CurrentPlanTab({ isEditing, carePlan, setCarePlan }: CurrentPlanTabProps) {
  return (
    <div className="space-y-6">
      {/* Dark Blue Card - Dono modes mein same style */}
      <Card className="bg-[#1e3a8a] text-white border-0 p-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm text-white/70">CURRENT CARE PLAN</p>

            {isEditing ? (
              <input
                type="text"
                className="w-full mt-3 bg-transparent border border-white/30 rounded-2xl p-4 text-2xl font-semibold text-white focus:border-white/50 outline-none"
                value={carePlan.patientName}
                onChange={(e) => setCarePlan({ ...carePlan, patientName: e.target.value })}
              />
            ) : (
              <h3 className="text-3xl font-semibold mt-2">{carePlan.patientName}</h3>
            )}

            {/* Care Goal */}
            <div className="mt-8">
              <p className="text-sm text-white/70 mb-2">PRIMARY CARE GOAL</p>
              {isEditing ? (
                <textarea
                  className="w-full bg-transparent border border-white/30 rounded-2xl p-4 text-white min-h-[110px]"
                  value={carePlan.careGoal}
                  onChange={(e) => setCarePlan({ ...carePlan, careGoal: e.target.value })}
                />
              ) : (
                <p className="text-white/90 leading-relaxed">{carePlan.careGoal}</p>
              )}
            </div>
          </div>

          <div>
            <span className="inline-block bg-green-500 text-white text-sm px-5 py-1.5 rounded-full font-medium">
              On Track
            </span>
          </div>
        </div>

        {/* Interventions */}
        <div className="mt-10 pt-6 border-t border-white/20">
          <p className="text-sm text-white/70 mb-3">KEY INTERVENTIONS</p>
          {isEditing ? (
            <textarea
              className="w-full bg-transparent border border-white/30 rounded-2xl p-4 text-white min-h-[130px]"
              value={carePlan.interventions}
              onChange={(e) => setCarePlan({ ...carePlan, interventions: e.target.value })}
            />
          ) : (
            <p className="text-white/90 leading-relaxed">{carePlan.interventions}</p>
          )}
        </div>
      </Card>

      {/* Extra Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <p className="text-sm text-gray-500">Start Date</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{carePlan.startDate}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Next Review</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{carePlan.nextReview}</p>
        </Card>
      </div>
    </div>
  );
}