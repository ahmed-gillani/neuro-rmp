// src/components/common/Modal.tsx
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full h-full sm:h-auto max-w-full sm:max-w-lg sm:max-h-[88vh] overflow-hidden shadow-xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 sm:px-5 sm:py-5">
          <h2 className="text-lg sm:text-xl font-bold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Content - Reduced Padding */}
        <div className="p-3 sm:p-5 overflow-auto max-h-[calc(100vh-120px)] sm:max-h-[calc(88vh-70px)] text-black">
          {children}
        </div>
      </div>
    </div>
  );
}