import React from 'react';
import { Plus, UserPlus, CreditCard, FileText } from 'lucide-react';

interface QuickActionsProps {
  onAddCustomer: () => void;
  onAddDebt: () => void;
  onAddPayment: () => void;
  onViewReports: () => void;
}

export default function QuickActions({ onAddCustomer, onAddDebt, onAddPayment, onViewReports }: QuickActionsProps) {
  const actions = [
    {
      icon: UserPlus,
      label: 'Mijoz qo\'shish',
      color: 'bg-blue-500',
      action: onAddCustomer
    },
    {
      icon: Plus,
      label: 'Qarz qo\'shish',
      color: 'bg-red-500',
      action: onAddDebt
    },
    {
      icon: CreditCard,
      label: 'To\'lov qabul',
      color: 'bg-green-500',
      action: onAddPayment
    },
    {
      icon: FileText,
      label: 'Hisobotlar',
      color: 'bg-purple-500',
      action: onViewReports
    }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Tezkor amallar</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className={`${action.color} p-2 rounded-lg mb-2 group-hover:scale-105 transition-transform`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-700 text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}