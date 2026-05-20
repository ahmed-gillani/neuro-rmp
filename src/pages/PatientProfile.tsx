// src/pages/PatientProfile.tsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types';
import PatientDetailView from '../components/patients/PatientDetailView';

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Get initial tab from navigation state (if coming from NotesTab)
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const found = mockPatients.find(p => p.id === id);
    if (found) {
      setPatient(found);
    } else {
      navigate('/patients', { replace: true });
    }
  }, [id, navigate]);

  if (!patient) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-500">Loading patient profile...</p>
      </div>
    );
  }

  return (
    <PatientDetailView 
      patient={patient} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onBack={() => navigate('/patients')} 
    />
  );
}