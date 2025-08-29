import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Home, Hash } from 'lucide-react';
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
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-md transition-all duration-200 cursor-pointer mobile-btn"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm mb-1">{customer.name}</h3>
          <div className="flex items-center text-xs text-gray-600 mb-1">
            <Phone className="w-3 h-3 mr-1" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600 mb-1">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{customer.address}</span>
          </div>
          {customer.houseNumber && customer.roomNumber && (
            <div className="flex items-center text-xs text-gray-500 space-x-3">
              <div className="flex items-center">
                <Home className="w-3 h-3 mr-1" />
                <span>Dom: {customer.houseNumber}</span>
              </div>
              <div className="flex items-center">
                <Hash className="w-3 h-3 mr-1" />
                <span>Xona: {customer.roomNumber}</span>
              </div>
            </div>
          )}
        </div>
        <div className="text-right ml-3">
          <div className={`text-sm font-bold mb-1 ${customer.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(customer.totalDebt)}
          </div>
          <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
            customer.totalDebt > 0 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {customer.totalDebt > 0 ? 'Qarz' : 'To\'langan'}
          </div>
        </div>
      </div>
    </div>
  );
}