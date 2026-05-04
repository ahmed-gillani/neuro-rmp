// src/components/common/Badge.tsx
import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  status?: 'New' | 'Active' | 'OOR' | 'Off Track' | 'Discharged' | string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, status, variant = 'info', className = '' }) => {
  const variants = {
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    error: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${variants[variant]} ${className}`}>
      {children ?? status}
    </span>
  );
};

export default Badge;