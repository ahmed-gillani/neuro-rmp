// import React from 'react';

type BadgeVariant = 'New' | 'Active' | 'OOR' | 'Off Track' | 'Discharged';

const variantStyles: Record<BadgeVariant, string> = {
  New: 'bg-[#1e4a7a] text-[#b6c8d9]',
  Active: 'bg-green-100 text-green-700',
  OOR: 'bg-red-100 text-red-700',
  'Off Track': 'bg-orange-100 text-orange-700',
  Discharged: 'bg-gray-100 text-gray-700',
};

interface BadgeProps {
  status: BadgeVariant;
  className?: string;
}

export default function Badge({ status, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${variantStyles[status]} ${className}`}>
      {status}
    </span>
  );
}