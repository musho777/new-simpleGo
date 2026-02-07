export const COLUMNS = [
  { id: 'id', label: 'Հարցման ID', numeric: false },
  { id: 'region', label: 'Մարզեր', numeric: false },
  { id: 'city', label: 'Քաղաքներ', numeric: false },
  {
    id: 'processType',
    label: 'Հարցման տեսակ',
    numeric: false,
    render: (processType) => <span style={{ color: '#2D6CDF' }}>{processType}</span>,
  },
  { id: 'description', label: 'Հարցմանն առնչվող հաղորդագրություն', numeric: false },
  { id: 'engineer', label: 'Ինժեներ', numeric: false },
  {
    id: 'status',
    label: 'Հարցման կարգավիճակ',
    numeric: false,
    render: (status) => <span style={{ color: '#FF6A00' }}>{status}</span>,
  },
  { id: 'crateDate', label: 'Հարցման ամսաթիվ', width: '140px', numeric: false },
  { id: 'customerInfo', label: 'Բաժանորդի տվյալներ', width: '140px', numeric: false },
  { id: 'phoneNumber', label: 'Հեռախոսահամար', width: '140px', numeric: false },
];
