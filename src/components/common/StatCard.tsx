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
    <div className={`bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">{title}</p>
          <p className="text-4xl font-bold text-black mt-3 tracking-tight">{value}</p>
        </div>
        
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-6">
          <span className={`text-sm font-bold flex items-center gap-1 ${trend.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;