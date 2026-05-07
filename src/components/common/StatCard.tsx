// src/components/common/StatCard.tsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  // 'any' use karne se LucideIcon ka type error khatam ho jayega
  icon: any; 
  color?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

export default function StatCard({ title, value, icon: Icon, color = '#3b82f6', trend }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm font-sans flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="min-w-0 font-sans">
          {/* Label: Normal weight / Medium */}
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-none">
            {title}
          </p>
          {/* Value: font-medium (Not bold) */}
          <p className="text-2xl font-medium text-[#0f172a] mt-2 leading-none tracking-tight">
            {value}
          </p>
        </div>
        
        {/* Icon Container with vibrant background accent */}
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105" 
          style={{ backgroundColor: `${color}15` }}
        >
          {/* Icon component safely rendered */}
          {Icon && <Icon size={16} style={{ color }} strokeWidth={2} />}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 mt-3 font-sans">
          <div className={`flex items-center gap-0.5 text-[10px] font-medium ${trend.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trend.value}%
          </div>
          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-tighter">vs last month</span>
        </div>
      )}
    </div>
  );
}