export const MOCK_LETTERS = [
  {
    id: '7344',
    title: "Oliy ta'lim sifatini oshirish bo'yicha chora-tadbirlar",
    organization: 'Oliy va o\'rta maxsus ta\'lim vazirligi',
    date: '2024.11.20',
    status: 'new',
    assignedTo: null,
  },
  {
    id: '7343',
    title: 'Universitet faoliyatiga oid hisobot taqdimoti',
    organization: 'O\'zbekiston Respublikasi Prezidenti huzuridagi Davlat boshqaruvi akademiyasi',
    date: '2024.11.19',
    status: 'open',
    assignedTo: [
      { id: 1, name: 'Karimov Jahongir', initials: 'KJ', avatarColor: 'blue', isMain: true },
      { id: 2, name: 'Usmonova Nilufar', initials: 'UN', avatarColor: 'purple', isMain: false },
    ],
  },
  {
    id: '7342',
    title: 'Xalqaro konferensiya ishtirokchilari ro\'yxati',
    organization: 'Xalqaro aloqalar vazirligi',
    date: '2024.11.18',
    status: 'answered',
    assignedTo: null,
  },
  {
    id: '7341',
    title: 'Ilmiy-tadqiqot instituti litsenziyasi yangilash',
    organization: 'Fan va texnologiyalar vazirligi',
    date: '2024.11.17',
    status: 'new',
    assignedTo: [
      { id: 3, name: 'Rahimov Aziz', initials: 'RA', avatarColor: 'green', isMain: true },
    ],
  },
  {
    id: '7340',
    title: 'Talabalar turar joyi ta\'mirlash ishlari',
    organization: 'Sog\'liqni saqlash vazirligi',
    date: '2024.11.16',
    status: 'open',
    assignedTo: null,
  },
];

export const MOCK_EMPLOYEES = [
  {
    id: 1,
    name: 'Karimov Jahongir',
    initials: 'KJ',
    department: 'Axborot texnologiyalari bo\'limi',
    avatarColor: 'blue',
  },
  {
    id: 2,
    name: 'Usmonova Nilufar',
    initials: 'UN',
    department: 'Devonxona bo\'limi',
    avatarColor: 'purple',
  },
  {
    id: 3,
    name: 'Rahimov Aziz',
    initials: 'RA',
    department: 'Kadr bo\'limi',
    avatarColor: 'green',
  },
  {
    id: 4,
    name: 'Qodirova Kamola',
    initials: 'QK',
    department: 'Moliya bo\'limi',
    avatarColor: 'orange',
  },
  {
    id: 5,
    name: 'Toshmatov Bakhodir',
    initials: 'TB',
    department: 'Qonunchilik bo\'limi',
    avatarColor: 'red',
  },
];

export const LETTER_STATUS_LABELS = {
  new: 'Yangi',
  open: 'O\'qildi',
  answered: 'Javob berildi',
};
