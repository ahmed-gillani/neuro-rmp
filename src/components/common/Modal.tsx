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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Mobile-first: bottom sheet on mobile, centered dialog on sm+ */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full sm:max-w-lg mx-auto transform transition-transform ease-out duration-200"
        >
          {/* Panel */}
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-h-[90vh] sm:max-h-[88vh] flex flex-col">
            {/* Header: sticky so content scrolls under it */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-base sm:text-lg font-semibold text-black truncate">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Content: scrollable area with safe-area padding */}
            <div className="p-4 sm:p-5 overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="pb-safe">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}