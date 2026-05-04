import Modal from '../common/Modal';
import Button from '../common/Button';
import type { Patient } from '../../types';

interface DeviceAssignModalProps {
    isOpen: boolean;
    onClose: () => void;
    deviceId: string;
    onAssign: (deviceId: string) => void;
    patients: Patient[];
}

export default function DeviceAssignModal({ isOpen, onClose, deviceId, onAssign, patients }: DeviceAssignModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Assign Device">
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Select a patient and assign the selected device. If no device has been selected yet, use the patient view to open this modal and assign from available hardware.
                </p>

                <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Device</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">{deviceId || 'No device selected'}</p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Patient</p>
                    <div className="mt-2 space-y-2">
                        {patients.map((patient) => (
                            <div key={patient.id} className="rounded-2xl p-3 bg-white border border-gray-200">
                                <p className="font-semibold text-gray-900">{patient.name}</p>
                                <p className="text-xs text-gray-500">{patient.primaryProvider}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onAssign(deviceId)} disabled={!deviceId}>
                        Assign Device
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
