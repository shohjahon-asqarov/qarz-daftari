import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CustomerCard from '../components/CustomerCard';
import StatsCard from '../components/StatsCard';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import FloatingActionButton from '../components/FloatingActionButton';
import Modal from '../components/Modal';
import AddCustomerForm from './AddCustomerForm';
import EmptyState from '../components/EmptyState';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { customers, transactions } = useApp();
  const navigate = useNavigate();
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const totalDebt = customers.reduce((sum, customer) => sum + customer.totalDebt, 0);
  const totalCustomers = customers.length;
  const activeDebts = customers.filter(c => c.totalDebt > 0).length;
  const thisMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    const now = new Date();
    return transactionDate.getMonth() === now.getMonth() && 
           transactionDate.getFullYear() === now.getFullYear();
  }).length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
        <h2 className="text-lg font-semibold mb-1">Xush kelibsiz! 👋</h2>
        <p className="text-blue-100 text-sm">Bugun {new Date().toLocaleDateString('uz-UZ')} da sizning biznesingiz qanday?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatsCard
          title="Jami mijozlar"
          value={totalCustomers}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Qarzli mijozlar"
          value={activeDebts}
          icon={TrendingUp}
          color="red"
        />
        <StatsCard
          title="Jami qarz"
          value={formatCurrency(totalDebt)}
          icon={DollarSign}
          color="red"
        />
        <StatsCard
          title="Bu oy"
          value={`${thisMonthTransactions} ta`}
          icon={Calendar}
          color="green"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions
        onAddCustomer={() => setShowAddCustomer(true)}
        onAddDebt={() => navigate('/quick-debt')}
        onAddPayment={() => navigate('/quick-payment')}
        onViewReports={() => navigate('/reports')}
      />

      {/* Recent Activity */}
      <RecentActivity />

      {/* Customer List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Barcha mijozlar</h2>
          <button 
            onClick={() => navigate('/customers')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Barchasini ko'rish
          </button>
        </div>

        {customers.length === 0 ? (
          <EmptyState
            title="Hali mijozlar yo'q"
            description="Birinchi mijozingizni qo'shish uchun pastdagi + tugmasini bosing"
            actionText="Mijoz qo'shish"
            onAction={() => setShowAddCustomer(true)}
          />
        ) : (
          <div className="space-y-3">
            {customers.slice(0, 5).map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
            {customers.length > 5 && (
              <button
                onClick={() => navigate('/customers')}
                className="w-full p-3 text-center text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Yana {customers.length - 5} ta mijozni ko'rish
              </button>
            )}
          </div>
        )}
      </div>

      <FloatingActionButton onClick={() => {
        setShowAddCustomer(true);
      }} />

      <Modal
        isOpen={showAddCustomer}
        onClose={() => setShowAddCustomer(false)}
        title="Yangi mijoz qo'shish"
      >
        <AddCustomerForm onSuccess={() => setShowAddCustomer(false)} />
      </Modal>
    </div>
  );
}