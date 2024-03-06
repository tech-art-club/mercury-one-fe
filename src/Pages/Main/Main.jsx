import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Main.module.css';
import { handleAddRecipeID } from '../../Helpers/handleAddRecipeID.js';

import {
  selectActivePlaylist,
  selectDietaryRecipes,
  selectKitchenType,
} from '../../Store/Slices/mainPageReducer';

import Vitrine from './Vitrine.jsx';
import PreFilterCard from '../../Components/Cards/PreFilterCard.jsx';
import RecipeCard from '../../Components/Cards/RecipeCard.jsx';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activePlaylist = useSelector(selectActivePlaylist);
  const dietRecipes = useSelector(selectDietaryRecipes);
  const kitchenTypes = useSelector(selectKitchenType);

  function showRecipe(id) {
    handleAddRecipeID(dispatch, id);
    navigate(`/recipe/${id}`);
  }

  return (
    <div className={styles.mainContainer}>
      {activePlaylist?.map((el, i) => (
        <Vitrine title={el.playList.title} key={i}>
          {el.playList.recipes.map((el, i) => (
            <RecipeCard content={el} key={el.id} showRecipe={showRecipe} />
          ))}
        </Vitrine>
      ))}
      <Vitrine title="Kitchen type">
        {kitchenTypes?.map((el, i) => (
          <PreFilterCard content={el} key={el.id} type={'cuisine'} />
        ))}
      </Vitrine>
      <Vitrine title="Dietary recipes">
        {dietRecipes?.map((el, i) => (
          <PreFilterCard content={el} key={el.id} type={'diets'} />
        ))}
      </Vitrine>
    </div>
  );
};

export default Dashboard;
