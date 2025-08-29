import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Phone, MapPin, Home, Hash } from 'lucide-react';

interface AddCustomerFormProps {
  onSuccess: () => void;
}

export default function AddCustomerForm({ onSuccess }: AddCustomerFormProps) {
  const { addCustomer } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    houseNumber: '',
    roomNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Mijoz ismi talab qilinadi';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon raqam talab qilinadi';
    } else if (!/^\+?[0-9\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Noto\'g\'ri telefon raqam format';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Manzil talab qilinadi';
    }

    if (!formData.houseNumber.trim()) {
      newErrors.houseNumber = 'Dom raqami talab qilinadi';
    } else if (!/^\d+$/.test(formData.houseNumber)) {
      newErrors.houseNumber = 'Dom raqami faqat raqamlardan iborat bo\'lishi kerak';
    }

    if (!formData.roomNumber.trim()) {
      newErrors.roomNumber = 'Xona raqami talab qilinadi';
    } else if (!/^\d+$/.test(formData.roomNumber)) {
      newErrors.roomNumber = 'Xona raqami faqat raqamlardan iborat bo\'lishi kerak';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addCustomer({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        houseNumber: parseInt(formData.houseNumber) || 0,
        roomNumber: parseInt(formData.roomNumber) || 0
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mijoz ismi *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Mijoz ismini kiriting"
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefon raqam *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+998 90 123 45 67"
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Manzil *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Mijozning to'liq manzilini kiriting"
          />
        </div>
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dom raqami *
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.houseNumber}
              onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.houseNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="15"
            />
          </div>
          {errors.houseNumber && <p className="mt-1 text-sm text-red-600">{errors.houseNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Xona raqami *
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.roomNumber}
              onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.roomNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="12"
            />
          </div>
          {errors.roomNumber && <p className="mt-1 text-sm text-red-600">{errors.roomNumber}</p>}
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onSuccess}
          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Bekor qilish
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Qo'shish
        </button>
      </div>
    </form>
  );
}