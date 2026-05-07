// src/components/common/Toast.tsx
import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: (id: string) => void;
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), 4000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    const icons = {
        success: <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />,
        error: <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />,
        warning: <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />,
        info: <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />,
    };

    const colors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        warning: 'bg-amber-50 border-amber-200',
        info: 'bg-blue-50 border-blue-200',
    };

    return (
        <div className={`flex items-center gap-2.5 p-3 rounded-xl border shadow-md ${colors[type]} w-full max-w-xs sm:max-w-sm`}>
            {icons[type]}
            <p className="text-xs font-medium text-gray-800 flex-1">{message}</p>
            <button
                onClick={() => onClose(id)}
                className="text-slate-500 hover:text-slate-700 transition-colors ml-1 text-sm"
                aria-label="Close notification"
            >
                ✕
            </button>
        </div>
    );
}