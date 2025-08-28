import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search as SearchIcon, ArrowLeft, User, Phone } from 'lucide-react';

export default function Search() {
  const navigate = useNavigate();
  const { customers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    
    const customerResults = customers.filter(customer =>
      customer.name.toLowerCase().includes(query) ||
      customer.phone.includes(query) ||
      customer.address.toLowerCase().includes(query)
    );

    return customerResults;
  }, [searchQuery, customers]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mijoz nomi, telefon yoki manzil..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        {searchQuery.trim() === '' ? (
          <div className="text-center py-12">
            <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Qidiruv</h3>
            <p className="text-gray-600">Mijoz nomi, telefon raqami yoki manzil bo'yicha qidiring</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Natija topilmadi</h3>
            <p className="text-gray-600">"{searchQuery}" bo'yicha hech narsa topilmadi</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              {searchResults.length} ta natija topildi
            </p>
            {searchResults.map((customer) => (
              <div
                key={customer.id}
                onClick={() => navigate(`/customer/${customer.id}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {customer.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Phone className="w-3 h-3 mr-2" />
                      <span>{customer.phone}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{customer.address}</p>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}