import React from 'react';
import { TrendingUp, TrendingDown, User } from 'lucide-react';
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2 flex-1">
          <div className={`p-1.5 rounded-full ${
            transaction.type === 'debt' ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {transaction.type === 'debt' ? (
              <TrendingUp className="w-3 h-3 text-red-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-green-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-gray-900 text-xs">
                {transaction.type === 'debt' ? 'Qarz olindi' : 'To\'lov qilindi'}
              </h4>
              <div className={`text-xs font-bold ${
                transaction.type === 'debt' ? 'text-red-600' : 'text-green-600'
              }`}>
                {transaction.type === 'debt' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">{transaction.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">{formatDate(transaction.date)}</span>
              {transaction.lenderName && (
                <div className="flex items-center bg-blue-50 px-1.5 py-0.5 rounded">
                  <User className="w-2.5 h-2.5 mr-1 text-blue-600" />
                  <span className="text-blue-700 font-medium text-xs">{transaction.lenderName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}