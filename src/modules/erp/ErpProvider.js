import { Provider } from 'react-redux';

import store from './store/store';

const ErpProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ErpProvider;
