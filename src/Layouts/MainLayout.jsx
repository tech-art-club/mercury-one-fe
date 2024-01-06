import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../Components/Header/Header';

import {
  fetchActivePlaylist,
  fetchDietaryRecipes,
  fetchKitchenType,
  fetchDishType,
} from '../Store/Slices/mainPageReducer.js';

import { fetchProducts } from '../Store/Slices/productsReducer.js';

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchActivePlaylist(
        'https://mercure-recipe-app-dev.azurewebsites.net/PlayLists/active'
      )
    );
    dispatch(
      fetchKitchenType(
        'https://mercure-recipe-app-dev.azurewebsites.net/Ciusines/all'
      )
    );
    dispatch(
      fetchDietaryRecipes(
        'https://mercure-recipe-app-dev.azurewebsites.net/Diets/all'
      )
    );
    dispatch(
      fetchDishType(
        'https://mercure-recipe-app-dev.azurewebsites.net/DishTypes/all'
      )
    );
    dispatch(
      fetchProducts(
        'https://mercure-recipe-app-dev.azurewebsites.net/Products/all'
      )
    );
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
