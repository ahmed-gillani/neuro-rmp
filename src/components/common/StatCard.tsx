// src/components/common/StatCard.tsx
import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isUp: boolean };
  color?: string;
  className?: string;     // ← Added this
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "#3b82f6",
  className = ""
}) => {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all ${className}`}>
      <div className="flex items-center sm:items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] sm:text-sm font-bold tracking-wide text-gray-500 uppercase truncate">{title}</p>
          <p className="stat-value font-bold text-black mt-2 sm:mt-3 text-xl sm:text-2xl tracking-tight truncate">{value}</p>
        </div>

        <div className="flex-shrink-0 flex items-center">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color }} />
          </div>
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-3 sm:mt-4">
          <span className={`text-sm font-semibold flex items-center gap-1 ${trend.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;