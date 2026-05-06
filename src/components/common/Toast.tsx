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
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const colors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        warning: 'bg-amber-50 border-amber-200',
        info: 'bg-blue-50 border-blue-200',
    };

    return (
        <div className={`flex items-center gap-3 p-3 sm:p-4 rounded-2xl border shadow-lg ${colors[type]} w-full max-w-xs sm:max-w-md`}>
            {icons[type]}
            <p className="text-sm sm:text-base font-medium text-gray-800 flex-1">{message}</p>
            <button
                onClick={() => onClose(id)}
                className="text-slate-800 hover:text-slate-900 transition-colors ml-2"
                aria-label="Close notification"
            >
                ✕
            </button>
        </div>
    );
}