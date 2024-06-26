import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../Components/Header/Header';
import { getLocalStorage } from '../LocalStorageRepository/LocalStorageRepo.js';

import { fetchAllData } from '../Store/Slices/mainPageReducer.js';
import { fetchProducts } from '../Store/Slices/productsReducer.js';
import { fetchMeasurements } from '../Store/Slices/measurementsReducer.js';
import { setAddUserInfo } from '../Store/Slices/authReducer.js';
import { handleAddUser } from '../Helpers/handleAddUser.js';

const MainLayout = () => {
  const dispatch = useDispatch();
  const token = getLocalStorage('access');

  useEffect(() => {
    if (token) {
      handleAddUser(token, dispatch);
    } else {
      dispatch(setAddUserInfo({ isAuth: false }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(
      fetchProducts(
        'https://mercure-recipe-app-dev.azurewebsites.net/Products/all'
      )
    );
    dispatch(
      fetchMeasurements(
        'https://mercure-recipe-app-dev.azurewebsites.net/Measurements/all'
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
