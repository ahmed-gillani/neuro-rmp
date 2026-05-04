//src/pages/PatientOnboarding.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import type { Patient } from '../types';

type OnboardingStep = 'demographics' | 'insurance' | 'assignment' | 'review';

export default function PatientOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>('demographics');

  // UAE defaults added to formData
  const [formData, setFormData] = useState<Partial<Patient>>({
    status: 'New',
    enrollmentDate: new Date().toISOString().split('T')[0],
    phone: '+971 ',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof Patient, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Only validate if we are on demographics step
    if (step === 'demographics') {
      // Agar aap chahte hain k bagair naam k bhi agay chala jaye, 
      // toh in lines ko comment out kar dein:
      if (!formData.name?.trim()) newErrors.name = 'Full name is required';
      if (!formData.phone || formData.phone.length < 5) newErrors.phone = 'Phone is required';
    }

    setErrors(newErrors);
    // Agar koi error nahi hai, tabhi 'true' return hoga
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    // TIP: Validation check ko 'if (true)' kar dene se button hamesha kaam karega
    if (validateStep()) {
      const steps: OnboardingStep[] = ['demographics', 'insurance', 'assignment', 'review'];
      const currentIndex = steps.indexOf(step);
      if (currentIndex < steps.length - 1) {
        setStep(steps[currentIndex + 1]);
      }
    }
  };

  const prevStep = () => {
    const steps: OnboardingStep[] = ['demographics', 'insurance', 'assignment', 'review'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const steps = [
    { id: 'demographics', label: 'Demographics' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'assignment', label: 'Care Team' },
    { id: 'review', label: 'Review' },
  ];

  const currentIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Patient Onboarding</h1>
      <p className="text-sm font-bold text-gray-700 uppercase tracking-[0.2em] mb-8">
        Step {currentIndex + 1} of {steps.length}: {steps[currentIndex].label}
      </p>

      {/* Progress Bar */}
      <div className="flex gap-3 mb-10">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${i <= currentIndex ? 'bg-blue-600' : 'bg-gray-100'
              }`}
          />
        ))}
      </div>

      <Card className="p-8 border-none shadow-xl shadow-blue-900/5">
        {step === 'demographics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  className={`w-full p-4 rounded-2xl border text-gray-900 ${errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-300 bg-gray-50/50'} outline-none focus:border-blue-500 transition-all font-medium`}
                  value={formData.name || ''}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Ahmed Ali"
                />
                {errors.name && <p className="text-[10px] text-red-500 font-black uppercase tracking-tight">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-widest">Phone Number</label>
                <input
                  type="text"
                  className={`w-full p-4 rounded-2xl border text-gray-900 ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-300 bg-gray-50/50'} outline-none focus:border-blue-500 transition-all font-medium`}
                  value={formData.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-black uppercase tracking-tight">{errors.phone}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Temporary View for Middle Steps */}
        {(step === 'insurance' || step === 'assignment') && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">{currentIndex + 1}</span>
            </div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest italic">{step} Details</h2>
            <p className="text-gray-700 max-w-xs mx-auto text-sm font-medium">This section is ready for your custom form fields.</p>
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Final Review</h2>
            <div className="bg-gray-900 p-8 rounded-[2rem] border border-gray-800 shadow-2xl">
              <pre className="text-[11px] font-mono text-blue-300 leading-relaxed overflow-auto max-h-60">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
            <p className="text-xs text-gray-700 text-center font-medium uppercase tracking-widest">Please verify all patient data before enrollment</p>
          </div>
        )}
      </Card>

      {/* Navigation Controls */}
      <div className="flex justify-between mt-10">
        <Button
          variant="outline"
          onClick={currentIndex === 0 ? () => navigate('/patients') : prevStep}
          className="px-10 border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all rounded-2xl"
        >
          {currentIndex === 0 ? 'Cancel' : '← Back'}
        </Button>

        <Button
          onClick={step === 'review' ? () => navigate('/patients') : nextStep}
          className="px-10 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 rounded-2xl py-4"
        >
          {step === 'review' ? 'Complete Enrollment' : 'Continue →'}
        </Button>
      </div>
    </div>
  );
}