import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Main.module.scss';
import { navigateToRecipe } from '../../Helpers/navigate.js';

import {
  selectActivePlaylist,
  selectDietaryRecipes,
  selectKitchenType,
  selectDishType,
} from '../../Store/Slices/mainPageReducer';

import Vitrine from './Vitrine.jsx';
import PrimaryButton from '../../Components/Buttons/PrimaryButton.jsx';
import PreFilterCard from '../../Components/Cards/PreFilterCard.jsx';
import RecipeCard from '../../Components/Cards/RecipeCard.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const activePlaylist = useSelector(selectActivePlaylist);
  const dietRecipes = useSelector(selectDietaryRecipes);
  const kitchenTypes = useSelector(selectKitchenType);
  const dishTypes = useSelector(selectDishType);

  function showRecipe(id) {
    navigateToRecipe(id, navigate);
  }

  return (
    <div className={styles.main}>
      <div className={styles.main__imageContainer}>
        <h1 className={styles.main__imageContainer_title}>
          Embark on a Culinary Journey with Cookify: Where <br /> Inspiration
          Meets Flavor, Transforming Every Meal <br /> into an Experience to
          Savor!
        </h1>
        <div className={styles.main__imageContainer_button}>
          <PrimaryButton fontSize={'32px'}>Generate dish</PrimaryButton>
        </div>
      </div>
      <div className={styles.main__contentContainer}>
        {activePlaylist?.map((el, i) => (
          <Vitrine title={el.playList.title} key={i}>
            {el.playList.recipes.map((el, i) => (
              <div className={styles.main__contentContainer_card} key={el.id}>
                <RecipeCard content={el} showRecipe={showRecipe} />
              </div>
            ))}
          </Vitrine>
        ))}
        <Vitrine title="Kitchen types">
          {kitchenTypes?.map((el, i) => (
            <div className={styles.main__contentContainer_card} key={el.id}>
              <PreFilterCard content={el} type={'cuisine'} />
            </div>
          ))}
        </Vitrine>
        <Vitrine title="Dietary recipes">
          {dietRecipes?.map((el, i) => (
            <div className={styles.main__contentContainer_card} key={el.id}>
              <PreFilterCard content={el} key={el.id} type={'diets'} />
            </div>
          ))}
        </Vitrine>
        <Vitrine title="Dish Types">
          {dishTypes?.map((el, i) => (
            <div className={styles.main__contentContainer_card} key={el.id}>
              <PreFilterCard content={el} key={el.id} type={'dish'} />
            </div>
          ))}
        </Vitrine>
      </div>
    </div>
  );
};

export default Dashboard;
