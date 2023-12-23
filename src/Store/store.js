import { configureStore } from '@reduxjs/toolkit';
import mainPageReducer from './Slices/mainPageReducer';

const store = configureStore({
  reducer: {
    mainPage: mainPageReducer,
  },
});

export default store;
