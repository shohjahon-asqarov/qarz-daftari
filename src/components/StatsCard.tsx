import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'red' | 'green' | 'yellow';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
    red: 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30',
    green: 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30',
    yellow: 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30'
  };

  const iconBgClasses = {
    blue: 'bg-white bg-opacity-20',
    red: 'bg-white bg-opacity-20',
    green: 'bg-white bg-opacity-20',
    yellow: 'bg-white bg-opacity-20'
  };

  return (
    <div className={`rounded-lg p-3 transition-all duration-200 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`p-1.5 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <div className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full">
            <span className="text-xs font-medium">
              {trend.isPositive ? '↗️' : '↘️'} {trend.value}%
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-white text-opacity-80 text-xs mb-1">{title}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}