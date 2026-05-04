// // //src/components/careplan/CurrentPlanTab.tsx
// import Card from '../common/Card';
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
//     <div className="space-y-6">
//       {/* 
//          Using 'noPadding' from our Card update to kill that white inner-box 
//          and '!text-white' to ensure visibility on the blue background.
//       */}
//       <Card noPadding className="bg-[#1e3a8a] text-white border-0 shadow-2xl relative overflow-hidden">
//         <div className="p-8 md:p-10 relative z-10">
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <p className="text-[11px] font-black tracking-[0.2em] text-white/50 uppercase">
//                 Current Care Plan
//               </p>

//               {isEditing ? (
//                 <input
//                   type="text"
//                   className="w-full mt-4 bg-white/10 border border-white/20 rounded-2xl p-4 text-3xl font-black text-white outline-none focus:border-white/40"
//                   value={carePlan.patientName}
//                   onChange={(e) => setCarePlan({ ...carePlan, patientName: e.target.value })}
//                 />
//               ) : (
//                 <h3 className="text-4xl font-black tracking-tight mt-2 text-white">
//                   {carePlan.patientName}
//                 </h3>
//               )}
//             </div>

//             <span className="bg-green-500 text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg border border-white/10">
//               On Track
//             </span>
//           </div>

//           <div className="mt-10 pt-8 border-t border-white/10">
//             <p className="text-[11px] font-black tracking-[0.2em] text-white/50 uppercase mb-4">
//               Primary Care Goal
//             </p>
//             {isEditing ? (
//               <textarea
//                 className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white min-h-[100px] outline-none"
//                 value={carePlan.careGoal}
//                 onChange={(e) => setCarePlan({ ...carePlan, careGoal: e.target.value })}
//               />
//             ) : (
//               <p className="text-white/90 text-xl leading-relaxed font-medium">
//                 {carePlan.careGoal}
//               </p>
//             )}
//           </div>

//           <div className="mt-8">
//             <p className="text-[11px] font-black tracking-[0.2em] text-white/50 uppercase mb-4">
//               Key Interventions
//             </p>
//             {isEditing ? (
//               <textarea
//                 className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white min-h-[120px] outline-none"
//                 value={carePlan.interventions}
//                 onChange={(e) => setCarePlan({ ...carePlan, interventions: e.target.value })}
//               />
//             ) : (
//               <p className="text-white/80 leading-relaxed font-medium text-lg">
//                 {carePlan.interventions}
//               </p>
//             )}
//           </div>
//         </div>
//       </Card>

//       {/* Stats Cards - Matching the Dashboard Look */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="border-gray-100 shadow-sm">
//           <p className="text-[11px] font-black text-gray-700 uppercase tracking-[0.2em] mb-2">Start Date</p>
//           <p className="text-2xl font-black text-gray-900">{carePlan.startDate}</p>
//         </Card>
//         <Card className="border-gray-100 shadow-sm">
//           <p className="text-[11px] font-black text-gray-700 uppercase tracking-[0.2em] mb-2">Next Review</p>
//           <p className="text-2xl font-black text-gray-900">{carePlan.nextReview}</p>
//         </Card>
//       </div>
//     </div>
//   );
// }


// src/components/careplan/CurrentPlanTab.tsx
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
  setCarePlan: (data: Partial<CarePlanData>) => void;   // Updated to accept partial
}

export default function CurrentPlanTab({ 
  isEditing, 
  carePlan, 
  setCarePlan 
}: CurrentPlanTabProps) {
  return (
    <div className="space-y-6">
      <Card noPadding className="bg-[#1e3a8a] !text-white border-0 shadow-2xl relative overflow-hidden">
        <div className="p-8 md:p-10 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[11px] font-black tracking-[0.2em] text-white/50 uppercase">
                Current Care Plan
              </p>

              {isEditing ? (
                <input
                  type="text"
                  className="w-full mt-4 bg-white/10 border border-white/20 rounded-2xl p-4 text-3xl font-black text-white outline-none focus:border-white/40"
                  value={carePlan.patientName}
                  onChange={(e) => setCarePlan({ patientName: e.target.value })}
                />
              ) : (
                <h3 className="text-4xl font-black tracking-tight mt-2 text-white">
                  {carePlan.patientName}
                </h3>
              )}
            </div>

            <span className="bg-green-500 text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg border border-white/10">
              On Track
            </span>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-[11px] font-black tracking-[0.2em] text-white/50 uppercase mb-4">
              Primary Care Goal
            </p>
            {isEditing ? (
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white min-h-[100px] outline-none"
                value={carePlan.careGoal}
                onChange={(e) => setCarePlan({ careGoal: e.target.value })}
              />
            ) : (
              <p className="text-white/90 text-xl leading-relaxed font-medium">
                {carePlan.careGoal}
              </p>
            )}
          </div>

          <div className="mt-8">
            <p className="text-[11px] font-black tracking-[0.2em] text-white/50 uppercase mb-4">
              Key Interventions
            </p>
            {isEditing ? (
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white min-h-[120px] outline-none"
                value={carePlan.interventions}
                onChange={(e) => setCarePlan({ interventions: e.target.value })}
              />
            ) : (
              <p className="text-white/80 leading-relaxed font-medium text-lg">
                {carePlan.interventions}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-100 shadow-sm">
          <p className="text-[11px] font-black text-gray-700 uppercase tracking-[0.2em] mb-2">Start Date</p>
          <p className="text-2xl font-black text-gray-900">{carePlan.startDate}</p>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <p className="text-[11px] font-black text-gray-700 uppercase tracking-[0.2em] mb-2">Next Review</p>
          <p className="text-2xl font-black text-gray-900">{carePlan.nextReview}</p>
        </Card>
      </div>
    </div>
  );
}