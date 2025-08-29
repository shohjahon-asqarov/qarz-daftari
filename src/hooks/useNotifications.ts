import { useApp } from '../context/AppContext';

export function useNotifications() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (title: string, message: string, type: 'info' | 'warning' | 'success' | 'error') => {
    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };

    // Get current data
    const currentData = JSON.parse(localStorage.getItem('qarz-daftari-data') || '{}');
    
    // Add notification
    currentData.notifications = currentData.notifications || [];
    currentData.notifications.unshift(newNotification);
    
    // Keep only last 50 notifications
    if (currentData.notifications.length > 50) {
      currentData.notifications = currentData.notifications.slice(0, 50);
    }
    
    // Save back to localStorage
    localStorage.setItem('qarz-daftari-data', JSON.stringify(currentData));
    
    // Force reload to update context
    window.location.reload();
  };

  const getNotificationsByType = (type: 'info' | 'warning' | 'success' | 'error') => {
    return notifications.filter(n => n.type === type);
  };

  const getRecentNotifications = (limit = 5) => {
    return notifications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    getNotificationsByType,
    getRecentNotifications
  };
}
