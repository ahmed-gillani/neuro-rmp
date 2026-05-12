// src/components/patients/tabs/DevicesTab.tsx
import type { Patient } from '../../../types';
import Devices from '../../../pages/Devices';

interface Props {
  patient: Patient;
}

export default function DevicesTab({ patient }: Props) {
  return (
    <Devices 
      patientId={patient.id} 
      embedded={true} 
    />
  );
}