import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Bell, Check, Trash2 } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return 'Hozir';
    if (diffHours < 24) return `${diffHours} soat oldin`;
    if (diffDays === 1) return 'Kecha';
    return `${diffDays} kun oldin`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

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
              <h1 className="font-semibold text-gray-900">Bildirishnomalar</h1>
              <p className="text-xs text-gray-500">
                {unreadNotifications.length} ta o'qilmagan
              </p>
            </div>
          </div>
          {unreadNotifications.length > 0 && (
            <button 
              onClick={markAllNotificationsAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Barchasini o'qilgan deb belgilash
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Yangi</h2>
            <div className="space-y-2">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 border-l-4 border-l-blue-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(notification.createdAt)}</p>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <button 
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="O'qilgan deb belgilash"
                      >
                        <Check className="w-4 h-4 text-gray-400" />
                      </button>
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Avvalgi</h2>
            <div className="space-y-2">
              {readNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(notification.createdAt)}</p>
                    </div>
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors ml-2"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bildirishnomalar yo'q</h3>
            <p className="text-gray-600">Hali hech qanday bildirishnoma kelmagan</p>
          </div>
        )}
      </div>
    </div>
  );
}