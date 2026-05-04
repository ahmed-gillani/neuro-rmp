// src/components/common/Badge.tsx
import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  status?: string;                    // ← Made it more flexible
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  status, 
  variant = 'info', 
  className = '' 
}) => {
  const variants = {
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    error: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200"
  };

  // Auto variant logic based on status
  const getVariant = (status?: string) => {
    if (!status) return variant;
    if (status === 'OOR' || status === 'Off Track') return 'error';
    if (status === 'Active' || status === 'New') return 'success';
    return variant;
  };

  return (
    <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${variants[getVariant(status)]} ${className}`}>
      {children ?? status}
    </span>
  );
};

export default Badge;