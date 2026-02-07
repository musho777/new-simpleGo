import { configureStore } from '@reduxjs/toolkit';

// import { thunk } from 'redux-thunk';
import mainReducer from '../features/main/mainSlice';

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
