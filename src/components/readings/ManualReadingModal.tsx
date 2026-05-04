import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface ManualReadingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ManualReadingModal({ isOpen, onClose }: ManualReadingModalProps) {
    const [value, setValue] = useState('');
    const [notes, setNotes] = useState('');

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Manual Reading">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reading Value</label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                        placeholder="e.g. 120/80"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                        rows={4}
                        placeholder="Optional notes or context"
                    />
                </div>

                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} disabled={!value.trim()}>
                        Save Reading
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
