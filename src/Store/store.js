import { configureStore } from '@reduxjs/toolkit';
import mainPageReducer from './Slices/mainPageReducer';
import recipesReducer from './Slices/recipesReducer';

const store = configureStore({
  reducer: {
    mainPage: mainPageReducer,
    recipes: recipesReducer,
  },
});

export default store;
