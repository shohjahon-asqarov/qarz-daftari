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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}