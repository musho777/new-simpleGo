import Tag from 'modules/billing/components/tag';
import TagMethod from 'modules/billing/components/tagMethod';

import { Title } from './Payment.styles';

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
    id: 'numberOfPayments',
    label: 'Վճարումների քանակ',
    numeric: false,
    render: (numberOfPayments) => <Title>{numberOfPayments}</Title>,
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
  { id: 'amountPaid', label: 'Վճարած գումար', numeric: false },
  { id: 'balance', label: 'Հաշվեկշիռ', numeric: false },
  { id: 'lastPaymentDate', label: 'Վերջին վճարման ամսաթիվ', width: '140px', numeric: false },
  {
    id: 'paymentMethod',
    label: 'Վճարման մեթոդ',
    numeric: false,
    render: (paymentMethod) => <TagMethod type={paymentMethod} />,
  },
];
