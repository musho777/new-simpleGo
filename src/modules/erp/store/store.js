import { configureStore } from '@reduxjs/toolkit';

import mainSlice from '../features/main/mainSlice';

const store = configureStore({
  reducer: {
    main: mainSlice,
  },
});

export default store;
