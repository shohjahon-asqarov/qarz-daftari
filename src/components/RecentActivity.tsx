import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';

export default function RecentActivity() {
  const { transactions, customers } = useApp();
  
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Noma\'lum mijoz';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Bugun';
    if (diffDays === 2) return 'Kecha';
    if (diffDays <= 7) return `${diffDays} kun oldin`;
    return date.toLocaleDateString('uz-UZ');
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          So'nggi faoliyat
        </h3>
      </div>
      
      {recentTransactions.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">Hali faoliyat yo'q</p>
      ) : (
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
              <div className={`p-1.5 rounded-full ${
                transaction.type === 'debt' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                {transaction.type === 'debt' ? (
                  <TrendingUp className="w-3 h-3 text-red-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-green-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getCustomerName(transaction.customerId)}
                </p>
                <p className="text-xs text-gray-500 truncate">{transaction.description}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${
                  transaction.type === 'debt' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'debt' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}