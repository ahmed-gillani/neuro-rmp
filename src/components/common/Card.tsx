// //src/components/common/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean; // Add this to control inner padding
}

const Card: React.FC<CardProps> = ({ children, className = "", title, noPadding = false }) => {
  return (
    <div className={`shadow-[var(--shadow)] rounded-[var(--radius-card)] overflow-hidden ${className}`}>
      {/* If no background class is passed, use the default variable */}
      {!className.includes('bg-') && <div className="absolute inset-0 bg-[rgb(var(--card))] -z-10" />}
      
      {title && (
        <div className="px-6 py-4 border-b border-[rgb(var(--border))]">
          <h3 className="text-lg font-semibold text-[rgb(var(--text-h))]">
            {title}
          </h3>
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>
        {children}
      </div>
    </div>
  );
};

export default Card;