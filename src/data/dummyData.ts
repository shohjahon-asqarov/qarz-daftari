import { Customer, Transaction, User, Notification, AppSettings } from '../types';

export const dummyUser: User = {
  id: '1',
  name: 'Ahmad Ali',
  email: 'ahmad@example.com',
  phone: '+998 90 123 45 67'
};

export const dummyCustomers: Customer[] = [
  {
    id: '1',
    name: 'Farrux Karimov',
    phone: '+998 90 234 56 78',
    address: 'Tashkent, Mirzo Ulugbek',
    totalDebt: 250000,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Malika Usmanova',
    phone: '+998 91 345 67 89',
    address: 'Tashkent, Chilanzar',
    totalDebt: 120000,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Sardor Rahimov',
    phone: '+998 93 456 78 90',
    address: 'Tashkent, Yunusabad',
    totalDebt: 0,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    name: 'Gulnara Sultanova',
    phone: '+998 94 567 89 01',
    address: 'Tashkent, Sergeli',
    totalDebt: 85000,
    createdAt: '2024-02-10'
  }
];

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'Yangi to\'lov',
    message: 'Farrux Karimov 100,000 so\'m to\'lov qildi',
    type: 'success',
    read: false,
    createdAt: '2024-01-25T10:30:00Z'
  },
  {
    id: '2',
    title: 'Qarz eslatmasi',
    message: 'Malika Usmanova qarzini to\'lash vaqti keldi',
    type: 'warning',
    read: false,
    createdAt: '2024-01-24T09:15:00Z'
  },
  {
    id: '3',
    title: 'Yangi mijoz',
    message: 'Gulnara Sultanova ro\'yxatga qo\'shildi',
    type: 'info',
    read: true,
    createdAt: '2024-01-23T14:20:00Z'
  }
];

export const defaultSettings: AppSettings = {
  currency: 'UZS',
  language: 'uz',
  notifications: true,
  darkMode: false,
  autoBackup: true
};

export const dummyTransactions: Transaction[] = [
  {
    id: '1',
    customerId: '1',
    type: 'debt',
    amount: 150000,
    description: 'Mahsulot sotib olish',
    date: '2024-01-15'
  },
  {
    id: '2',
    customerId: '1',
    type: 'debt',
    amount: 200000,
    description: 'Qo\'shimcha buyurtma',
    date: '2024-01-20'
  },
  {
    id: '3',
    customerId: '1',
    type: 'payment',
    amount: 100000,
    description: 'Qisman to\'lov',
    date: '2024-01-25'
  },
  {
    id: '4',
    customerId: '2',
    type: 'debt',
    amount: 120000,
    description: 'Yangi buyurtma',
    date: '2024-01-20'
  },
  {
    id: '5',
    customerId: '4',
    type: 'debt',
    amount: 85000,
    description: 'Maxsulot',
    date: '2024-02-10'
  }
]