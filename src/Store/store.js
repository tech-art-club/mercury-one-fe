import { configureStore } from '@reduxjs/toolkit';
import mainPageReducer from './Slices/mainPageReducer';
import recipesReducer from './Slices/recipesReducer';
import productsReducer from './Slices/productsReducer';
import filterReducer from './Slices/filterReducer';
import authReducer from './Slices/authReducer';

const store = configureStore({
  reducer: {
    mainPage: mainPageReducer,
    recipes: recipesReducer,
    products: productsReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});

export default store;
