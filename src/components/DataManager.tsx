import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Download, Upload, RotateCcw, AlertCircle } from 'lucide-react';

export default function DataManager() {
  const { customers, transactions, notifications, settings, resetToDefaultData } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportAllData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      data: {
        customers,
        transactions,
        notifications,
        settings
      },
      summary: {
        totalCustomers: customers.length,
        totalTransactions: transactions.length,
        totalDebt: customers.reduce((sum, c) => sum + c.totalDebt, 0)
      }
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `qarz-daftari-backup-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Ma\'lumotlar muvaffaqiyatli backup qilindi! 💾');
  };

  const importData = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);

        if (importedData.data && importedData.version) {
          // Validate data structure
          if (importedData.data.customers && Array.isArray(importedData.data.customers)) {
            if (window.confirm(
              `${importedData.data.customers.length} ta mijoz va ${importedData.data.transactions?.length || 0} ta tranzaksiya import qilinsimi?\n\nDiqqat: Hozirgi ma'lumotlar o'chib ketadi!`
            )) {
              // Save to localStorage
              localStorage.setItem('qarz-daftari-data', JSON.stringify(importedData.data));
              
              // Reload page to apply changes
              window.location.reload();
            }
          } else {
            alert('Noto\'g\'ri fayl formati! Qarz Daftari backup faylini tanlang.');
          }
        } else {
          alert('Noto\'g\'ri backup fayl! Faqat Qarz Daftari backup fayllari qabul qilinadi.');
        }
      } catch (error) {
        alert('Faylni o\'qishda xatolik! Fayl buzilgan yoki noto\'g\'ri formatda.');
        console.error('Import error:', error);
      }
    };

    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetData = () => {
    if (window.confirm(
      'Barcha ma\'lumotlar o\'chib ketadi va yangi demo ma\'lumotlar yuklanadi.\n\nBu amalni bekor qilib bo\'lmaydi! Davom etasizmi?'
    )) {
      resetToDefaultData();
      alert('Ma\'lumotlar muvaffaqiyatli tiklandi! Demo ma\'lumotlar yuklandi. 🔄');
    }
  };

  return (
    <div className="space-y-3">
      {/* Export Data */}
      <button
        onClick={exportAllData}
        className="w-full flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 p-3 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <Download className="w-4 h-4" />
        <span className="font-medium">Ma'lumotlarni backup qilish</span>
      </button>

      {/* Import Data */}
      <button
        onClick={importData}
        className="w-full flex items-center justify-center space-x-2 bg-green-50 text-green-700 p-3 rounded-lg hover:bg-green-100 transition-colors"
      >
        <Upload className="w-4 h-4" />
        <span className="font-medium">Backup'dan tiklash</span>
      </button>

      {/* Reset to Demo */}
      <button
        onClick={resetData}
        className="w-full flex items-center justify-center space-x-2 bg-yellow-50 text-yellow-700 p-3 rounded-lg hover:bg-yellow-100 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="font-medium">Demo ma'lumotlarga qaytarish</span>
      </button>

      {/* Info */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-gray-500 mt-0.5" />
          <div>
            <p className="text-xs text-gray-600 mb-1">
              <span className="font-medium">Backup:</span> Barcha ma'lumotlaringiz JSON formatda saqlanadi
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-medium">Import:</span> Faqat Qarz Daftari backup fayllari qabul qilinadi
            </p>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        style={{ display: 'none' }}
      />
    </div>
  );
}
