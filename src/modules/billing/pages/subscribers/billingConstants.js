import Tag from 'modules/billing/components/tag';

import { Title } from './Subscribers.styles';

export const billingTypes = [
  'Ակտիվ',
  'Անջատում',
  'Անջատված',
  'Փակված',
  'Կասեցված',
  'Միացման մեջ',
  'Միացված չէ',
  'Վճարված չէ',
  'Վերականգնված',
];

export const COLUMNS = [
  { id: 'contractId', label: 'ԲԱԺԱՆՈՐԴԻ ID', numeric: false },
  {
    id: 'subContractCount',
    label: 'Պայմանագրերի քանակ',
    numeric: false,
    render: (subContractCount) => <Title>{subContractCount}</Title>,
  },
  {
    id: 'oldTariffs',
    label: 'Հին տարիֆներ',
    numeric: false,
  },
  {
    id: 'currentTariffs',
    label: 'Ընթացիկ տարիֆներ',
    numeric: false,
  },
  { id: 'regions', label: 'Մարզեր', numeric: false },
  { id: 'cities', label: 'Քաղաքներ', numeric: false },
  {
    id: 'oldStatus',
    label: 'Նախորդող ստատուս',
    width: '100px',
    numeric: false,
    render: (oldStatus) => <Tag type={oldStatus} />,
  },
  {
    id: 'currentStatus',
    label: 'Ընթացիկ ստատուս',
    width: '100px',
    numeric: false,
    render: (currentStatus) => <Tag type={currentStatus} />,
  },
  { id: 'balance', label: 'Հաշվեկշիռ', numeric: false },
  { id: 'lastPaymentDate', label: 'Վերջին վճարման ամսաթիվ', width: '140px', numeric: false },
  { id: 'amount', label: 'Վճարման ենթակա գումար', width: '150px', numeric: false },
  { id: 'phoneNumber', label: 'Հեռախոսահամար', numeric: false },
  { id: 'createDate', label: 'Ստեղծման ամսաթիվ', numeric: false },
];
