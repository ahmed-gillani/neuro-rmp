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
    <div className={`w-full bg-white border border-slate-200/60 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">{title}</h3>
        </div>
      )}
      <div className={`${noPadding ? "" : "p-4"} flex-1`}>{children}</div>
    </div>
  );
};
export default Card;