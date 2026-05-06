// src/components/common/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}
const Card: React.FC<CardProps> = ({ children, className = "", title, noPadding = false }) => {
  return (
    <div className={`w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 tracking-tight truncate">{title}</h3>
        </div>
      )}
      <div className={noPadding ? "" : "p-3 sm:p-5 md:p-6"}>{children}</div>
    </div>
  );
};
export default Card;