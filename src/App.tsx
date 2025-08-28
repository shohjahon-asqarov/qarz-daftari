import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerDetail from './pages/CustomerDetail';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import AllCustomers from './pages/AllCustomers';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } />
          <Route path="notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="customers" element={
            <ProtectedRoute>
              <AllCustomers />
            </ProtectedRoute>
          } />
          <Route path="customer/:id" element={
            <ProtectedRoute>
              <CustomerDetail />
            </ProtectedRoute>
          } />
          <Route path="reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;