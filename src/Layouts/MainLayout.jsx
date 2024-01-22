import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import Header from '../Components/Header/Header';
import { getLocalStorage } from '../LocalStorageRepository/LocalStorageRepo.js';

import {
  fetchActivePlaylist,
  fetchDietaryRecipes,
  fetchKitchenType,
  fetchDishType,
} from '../Store/Slices/mainPageReducer.js';
import { fetchProducts } from '../Store/Slices/productsReducer.js';
import { setAddUserInfo } from '../Store/Slices/authReducer.js';

const MainLayout = () => {
  const dispatch = useDispatch();
  //const location = useLocation();
  const token = getLocalStorage('access');

  const setUserInfo = useCallback((token) => {
    const decoded = jwtDecode(token);
    const userInfo = {
      isAuth: true,
      name: decoded.name,
      login: decoded.login,
    };
    return dispatch(setAddUserInfo(userInfo));
  }, setAddUserInfo, dispatch);

  //from path to login and back
  //hoc or hook ? to auth
  //refresh token logic

  useEffect(() => {
    if (token) {
      setUserInfo(token);
    } else {
      dispatch(setAddUserInfo({ isAuth: false }));
    }
  }, [dispatch, token, setUserInfo]);

  useEffect(() => {
    dispatch(
      fetchActivePlaylist(
        'https://mercure-recipe-app-dev.azurewebsites.net/PlayLists/active'
      )
    );
    dispatch(
      fetchKitchenType(
        'https://mercure-recipe-app-dev.azurewebsites.net/Cuisines/all'
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
