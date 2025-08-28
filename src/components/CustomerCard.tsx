import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { Customer } from '../types';

interface CustomerCardProps {
  customer: Customer;
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  return (
    <div
      onClick={() => navigate(`/customer/${customer.id}`)}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer mobile-card mobile-btn no-select"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{customer.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Phone className="w-3 h-3 mr-1" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{customer.address}</span>
          </div>
        </div>
        <div className="text-right ml-4">
          <div className={`text-lg font-bold ${customer.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {customer.totalDebt > 0 ? '+' : ''}{formatCurrency(customer.totalDebt)}
          </div>
          <div className="text-xs text-gray-500">
            {customer.totalDebt > 0 ? 'Qarz' : 'To\'langan'}
          </div>
        </div>
      </div>
    </div>
  );
}