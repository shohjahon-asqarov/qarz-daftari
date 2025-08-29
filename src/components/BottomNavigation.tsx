import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Settings, Users } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Bosh sahifa' },
  { to: '/customers', icon: Users, label: 'Mijozlar' },
  { to: '/reports', icon: FileText, label: 'Hisobotlar' },
  { to: '/settings', icon: Settings, label: 'Sozlamalar' }
];

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 shadow-2xl">
      <div className="flex max-w-md mx-auto px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 px-2 text-xs transition-all duration-200 rounded-2xl mx-1 ${
                isActive
                  ? 'text-blue-600 bg-blue-50 shadow-sm transform scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50 active:scale-95'
              }`
            }
          >
            <div className="p-2 rounded-xl transition-all duration-200">
              <Icon className="w-5 h-5" />
            </div>
            <span className="mt-1 font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}