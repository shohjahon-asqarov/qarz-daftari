import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${
            transaction.type === 'debt' ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {transaction.type === 'debt' ? (
              <TrendingUp className="w-4 h-4 text-red-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-green-600" />
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {transaction.type === 'debt' ? 'Qarz' : 'To\'lov'}
            </h4>
            <p className="text-sm text-gray-600">{transaction.description}</p>
            <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
          </div>
        </div>
        <div className={`text-lg font-semibold ${
          transaction.type === 'debt' ? 'text-red-600' : 'text-green-600'
        }`}>
          {transaction.type === 'debt' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
      </div>
    </div>
  );
}