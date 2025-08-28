import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TransactionCard from '../components/TransactionCard';
import Modal from '../components/Modal';
import { Phone, MapPin, Plus, ArrowLeft, MoreVertical, Edit, Trash2 } from 'lucide-react';

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customers, transactions, addTransaction, deleteCustomer } = useApp();
  
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [transactionType, setTransactionType] = useState<'debt' | 'payment'>('debt');
  const [transactionForm, setTransactionForm] = useState({
    amount: '',
    description: ''
  });

  const customer = customers.find(c => c.id === id);
  const customerTransactions = transactions.filter(t => t.customerId === id);

  if (!customer) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Mijoz topilmadi</h2>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transactionForm.amount);
    
    if (amount > 0 && transactionForm.description.trim()) {
      addTransaction({
        customerId: id!,
        type: transactionType,
        amount,
        description: transactionForm.description.trim()
      });
      
      setTransactionForm({ amount: '', description: '' });
      setShowAddTransaction(false);
    }
  };

  const handleDeleteCustomer = () => {
    if (window.confirm('Bu mijozni o\'chirishga ishonchingiz komilmi? Barcha tranzaksiyalar ham o\'chib ketadi.')) {
      deleteCustomer(id!);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="font-semibold text-gray-900">Mijoz ma'lumotlari</h1>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-40">
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Tahrirlash</span>
              </button>
              <button 
                onClick={handleDeleteCustomer}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>O'chirish</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Customer Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{customer.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                  <span>{customer.address}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Jami qarz</p>
              <p className={`text-2xl font-bold ${
                customer.totalDebt > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {formatCurrency(customer.totalDebt)}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setTransactionType('debt');
                setShowAddTransaction(true);
              }}
              className="flex-1 bg-red-50 text-red-700 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              Qarz qo'shish
            </button>
            <button
              onClick={() => {
                setTransactionType('payment');
                setShowAddTransaction(true);
              }}
              className="flex-1 bg-green-50 text-green-700 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
            >
              To'lov qabul qilish
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tranzaksiyalar tarixi</h3>
            <span className="text-sm text-gray-600">{customerTransactions.length} ta</span>
          </div>

          {customerTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Hali tranzaksiyalar yo'q</p>
              <button
                onClick={() => {
                  setTransactionType('debt');
                  setShowAddTransaction(true);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Birinchi tranzaksiyani qo'shish
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {customerTransactions
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        title={transactionType === 'debt' ? 'Qarz qo\'shish' : 'To\'lov qabul qilish'}
      >
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Miqdor (so'm) *
            </label>
            <input
              type="number"
              value={transactionForm.amount}
              onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Izoh *
            </label>
            <textarea
              value={transactionForm.description}
              onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
              placeholder="Tranzaksiya haqida qisqacha izoh"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddTransaction(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                transactionType === 'debt' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {transactionType === 'debt' ? 'Qarz qo\'shish' : 'To\'lov qilish'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}