import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CustomerCard from '../components/CustomerCard';
import FloatingActionButton from '../components/FloatingActionButton';
import Modal from '../components/Modal';
import AddCustomerForm from './AddCustomerForm';
import { ArrowLeft } from 'lucide-react';

export default function AllCustomers() {
  const navigate = useNavigate();
  const { customers, transactions } = useApp();
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'debt' | 'date'>('name');
  const [filterBy, setFilterBy] = useState<'all' | 'debt' | 'paid'>('all');
  const [houseFilter, setHouseFilter] = useState<string>('');
  const [lenderFilter, setLenderFilter] = useState<string>('');

  const filteredAndSortedCustomers = customers
    .filter(customer => {
      // Qarz holati bo'yicha filter
      if (filterBy === 'debt' && customer.totalDebt <= 0) return false;
      if (filterBy === 'paid' && customer.totalDebt > 0) return false;
      
      // Dom raqami bo'yicha filter
      if (houseFilter && customer.houseNumber?.toString() !== houseFilter) return false;
      
      // Qarz beruvchi bo'yicha filter
      if (lenderFilter) {
        const customerTransactions = transactions.filter(t => t.customerId === customer.id);
        const hasLenderTransaction = customerTransactions.some(t => t.lenderName === lenderFilter);
        if (!hasLenderTransaction) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'debt':
          return b.totalDebt - a.totalDebt;
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-900">Barcha mijozlar</h1>
              <p className="text-xs text-gray-500">{filteredAndSortedCustomers.length} ta mijoz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'debt' | 'paid')}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
            >
              <option value="all">Barcha mijozlar</option>
              <option value="debt">Qarzli mijozlar</option>
              <option value="paid">To'langan mijozlar</option>
            </select>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'debt' | 'date')}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
            >
              <option value="name">Ism bo'yicha</option>
              <option value="debt">Qarz miqdori</option>
              <option value="date">Qo'shilgan sana</option>
            </select>
          </div>
        </div>

        {/* Dom raqami bo'yicha filter */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <select
              value={houseFilter}
              onChange={(e) => setHouseFilter(e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
            >
              <option value="">Barcha domlar</option>
              {Array.from(new Set(customers.map(c => c.houseNumber).filter(h => h !== undefined)))
                .sort((a, b) => a - b)
                .map(houseNum => (
                  <option key={houseNum} value={houseNum.toString()}>
                    {houseNum}-dom ({customers.filter(c => c.houseNumber === houseNum).length} ta)
                  </option>
                ))}
            </select>
          </div>
          
          <div>
            <select
              value={lenderFilter}
              onChange={(e) => setLenderFilter(e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
            >
              <option value="">Barcha qarz beruvchilar</option>
              {Array.from(new Set(transactions.map(t => t.lenderName).filter(Boolean)))
                .map(lenderName => (
                  <option key={lenderName} value={lenderName}>
                    {lenderName}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-2">
          {filteredAndSortedCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>

        {filteredAndSortedCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Hech qanday mijoz topilmadi</p>
          </div>
        )}
      </div>

      <FloatingActionButton onClick={() => setShowAddCustomer(true)} />

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