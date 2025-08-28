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
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100'
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-gray-600 mb-1">{title}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-1">
              <span className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">bu oyda</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}