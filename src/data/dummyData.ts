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
    address: 'Tashkent, Mirzo Ulugbek tumani, Bobur ko\'chasi',
    houseNumber: 15,
    roomNumber: 12,
    totalDebt: 250000,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Malika Usmanova',
    phone: '+998 91 345 67 89',
    address: 'Tashkent, Chilanzar tumani, Bunyodkor ko\'chasi',
    houseNumber: 8,
    roomNumber: 45,
    totalDebt: 70000,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Sardor Rahimov',
    phone: '+998 93 456 78 90',
    address: 'Tashkent, Yunusabad tumani, Amir Temur ko\'chasi',
    houseNumber: 22,
    roomNumber: 3,
    totalDebt: 0,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    name: 'Gulnara Sultanova',
    phone: '+998 94 567 89 01',
    address: 'Tashkent, Sergeli tumani, Mustaqillik ko\'chasi',
    houseNumber: 15,
    roomNumber: 67,
    totalDebt: 85000,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    name: 'Otabek Toshmatov',
    phone: '+998 95 123 45 67',
    address: 'Tashkent, Shayxontohur tumani, Navoi ko\'chasi',
    houseNumber: 7,
    roomNumber: 23,
    totalDebt: 75000,
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    name: 'Dilorom Nazarova',
    phone: '+998 97 987 65 43',
    address: 'Tashkent, Mirobod tumani, Buyuk Ipak Yo\'li',
    houseNumber: 12,
    roomNumber: 8,
    totalDebt: 50000,
    createdAt: '2024-02-20'
  },
  {
    id: '7',
    name: 'Jamshid Karimov',
    phone: '+998 88 555 44 33',
    address: 'Tashkent, Olmazor tumani, Tinchlik ko\'chasi',
    houseNumber: 15,
    roomNumber: 89,
    totalDebt: 0,
    createdAt: '2024-02-25'
  },
  {
    id: '8',
    name: 'Nodira Abdullayeva',
    phone: '+998 90 777 88 99',
    address: 'Tashkent, Bektemir tumani, Yangi Hayot ko\'chasi',
    houseNumber: 9,
    roomNumber: 15,
    totalDebt: 300000,
    createdAt: '2024-03-01'
  },
  {
    id: '9',
    name: 'Bobur Xolmatov',
    phone: '+998 99 111 22 33',
    address: 'Tashkent, Yakkasaroy tumani, Amir Temur shoh ko\'chasi',
    houseNumber: 25,
    roomNumber: 7,
    totalDebt: 180000,
    createdAt: '2024-03-05'
  },
  {
    id: '10',
    name: 'Sevara Ergasheva',
    phone: '+998 93 444 55 66',
    address: 'Tashkent, Hamza tumani, Oybek ko\'chasi',
    houseNumber: 12,
    roomNumber: 34,
    totalDebt: 95000,
    createdAt: '2024-03-08'
  },
  {
    id: '11',
    name: 'Rustam Normatov',
    phone: '+998 91 888 99 00',
    address: 'Tashkent, Uchtepa tumani, Zulfiyaxonim ko\'chasi',
    houseNumber: 18,
    roomNumber: 56,
    totalDebt: 0,
    createdAt: '2024-03-12'
  },
  {
    id: '12',
    name: 'Kamola Ismoilova',
    phone: '+998 95 222 33 44',
    address: 'Tashkent, Yashnobod tumani, Labzak ko\'chasi',
    houseNumber: 7,
    roomNumber: 78,
    totalDebt: 220000,
    createdAt: '2024-03-15'
  }
];

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'Yangi to\'lov',
    message: 'Farrux Karimov (15-dom, 12-xona) 100,000 so\'m to\'lov qildi',
    type: 'success',
    read: false,
    createdAt: '2024-01-25T10:30:00Z'
  },
  {
    id: '2',
    title: 'Qarz eslatmasi',
    message: 'Malika Usmanova (8-dom, 45-xona) qarzini to\'lash vaqti keldi',
    type: 'warning',
    read: false,
    createdAt: '2024-01-24T09:15:00Z'
  },
  {
    id: '3',
    title: 'Yangi mijoz',
    message: 'Gulnara Sultanova (15-dom, 67-xona) ro\'yxatga qo\'shildi',
    type: 'info',
    read: true,
    createdAt: '2024-01-23T14:20:00Z'
  },
  {
    id: '4',
    title: 'Katta qarz',
    message: 'Nodira Abdullayeva (9-dom, 15-xona) 300,000 so\'m qarz oldi',
    type: 'warning',
    read: false,
    createdAt: '2024-03-01T15:45:00Z'
  },
  {
    id: '5',
    title: 'To\'lov qabul qilindi',
    message: 'Nodira Abdullayeva (9-dom, 15-xona) 50,000 so\'m to\'lov qildi',
    type: 'success',
    read: false,
    createdAt: '2024-03-10T11:20:00Z'
  },
  {
    id: '6',
    title: 'Yangi mijoz',
    message: 'Bobur Xolmatov (25-dom, 7-xona) ro\'yxatga qo\'shildi',
    type: 'info',
    read: false,
    createdAt: '2024-03-05T14:30:00Z'
  },
  {
    id: '7',
    title: 'Katta to\'lov',
    message: 'Rustam Normatov (18-dom, 56-xona) qarzini to\'liq to\'ladi',
    type: 'success',
    read: false,
    createdAt: '2024-03-22T16:45:00Z'
  },
  {
    id: '8',
    title: 'Yangi qarz',
    message: 'Kamola Ismoilova (7-dom, 78-xona) 220,000 so\'m qarz oldi',
    type: 'warning',
    read: false,
    createdAt: '2024-03-15T09:30:00Z'
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
    date: '2024-01-15',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '2',
    customerId: '1',
    type: 'debt',
    amount: 200000,
    description: 'Qo\'shimcha buyurtma',
    date: '2024-01-20',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '3',
    customerId: '1',
    type: 'payment',
    amount: 100000,
    description: 'Qisman to\'lov',
    date: '2024-01-25',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '4',
    customerId: '2',
    type: 'debt',
    amount: 120000,
    description: 'Yangi buyurtma',
    date: '2024-01-20',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '5',
    customerId: '4',
    type: 'debt',
    amount: 85000,
    description: 'Maxsulot',
    date: '2024-02-10',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '6',
    customerId: '5',
    type: 'debt',
    amount: 150000,
    description: 'Elektronika buyurtmasi',
    date: '2024-02-15',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '7',
    customerId: '6',
    type: 'debt',
    amount: 75000,
    description: 'Maishiy texnika',
    date: '2024-02-20',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '8',
    customerId: '8',
    type: 'debt',
    amount: 200000,
    description: 'Katta buyurtma',
    date: '2024-03-01',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '9',
    customerId: '8',
    type: 'debt',
    amount: 150000,
    description: 'Qo\'shimcha mahsulot',
    date: '2024-03-05',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '10',
    customerId: '8',
    type: 'payment',
    amount: 50000,
    description: 'Birinchi to\'lov',
    date: '2024-03-10',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '11',
    customerId: '9',
    type: 'debt',
    amount: 180000,
    description: 'Uy jihozlari',
    date: '2024-03-05',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '12',
    customerId: '10',
    type: 'debt',
    amount: 95000,
    description: 'Kiyim-kechak',
    date: '2024-03-08',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '13',
    customerId: '12',
    type: 'debt',
    amount: 120000,
    description: 'Oziq-ovqat mahsulotlari',
    date: '2024-03-15',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '14',
    customerId: '12',
    type: 'debt',
    amount: 100000,
    description: 'Qo\'shimcha buyurtma',
    date: '2024-03-18',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '15',
    customerId: '6',
    type: 'payment',
    amount: 25000,
    description: 'Qisman to\'lov',
    date: '2024-03-20',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '16',
    customerId: '2',
    type: 'payment',
    amount: 50000,
    description: 'To\'lov qilindi',
    date: '2024-03-22',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  },
  {
    id: '17',
    customerId: '5',
    type: 'payment',
    amount: 75000,
    description: 'Qisman to\'lov',
    date: '2024-03-25',
    lenderId: '1',
    lenderName: 'Ahmad Ali'
  }
]