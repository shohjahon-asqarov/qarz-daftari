import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

export default function Layout() {
  const location = useLocation();
  const hideBottomNav = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-50 safe-top safe-bottom">
      {!hideBottomNav && <Header />}
      <main className={`${hideBottomNav ? 'pt-0' : 'pt-16 pb-20'} max-w-md mx-auto hide-scrollbar`}>
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
}