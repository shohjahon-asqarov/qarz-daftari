import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Download, FileText, TrendingUp, TrendingDown } from 'lucide-react';

export default function Reports() {
  const { transactions } = useApp();
  const [dateFilter, setDateFilter] = useState({
    from: '',
    to: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (!dateFilter.from && !dateFilter.to) return true;
    
    const transactionDate = new Date(transaction.date);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;
    
    if (fromDate && transactionDate < fromDate) return false;
    if (toDate && transactionDate > toDate) return false;
    
    return true;
  });

  const totalDebts = filteredTransactions
    .filter(t => t.type === 'debt')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalPayments = filteredTransactions
    .filter(t => t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);

  const netDebt = totalDebts - totalPayments;

  const handleExport = (type: 'pdf' | 'excel') => {
    // Placeholder for export functionality
    alert(`${type.toUpperCase()} eksportini amalga oshirish funksiyasi hozircha ishlab chiqilmoqda`);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Hisobotlar</h1>
        <FileText className="w-6 h-6 text-blue-600" />
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h2 className="font-medium text-gray-900 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Sana bo'yicha filter
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Boshlanishi</label>
            <input
              type="date"
              value={dateFilter.from}
              onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tugash</label>
            <input
              type="date"
              value={dateFilter.to}
              onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
        {(dateFilter.from || dateFilter.to) && (
          <button
            onClick={() => setDateFilter({ from: '', to: '' })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Filterni tozalash
          </button>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami qarzlar</p>
              <p className="text-xl font-semibold text-red-600">{formatCurrency(totalDebts)}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami to'lovlar</p>
              <p className="text-xl font-semibold text-green-600">{formatCurrency(totalPayments)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sof qarz</p>
              <p className={`text-xl font-semibold ${netDebt >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(Math.abs(netDebt))}
              </p>
              <p className="text-xs text-gray-500">
                {netDebt >= 0 ? 'Olinishi kerak' : 'Ortiqcha to\'langan'}
              </p>
            </div>
            <div className={`p-3 rounded-full ${netDebt >= 0 ? 'bg-red-100' : 'bg-green-100'}`}>
              <TrendingUp className={`w-6 h-6 ${netDebt >= 0 ? 'text-red-600' : 'text-green-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="font-medium text-gray-900 mb-3">Tranzaksiyalar</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Jami tranzaksiyalar:</span>
            <span className="font-medium">{filteredTransactions.length} ta</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Qarz tranzaksiyalari:</span>
            <span className="font-medium text-red-600">
              {filteredTransactions.filter(t => t.type === 'debt').length} ta
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">To'lov tranzaksiyalari:</span>
            <span className="font-medium text-green-600">
              {filteredTransactions.filter(t => t.type === 'payment').length} ta
            </span>
          </div>
        </div>
      </div>

      {/* Lender Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="font-medium text-gray-900 mb-3">Qarz beruvchilar</h3>
        <div className="space-y-2 text-sm">
          {Array.from(new Set(filteredTransactions.map(t => t.lenderName).filter(Boolean)))
            .map(lenderName => {
              const lenderTransactions = filteredTransactions.filter(t => t.lenderName === lenderName);
              const lenderDebts = lenderTransactions.filter(t => t.type === 'debt').reduce((sum, t) => sum + t.amount, 0);
              const lenderPayments = lenderTransactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0);
              
              return (
                <div key={lenderName} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{lenderName}</span>
                    <span className="text-sm text-gray-600">{lenderTransactions.length} ta tranzaksiya</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-red-600">
                      Berilgan: {formatCurrency(lenderDebts)}
                    </div>
                    <div className="text-green-600">
                      Qaytarilgan: {formatCurrency(lenderPayments)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Eksport qilish
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => handleExport('pdf')}
            className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            PDF formatda yuklash
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
          >
            Excel formatda yuklash
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Eksport funksiyasi keyingi versiyalarda qo'shiladi
        </p>
      </div>
    </div>
  );
}