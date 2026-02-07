import { Provider } from 'react-redux';

import store from './store/store';

const BillingProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default BillingProvider;
