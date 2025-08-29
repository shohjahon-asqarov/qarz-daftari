export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  houseNumber?: number;
  roomNumber?: number;
  totalDebt: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  type: 'debt' | 'payment';
  amount: number;
  description: string;
  date: string;
  lenderId?: string; // Kim tomonidan qarz berilayotgani (User ID)
  lenderName?: string; // Qarz beruvchining ismi
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AppState {
  user: User | null;
  customers: Customer[];
  transactions: Transaction[];
  isLoading: boolean;
  notifications: Notification[];
  settings: AppSettings;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface AppSettings {
  currency: string;
  language: 'uz' | 'ru' | 'en';
  notifications: boolean;
  darkMode: boolean;
  autoBackup: boolean;
}