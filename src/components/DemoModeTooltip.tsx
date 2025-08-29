import React, { useState, useEffect } from 'react';
import { Info, X, Eye } from 'lucide-react';

interface DemoModeTooltipProps {
  isDemo: boolean;
}

export default function DemoModeTooltip({ isDemo }: DemoModeTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const demoTips = [
    {
      title: "Demo rejimdasiz! 🎯",
      message: "Bu fake ma'lumotlar. O'z ma'lumotlaringizni qo'shishingiz mumkin!",
      action: "Tushundim"
    },
    {
      title: "Mijoz qo'shing! 👥",
      title: "Mijoz qo'shing! 👥",
      message: "Pastdagi + tugmasini bosib yangi mijoz qo'shing",
      action: "Ko'rsatish"
    },
    {
      title: "Qarz qo'shing! 💰",
      message: "Mijozga bosib, qarz yoki to'lov qo'shishni sinab ko'ring",
      action: "Sinash"
    },
    {
      title: "Hisobotlarni ko'ring! 📊",
      message: "Pastdagi 'Hisobotlar' bo'limida statistikalarni ko'ring",
      action: "Ko'rish"
    }
  ];

  useEffect(() => {
    if (isDemo) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDemo]);

  const nextTip = () => {
    if (currentTip < demoTips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      setShowTooltip(false);
    }
  };

  const closeTip = () => {
    setShowTooltip(false);
  };

  if (!isDemo || !showTooltip) return null;

  const tip = demoTips[currentTip];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">
              {tip.title}
            </h3>
          </div>
          <button
            onClick={closeTip}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {tip.message}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {demoTips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTip 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTip}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {tip.action}
          </button>
        </div>
      </div>
    </div>
  );
}
