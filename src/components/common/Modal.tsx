// src/components/common/Modal.tsx
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full sm:max-w-lg mx-auto transform transition-transform ease-out duration-200"
        >
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b sticky top-0 bg-white z-10">
              <h3 className="text-sm font-semibold text-black truncate">{title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-slate-400 transition"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>
            <div className="p-3 sm:p-4 overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="pb-safe">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}