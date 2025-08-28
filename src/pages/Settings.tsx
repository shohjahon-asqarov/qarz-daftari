import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Phone, Mail, LogOut, Bell, Shield, HelpCircle, Moon, Globe, Database } from 'lucide-react';

export default function Settings() {
  const { user, logout, settings, updateSettings } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Tizimdan chiqishni xohlaysizmi?')) {
      logout();
      navigate('/login');
    }
  };

  const settingsItems = [
    {
      icon: User,
      title: 'Profil ma\'lumotlari',
      subtitle: 'Shaxsiy ma\'lumotlarni tahrirlash',
      action: () => alert('Profil tahrirlash funksiyasi ishlab chiqilmoqda')
    },
    {
      icon: Moon,
      title: 'Tungi rejim',
      subtitle: settings.darkMode ? 'Yoqilgan' : 'O\'chirilgan',
      action: () => updateSettings({ darkMode: !settings.darkMode }),
      toggle: true,
      enabled: settings.darkMode
    },
    {
      icon: Globe,
      title: 'Til',
      subtitle: settings.language === 'uz' ? 'O\'zbekcha' : settings.language === 'ru' ? 'Русский' : 'English',
      action: () => alert('Til sozlamalari ishlab chiqilmoqda')
    },
    {
      icon: Bell,
      title: 'Bildirishnomalar',
      subtitle: settings.notifications ? 'Yoqilgan' : 'O\'chirilgan',
      action: () => updateSettings({ notifications: !settings.notifications }),
      toggle: true,
      enabled: settings.notifications
    },
    {
      icon: Database,
      title: 'Avtomatik zaxira',
      subtitle: settings.autoBackup ? 'Yoqilgan' : 'O\'chirilgan',
      action: () => updateSettings({ autoBackup: !settings.autoBackup }),
      toggle: true,
      enabled: settings.autoBackup
    },
    {
      icon: Shield,
      title: 'Xavfsizlik',
      subtitle: 'Parol va xavfsizlik sozlamalari',
      action: () => alert('Xavfsizlik sozlamalari ishlab chiqilmoqda')
    },
    {
      icon: HelpCircle,
      title: 'Yordam',
      subtitle: 'Qo\'llanma va qo\'llab-quvvatlash',
      action: () => alert('Yordam bo\'limi ishlab chiqilmoqda')
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Sozlamalar</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{user?.name}</h2>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-3 h-3 mr-2" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-3 h-3 mr-2" />
                <span>{user?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {settingsItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
            </div>
            {item.toggle && (
              <div className={`w-12 h-6 rounded-full transition-colors ${
                item.enabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${
                  item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* App Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="font-medium text-gray-900 mb-3">Dastur haqida</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Versiya:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Oxirgi yangilanish:</span>
            <span className="font-medium">2024-01-15</span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-50 text-red-700 p-4 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Tizimdan chiqish</span>
      </button>
    </div>
  );
}