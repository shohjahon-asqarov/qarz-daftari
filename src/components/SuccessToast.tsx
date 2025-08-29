import React, { useEffect, useState } from 'react';
import { CheckCircle, X, TrendingUp, Users, DollarSign } from 'lucide-react';

interface SuccessToastProps {
  message: string;
  type: 'customer' | 'transaction' | 'payment' | 'general';
  isVisible: boolean;
  onClose: () => void;
}

export default function SuccessToast({ message, type, isVisible, onClose }: SuccessToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'customer': return <Users className="w-5 h-5" />;
      case 'transaction': return <TrendingUp className="w-5 h-5" />;
      case 'payment': return <DollarSign className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getEmoji = () => {
    switch (type) {
      case 'customer': return '👥';
      case 'transaction': return '💰';
      case 'payment': return '✅';
      default: return '🎉';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-20 left-4 right-4 z-50 transition-all duration-300 ${
      show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-4 shadow-2xl mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-bounce">
              {getEmoji()}
            </div>
            <div>
              <p className="font-semibold text-sm">Muvaffaqiyat!</p>
              <p className="text-green-100 text-xs">{message}</p>
            </div>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-white hover:text-green-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
