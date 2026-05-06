import React from 'react';
import type { Patient } from '../../types';
import PatientCard from '../common/PatientCard';

interface PatientListProps {
    patients: Patient[];
    onSelect: (p: Patient) => void;
}

export default function PatientList({ patients, onSelect }: PatientListProps) {
    if (!patients || patients.length === 0) {
        return (
            <div className="p-8 text-center text-slate-700">
                No patients found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((p) => (
                <div key={p.id} onClick={() => onSelect(p)}>
                    <PatientCard patient={p} onView={onSelect} />
                </div>
            ))}
        </div>
    );
}
