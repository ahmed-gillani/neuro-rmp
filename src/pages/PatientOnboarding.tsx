import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import type { Patient } from '../types';

type OnboardingStep = 'demographics' | 'insurance' | 'assignment' | 'review';

export default function PatientOnboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState<OnboardingStep>('demographics');
  const [formData, setFormData] = useState<Partial<Patient>>({
    status: 'New',
    enrollmentDate: new Date().toISOString().split('T')[0],
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

    if (step === 'demographics') {
      if (!formData.name?.trim()) newErrors.name = 'Name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 'assignment') {
      if (!formData.primaryProvider) newErrors.primaryProvider = 'Primary provider is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
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

  const handleSubmit = () => {
    if (validateStep()) {
      alert('✅ Patient successfully enrolled!');
      navigate('/patients'); // Go back to patients list
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
      <h1 className="text-3xl font-bold mb-2">New Patient Onboarding</h1>
      <p className="text-gray-600 mb-8">Step {currentIndex + 1} of {steps.length}</p>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s.id} className={`flex-1 h-2 rounded-full ${i <= currentIndex ? 'bg-primary-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      <Card>
        {/* Steps Content - You can expand this as needed */}
        {step === 'demographics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Basic Information</h2>
            {/* Add your form fields here */}
            <p className="text-gray-500">Demographics form fields go here...</p>
          </div>
        )}

        {step === 'review' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Review Information</h2>
            <pre className="bg-gray-50 p-6 rounded-2xl text-sm overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          // variant="outline"
          onClick={() => window.location.href = '/patients'}

        >
          ← Previous
        </Button>


        {step === 'review' ? (
          <Button variant="outline" onClick={handleSubmit}>
            ✅ Enroll Patient
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next →
          </Button>
        )}
      </div>
    </div>
  );
}