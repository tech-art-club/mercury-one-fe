import { configureStore } from '@reduxjs/toolkit';
import mainPageReducer from './Slices/mainPageReducer';
import recipesReducer from './Slices/recipesReducer';
import productsReducer from './Slices/productsReducer';
import filterReducer from './Slices/filterReducer';

const store = configureStore({
  reducer: {
    mainPage: mainPageReducer,
    recipes: recipesReducer,
    products: productsReducer,
    filter: filterReducer,
  },
});

export default store;
