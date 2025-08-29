import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Phone, Mail, Save } from 'lucide-react';

interface ProfileEditFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ onSuccess, onCancel }: ProfileEditFormProps) {
  const { user, updateSettings } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ism talab qilinadi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email talab qilinadi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Noto\'g\'ri email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon raqam talab qilinadi';
    } else if (!/^\+?[0-9\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Noto\'g\'ri telefon raqam format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Update user data in localStorage
      const currentData = JSON.parse(localStorage.getItem('qarz-daftari-data') || '{}');
      currentData.user = {
        ...user,
        ...formData
      };
      localStorage.setItem('qarz-daftari-data', JSON.stringify(currentData));
      
      alert('Profil ma\'lumotlari yangilandi! Sahifani yangilab ko\'ring.');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To'liq ism *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Ismingizni kiriting"
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="email@example.com"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefon raqam *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="+998 90 123 45 67"
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Bekor qilish
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Saqlash</span>
        </button>
      </div>
    </form>
  );
}
