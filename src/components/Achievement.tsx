import React, { useEffect, useState } from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'zap';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  reward?: string;
}

interface AchievementProps {
  achievement: Achievement;
  isNew?: boolean;
}

export default function AchievementComponent({ achievement, isNew = false }: AchievementProps) {
  const [showAnimation, setShowAnimation] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setShowAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const getIcon = () => {
    const iconClass = "w-6 h-6";
    switch (achievement.icon) {
      case 'trophy': return <Trophy className={iconClass} />;
      case 'star': return <Star className={iconClass} />;
      case 'target': return <Target className={iconClass} />;
      case 'zap': return <Zap className={iconClass} />;
      default: return <Trophy className={iconClass} />;
    }
  };

  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <div className={`relative ${showAnimation ? 'animate-pulse' : ''}`}>
      {/* New achievement badge */}
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce z-10">
          Yangi!
        </div>
      )}

      <div className={`bg-white rounded-xl p-4 shadow-sm border transition-all duration-300 ${
        achievement.unlocked 
          ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' 
          : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            achievement.unlocked 
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
              : 'bg-gray-100 text-gray-400'
          }`}>
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                {achievement.title}
              </h4>
              {achievement.unlocked && (
                <span className="text-yellow-600 text-xs font-bold">🏆 Ochildi</span>
              )}
            </div>
            
            <p className="text-xs text-gray-600 mb-2">
              {achievement.description}
            </p>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                    : 'bg-gradient-to-r from-blue-400 to-blue-600'
                }`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                {achievement.progress}/{achievement.maxProgress}
              </span>
              {achievement.reward && achievement.unlocked && (
                <span className="text-green-600 font-medium">
                  🎁 {achievement.reward}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Achievement system hook
export function useAchievements() {
  const achievements: Achievement[] = [
    {
      id: 'first_customer',
      title: 'Birinchi mijoz',
      description: 'Birinchi mijozingizni qo\'shing',
      icon: 'star',
      progress: 0,
      maxProgress: 1,
      unlocked: false,
      reward: 'Professional ko\'rinish'
    },
    {
      id: 'five_customers',
      title: 'Biznes kengaymoqda',
      description: '5 ta mijoz qo\'shing',
      icon: 'target',
      progress: 0,
      maxProgress: 5,
      unlocked: false,
      reward: 'Statistika ochiladi'
    },
    {
      id: 'first_transaction',
      title: 'Birinchi tranzaksiya',
      description: 'Birinchi qarz yoki to\'lov qo\'shing',
      icon: 'zap',
      progress: 0,
      maxProgress: 1,
      unlocked: false,
      reward: 'Hisobotlar ochiladi'
    },
    {
      id: 'business_master',
      title: 'Biznes ustasi',
      description: '10 ta mijoz va 20 ta tranzaksiya',
      icon: 'trophy',
      progress: 0,
      maxProgress: 30,
      unlocked: false,
      reward: 'Premium funksiyalar'
    }
  ];

  return { achievements };
}
