import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Bell, Search } from 'lucide-react';

export default function Header() {
  const { notifications } = useApp();
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 px-4 py-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Qarz Daftari</h1>
          <p className="text-xs text-gray-500">Sizning do'koningiz</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/search')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
          >
            <User className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </header>
  );
}