// //src/pages/PatientOnboarding.tsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Card from '../components/common/Card';
// import Button from '../components/common/Button';
// import type { Patient } from '../types';

// type OnboardingStep = 'demographics' | 'insurance' | 'assignment' | 'review';

// export default function PatientOnboarding() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState<OnboardingStep>('demographics');

//   // UAE defaults added to formData
//   const [formData, setFormData] = useState<Partial<Patient>>({
//     status: 'New',
//     enrollmentDate: new Date().toISOString().split('T')[0],
//     phone: '+971 ',
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const updateField = (field: keyof Patient, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const validateStep = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     // Only validate if we are on demographics step
//     if (step === 'demographics') {
//       // Agar aap chahte hain k bagair naam k bhi agay chala jaye, 
//       // toh in lines ko comment out kar dein:
//       if (!formData.name?.trim()) newErrors.name = 'Full name is required';
//       if (!formData.phone || formData.phone.length < 5) newErrors.phone = 'Phone is required';
//     }

//     setErrors(newErrors);
//     // Agar koi error nahi hai, tabhi 'true' return hoga
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     // TIP: Validation check ko 'if (true)' kar dene se button hamesha kaam karega
//     if (validateStep()) {
//       const steps: OnboardingStep[] = ['demographics', 'insurance', 'assignment', 'review'];
//       const currentIndex = steps.indexOf(step);
//       if (currentIndex < steps.length - 1) {
//         setStep(steps[currentIndex + 1]);
//       }
//     }
//   };

//   const prevStep = () => {
//     const steps: OnboardingStep[] = ['demographics', 'insurance', 'assignment', 'review'];
//     const currentIndex = steps.indexOf(step);
//     if (currentIndex > 0) {
//       setStep(steps[currentIndex - 1]);
//     }
//   };

//   const steps = [
//     { id: 'demographics', label: 'Demographics' },
//     { id: 'insurance', label: 'Insurance' },
//     { id: 'assignment', label: 'Care Team' },
//     { id: 'review', label: 'Review' },
//   ];

//   const currentIndex = steps.findIndex(s => s.id === step);

//   return (
//     <div className="max-w-3xl mx-auto pb-6">
//       <h1 className="hero-title font-black text-gray-900 mb-2 tracking-tight">Patient Onboarding</h1>
//       <p className="text-sm font-bold text-gray-700 uppercase tracking-[0.2em] mb-8">
//         Step {currentIndex + 1} of {steps.length}: {steps[currentIndex].label}
//       </p>

//       {/* Progress Bar */}
//       <div className="flex gap-3 mb-10">
//         {steps.map((s, i) => (
//           <div
//             key={s.id}
//             className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${i <= currentIndex ? 'bg-blue-600' : 'bg-gray-100'
//               }`}
//           />
//         ))}
//       </div>

//       <Card className="p-8 border-none shadow-xl shadow-blue-900/5">
//         {step === 'demographics' && (
//           <div className="space-y-6">
//             <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Basic Information</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Full Name</label>
//                 <input
//                   type="text"
//                   className={`w-full p-4 rounded-2xl border text-gray-900 ${errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-300 bg-gray-50/50'} outline-none focus:border-blue-500 transition-all font-medium`}
//                   value={formData.name || ''}
//                   onChange={(e) => updateField('name', e.target.value)}
//                   placeholder="e.g. Ahmed Ali"
//                 />
//                 {errors.name && <p className="text-[12px] text-red-500 font-black uppercase tracking-tight">{errors.name}</p>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Phone Number</label>
//                 <input
//                   type="text"
//                   className={`w-full p-4 rounded-2xl border text-gray-900 ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-300 bg-gray-50/50'} outline-none focus:border-blue-500 transition-all font-medium`}
//                   value={formData.phone || ''}
//                   onChange={(e) => updateField('phone', e.target.value)}
//                 />
//                 {errors.phone && <p className="text-[12px] text-red-500 font-black uppercase tracking-tight">{errors.phone}</p>}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Temporary View for Middle Steps */}
//         {(step === 'insurance' || step === 'assignment') && (
//           <div className="py-20 text-center space-y-4">
//             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <span className="text-2xl font-bold">{currentIndex + 1}</span>
//             </div>
//             <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest italic">{step} Details</h2>
//             <p className="text-gray-700 max-w-xs mx-auto text-sm font-medium">This section is ready for your custom form fields.</p>
//           </div>
//         )}

//         {step === 'review' && (
//           <div className="space-y-6">
//             <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Final Review</h2>
//             <div className="bg-gray-900 p-8 rounded-[2rem] border border-gray-800 shadow-2xl">
//               <pre className="text-[11px] font-mono text-blue-300 leading-relaxed overflow-auto max-h-60">
//                 {JSON.stringify(formData, null, 2)}
//               </pre>
//             </div>
//             <p className="text-xs text-gray-700 text-center font-medium uppercase tracking-widest">Please verify all patient data before enrollment</p>
//           </div>
//         )}
//       </Card>

//       {/* Navigation Controls */}
//       <div className="flex justify-between mt-10 gap-4">
//         <Button
//           variant="outline"
//           onClick={currentIndex === 0 ? () => navigate('/patients') : prevStep}
//           className="px-4 sm:px-6 border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all rounded-2xl"
//         >
//           {currentIndex === 0 ? 'Cancel' : '← Back'}
//         </Button>

//         <Button
//           onClick={step === 'review' ? () => navigate('/patients') : nextStep}
//           className="px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 rounded-2xl py-3"
//         >
//           {step === 'review' ? 'Complete Enrollment' : 'Continue →'}
//         </Button>
//       </div>
//     </div>
//   );
// }

// src/pages/PatientOnboarding.tsx
// ─────────────────────────────────────────────────────────────────────────────
// 4-step onboarding wizard powered by useOnboarding hook.
// All state management, validation, and API calls are in the hook —
// this file is pure UI only.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useOnboarding } from '../hooks/useOnboarding';
import { availablePrograms } from '../mocks/mockPatientData';
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const STEPS = [
  { id: 'demographics', label: 'Demographics' },
  { id: 'insurance',    label: 'Insurance' },
  { id: 'program',      label: 'Care Program' },
  { id: 'documents',    label: 'Documents' },
  { id: 'review',       label: 'Review' },
] as const;

export default function PatientOnboarding() {
  const {
    currentStep,
    currentIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    form,
    errors,
    isSubmitting,
    submitError,
    next,
    back,
    goToStep,
    updateDemographics,
    updateInsurance,
    updateProgram,
    addDiagnosis,
    removeDiagnosis,
    addPendingFile,
    removePendingFile,
    submit,
  } = useOnboarding();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Shared input styles ───────────────────────────────────────────────────

  const inputCls = (fieldName: string) =>
    `w-full p-4 rounded-2xl border text-gray-900 outline-none transition-all font-medium text-sm
    ${errors[fieldName]
      ? 'border-red-400 bg-red-50/30 focus:border-red-500'
      : 'border-gray-200 bg-gray-50/50 focus:border-blue-500'}`;

  const labelCls = 'text-[11px] font-black text-gray-700 uppercase tracking-widest';
  const errorCls = 'text-[11px] text-red-500 font-semibold uppercase tracking-tight mt-1';

  // ── Step content ──────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (currentStep) {

      // ── Step 1: Demographics ──────────────────────────────────────────────
      case 'demographics':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelCls}>Full Name *</label>
                <input
                  className={inputCls('name')}
                  value={form.demographics.name ?? ''}
                  onChange={(e) => updateDemographics('name', e.target.value)}
                  placeholder="e.g. Ahmed Ali"
                />
                {errors.name && <p className={errorCls}>{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Date of Birth *</label>
                <input
                  type="date"
                  className={inputCls('dob')}
                  value={form.demographics.dob ?? ''}
                  onChange={(e) => updateDemographics('dob', e.target.value)}
                />
                {errors.dob && <p className={errorCls}>{errors.dob}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Gender *</label>
                <select
                  className={inputCls('gender')}
                  value={form.demographics.gender ?? ''}
                  onChange={(e) => updateDemographics('gender', e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className={errorCls}>{errors.gender}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Phone Number *</label>
                <input
                  className={inputCls('phone')}
                  value={form.demographics.phone ?? ''}
                  onChange={(e) => updateDemographics('phone', e.target.value)}
                  placeholder="+92 300 1234567"
                />
                {errors.phone && <p className={errorCls}>{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  className={inputCls('email')}
                  value={form.demographics.email ?? ''}
                  onChange={(e) => updateDemographics('email', e.target.value)}
                  placeholder="patient@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Address</label>
                <input
                  className={inputCls('address')}
                  value={form.demographics.address ?? ''}
                  onChange={(e) => updateDemographics('address', e.target.value)}
                  placeholder="Street, City"
                />
              </div>
            </div>
          </div>
        );

      // ── Step 2: Insurance ─────────────────────────────────────────────────
      case 'insurance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Insurance Details</h2>
              <span className="text-xs text-gray-400 font-medium">Optional — can be added later</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelCls}>Insurance Provider</label>
                <input
                  className={inputCls('provider')}
                  value={form.insurance.provider ?? ''}
                  onChange={(e) => updateInsurance('provider', e.target.value)}
                  placeholder="e.g. State Life Insurance"
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Plan Type</label>
                <select
                  className={inputCls('planType')}
                  value={form.insurance.planType ?? ''}
                  onChange={(e) => updateInsurance('planType', e.target.value)}
                >
                  <option value="">Select plan type</option>
                  {['HMO', 'PPO', 'Medicare', 'Medicaid', 'Self-Pay', 'Other'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.planType && <p className={errorCls}>{errors.planType}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Member ID</label>
                <input
                  className={inputCls('memberId')}
                  value={form.insurance.memberId ?? ''}
                  onChange={(e) => updateInsurance('memberId', e.target.value)}
                  placeholder="e.g. SLI-78432-A"
                />
                {errors.memberId && <p className={errorCls}>{errors.memberId}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Group Number</label>
                <input
                  className={inputCls('groupNumber')}
                  value={form.insurance.groupNumber ?? ''}
                  onChange={(e) => updateInsurance('groupNumber', e.target.value)}
                  placeholder="e.g. GRP-2024"
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Effective Date</label>
                <input
                  type="date"
                  className={inputCls('effectiveDate')}
                  value={form.insurance.effectiveDate ?? ''}
                  onChange={(e) => updateInsurance('effectiveDate', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelCls}>Expiry Date</label>
                <input
                  type="date"
                  className={inputCls('expiryDate')}
                  value={form.insurance.expiryDate ?? ''}
                  onChange={(e) => updateInsurance('expiryDate', e.target.value)}
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center font-medium">
              Eligibility verification will be triggered automatically after enrollment.
            </p>
          </div>
        );

      // ── Step 3: Program ───────────────────────────────────────────────────
      case 'program':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Care Program</h2>

            {/* Program selector */}
            <div className="space-y-3">
              <label className={labelCls}>Select RPM Program *</label>
              {errors.program && <p className={errorCls}>{errors.program}</p>}
              {availablePrograms.map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => updateProgram('selectedProgramId', prog.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.program.selectedProgramId === prog.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-wide">{prog.code} — {prog.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{prog.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {prog.billingCodes.map((code) => (
                          <span key={code} className="text-[10px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            {code}
                          </span>
                        ))}
                      </div>
                    </div>
                    {form.program.selectedProgramId === prog.id && (
                      <CheckCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Diagnoses */}
            <div className="space-y-2">
              <label className={labelCls}>Primary Diagnoses (ICD-10) *</label>
              {errors.diagnoses && <p className={errorCls}>{errors.diagnoses}</p>}
              <div className="flex gap-2">
                <input
                  id="diagnosis-input"
                  className={`flex-1 ${inputCls('diagnosis')}`}
                  placeholder="e.g. I10, E11.9"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim().toUpperCase();
                      if (val) { addDiagnosis(val); (e.target as HTMLInputElement).value = ''; }
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const inp = document.getElementById('diagnosis-input') as HTMLInputElement;
                    const val = inp.value.trim().toUpperCase();
                    if (val) { addDiagnosis(val); inp.value = ''; }
                  }}
                  size="sm"
                  className="bg-gray-900 text-white border-none rounded-2xl px-5"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.program.primaryDiagnoses.map((code) => (
                  <span key={code} className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                    {code}
                    <button onClick={() => removeDiagnosis(code)} className="text-blue-400 hover:text-blue-700">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-gray-400">Press Enter or click Add after each code</p>
            </div>
          </div>
        );

      // ── Step 4: Documents ─────────────────────────────────────────────────
      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Upload Documents</h2>
              <span className="text-xs text-gray-400 font-medium">Optional — PDF or Image</span>
            </div>

            {/* Drop zone */}
            <div
              className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                Array.from(e.dataTransfer.files).forEach(addPendingFile);
              }}
            >
              <Upload size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-bold text-gray-600">Drop files here or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — Max 20MB each</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,image/*"
                multiple
                onChange={(e) => Array.from(e.target.files ?? []).forEach(addPendingFile)}
              />
            </div>

            {/* Pending files list */}
            {form.documents.pendingUploads.length > 0 && (
              <div className="space-y-2">
                {form.documents.pendingUploads.map((file, i) => (
                  <div
                    key={`${file.name}-${i}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{file.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {(file.size / 1_000_000).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removePendingFile(i)}
                      className="text-gray-300 hover:text-rose-500 transition-colors p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 text-center">
              Documents will be processed by AI after enrollment to extract patient data automatically.
            </p>
          </div>
        );

      // ── Step 5: Review ────────────────────────────────────────────────────
      case 'review':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Final Review</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Demographics summary */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Demographics</p>
                {Object.entries(form.demographics).map(([k, v]) =>
                  v ? (
                    <div key={k} className="flex justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500 capitalize">{k}</span>
                      <span className="font-semibold text-slate-800">{String(v)}</span>
                    </div>
                  ) : null
                )}
              </div>

              {/* Insurance summary */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Insurance</p>
                {form.insurance.provider ? (
                  <>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-500">Provider</span>
                      <span className="font-semibold text-slate-800">{form.insurance.provider}</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-500">Plan</span>
                      <span className="font-semibold text-slate-800">{form.insurance.planType}</span>
                    </div>
                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-500">Member ID</span>
                      <span className="font-semibold text-slate-800">{form.insurance.memberId}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400">No insurance information provided</p>
                )}
              </div>

              {/* Program summary */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Program</p>
                {form.program.selectedProgramId ? (
                  <>
                    <div className="flex justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-500">Program</span>
                      <span className="font-semibold text-slate-800">
                        {availablePrograms.find(p => p.id === form.program.selectedProgramId)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-500">Diagnoses</span>
                      <span className="font-semibold text-slate-800">
                        {form.program.primaryDiagnoses.join(', ') || '—'}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400">No program selected</p>
                )}
              </div>

              {/* Documents summary */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">Documents</p>
                {form.documents.pendingUploads.length > 0 ? (
                  form.documents.pendingUploads.map((f, i) => (
                    <p key={i} className="text-xs text-slate-700 py-0.5 truncate">{f.name}</p>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No documents uploaded</p>
                )}
              </div>
            </div>

            {submitError && (
              <div className="flex items-center gap-2.5 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                <AlertCircle size={16} className="text-rose-500 shrink-0" />
                <p className="text-sm text-rose-700 font-medium">{submitError}</p>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center font-medium uppercase tracking-widest">
              Please verify all patient data before completing enrollment
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <h1 className="text-2xl font-black text-gray-900 mb-1 tracking-tight uppercase">Patient Onboarding</h1>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">
        Step {currentIndex + 1} of {totalSteps}: {STEPS[currentIndex].label}
      </p>

      {/* Step progress */}
      <div className="flex gap-2 mb-10">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToStep(s.id)}
            className="flex-1 group"
            disabled={i > currentIndex}
          >
            <div className={`h-1.5 rounded-full transition-all duration-500 ${
              i < currentIndex ? 'bg-blue-600 cursor-pointer' :
              i === currentIndex ? 'bg-blue-400' : 'bg-gray-100'
            }`} />
            <p className={`text-[9px] font-bold uppercase tracking-widest mt-1.5 text-center transition-colors ${
              i <= currentIndex ? 'text-blue-600' : 'text-gray-300'
            }`}>{s.label}</p>
          </button>
        ))}
      </div>

      <Card className="p-8 border-none shadow-xl shadow-blue-900/5">
        {renderStep()}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8 gap-4">
        <Button
          variant="outline"
          onClick={back}
          disabled={isSubmitting}
          className="px-6 border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-2xl"
        >
          {isFirstStep ? 'Cancel' : '← Back'}
        </Button>

        <Button
          onClick={isLastStep ? submit : next}
          disabled={isSubmitting}
          className="px-8 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 rounded-2xl py-3 min-w-[160px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Enrolling...
            </span>
          ) : isLastStep ? (
            'Complete Enrollment ✓'
          ) : (
            'Continue →'
          )}
        </Button>
      </div>
    </div>
  );
}