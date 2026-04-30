//src/components/common/StatCard.tsx
import React from 'react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType; // Lucide icon component
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: string; // Optional custom color for icon bg
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color = "rgb(var(--primary))" }) => {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[13px] font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-[rgb(var(--text-h))] tracking-tight">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                trend.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {trend.isUp ? '↑' : '↓'} {trend.value}%
              </span>
              <span className="text-[11px] text-[rgb(var(--muted-foreground))] font-medium">vs last month</span>
            </div>
          )}
        </div>
        
        {/* Duralux Style Icon Container */}
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;