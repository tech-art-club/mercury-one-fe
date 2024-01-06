import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Main.module.css';
import { handleAddRecipeID } from '../../Helpers/handleAddRecipeID.js';

/* import {
  fetchActivePlaylist,
  fetchDietaryRecipes,
  fetchKitchenType,
  fetchDishType,
} from '../../Store/Slices/mainPageReducer';

import { fetchProducts } from '../../Store/Slices/productsReducer.js'; */

import {
  selectActivePlaylist,
  selectDietaryRecipes,
  selectKitchenType,
} from '../../Store/Slices/mainPageReducer';

import Vitrine from '../../Components/MainPageComponents/Vitrine/Vitrine';
import SingleFilter from '../../Components/MainPageComponents/SingleContent/SingleFilter';
import SingleRecipe from '../../Components/MainPageComponents/SingleContent/SingleRecipe';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activePlaylist = useSelector(selectActivePlaylist);
  const dietRecipes = useSelector(selectDietaryRecipes);
  const kitchenTypes = useSelector(selectKitchenType);

  /* useEffect(() => {
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
  }, [dispatch]); */

  function showRecipe(id) {
    handleAddRecipeID(dispatch, id);
    navigate(`/recipe/${id}`);
  }

  return (
    <div className={styles.mainContainer}>
      {activePlaylist[0]?.map((el, i) => (
        <Vitrine title={el.playList.title} key={i}>
          {el.playList.recipes.map((el, i) => (
            <SingleRecipe content={el} key={el.id} showRecipe={showRecipe} />
          ))}
        </Vitrine>
      ))}
      <Vitrine title="Kitchen type">
        {kitchenTypes[0]?.map((el, i) => (
          <SingleFilter content={el} key={el.id} />
        ))}
      </Vitrine>
      <Vitrine title="Dietary recipes">
        {dietRecipes[0]?.map((el, i) => (
          <SingleFilter content={el} key={el.id} />
        ))}
      </Vitrine>
    </div>
  );
};

export default Dashboard;
