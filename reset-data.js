// LocalStorage'ni tozalash va yangi ma'lumotlar qo'shish
// Brauzer console'ida ishga tushiring: F12 -> Console -> bu kodni paste qiling

console.log('🧹 Eski ma\'lumotlarni tozalash...');
localStorage.removeItem('qarz-daftari-data');

console.log('✅ LocalStorage tozalandi!');
console.log('🔄 Sahifani yangilang (F5) yangi ma\'lumotlarni yuklash uchun.');

// Yoki qo'lda yangi ma'lumotlar qo'shish:
const newData = {
  user: {
    id: '1',
    name: 'Ahmad Ali',
    email: 'ahmad@example.com',
    phone: '+998 90 123 45 67'
  },
  customers: [
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
      totalDebt: 120000,
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
      totalDebt: 150000,
      createdAt: '2024-02-15'
    },
    {
      id: '6',
      name: 'Dilorom Nazarova',
      phone: '+998 97 987 65 43',
      address: 'Tashkent, Mirobod tumani, Buyuk Ipak Yo\'li',
      houseNumber: 12,
      roomNumber: 8,
      totalDebt: 75000,
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
    }
  ],
  transactions: [
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
    }
  ],
  notifications: [
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
    }
  ],
  settings: {
    currency: 'UZS',
    language: 'uz',
    notifications: true,
    darkMode: false,
    autoBackup: true
  }
};

// Ma'lumotlarni localStorage'ga saqlash
localStorage.setItem('qarz-daftari-data', JSON.stringify(newData));
console.log('✅ Yangi ma\'lumotlar qo\'shildi!');
console.log('🔄 Sahifani yangilang (F5)');
