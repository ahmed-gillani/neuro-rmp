// src/data/mockData.ts
import type { Patient, Reading, User, StatCardData } from '../types';
export { mockDevices } from './mockDevices';

export const mockPatients: Patient[] = [
  {
    id: "pat_001",
    name: "Ahmed Ali",
    dob: "1968-05-12",
    gender: "Male",
    status: "OOR",
    phone: "+92 300 1234567",
    address: "Gujranwala, Punjab",
    primaryProvider: "Dr. Sarah Ahmed",
    careCoordinator: "Nurse Ayesha",
    enrollmentDate: "2026-03-15",
    lastReadingDate: "2026-04-28"
  },
  {
    id: "pat_002",
    name: "Fatima Khan",
    dob: "1955-11-03",
    gender: "Female",
    status: "Active",
    phone: "+92 301 9876543",
    primaryProvider: "Dr. Ali Hassan",
    enrollmentDate: "2026-02-20",
    lastReadingDate: "2026-04-29"
  },
  {
    id: "pat_003",
    name: "Imran Malik",
    dob: "1972-08-25",
    gender: "Male",
    status: "New",
    phone: "+92 322 5551234",
    primaryProvider: "Dr. Sarah Ahmed",
    enrollmentDate: "2026-04-20",
    lastReadingDate: "2026-04-25"
  },
];

export const mockReadings: Reading[] = [
  {
    id: "rd_001",
    patientId: "pat_001",
    type: "Blood Pressure",
    value: "148/92",
    unit: "mmHg",
    timestamp: "2026-04-28T09:15:00",
    isOOR: true,
    notes: "Systolic elevated"
  },
  {
    id: "rd_002",
    patientId: "pat_002",
    type: "Glucose",
    value: "195",
    unit: "mg/dL",
    timestamp: "2026-04-29T08:30:00",
    isOOR: false
  },
];


export const mockStaff: User[] = [
  {
    id: "stf_001",
    name: "Dr. Sarah Ahmed",
    email: "sarah.ahmed@rpm.com",
    role: "Doctor",
    patientsAssigned: 28,
    minutesLogged: 1240,
    contactRate: 94,
  },
  {
    id: "stf_002",
    name: "Ayesha Khan",
    email: "ayesha.khan@rpm.com",
    role: "Nurse",
    patientsAssigned: 45,
    minutesLogged: 980,
    contactRate: 87,
  },
  {
    id: "stf_003",
    name: "Ali Hassan",
    email: "ali.hassan@rpm.com",
    role: "Doctor",
    patientsAssigned: 19,
    minutesLogged: 650,
    contactRate: 91,
  },
];

export const mockStats: StatCardData[] = [
  { title: "Active Patients", value: 142, change: 8 },
  { title: "OOR Readings Today", value: 17, change: -3, color: "text-red-600" },
  { title: "Monitoring Minutes", value: "1248", change: 12 },
  { title: "Devices Assigned", value: 89 },
];