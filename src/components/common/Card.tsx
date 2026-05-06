// src/components/common/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  noPadding = false
}) => {
  return (
    <div
      className={`w-full bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-base sm:text-lg font-semibold text-black">
            {title}
          </h3>
        </div>
      )}

      <div className={noPadding ? "" : "p-4 sm:p-5 md:p-6"}>
        {children}
      </div>
    </div>
  );
};

export default Card;