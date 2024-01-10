import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Catalog.module.css';
import { selectFilter } from '../../Store/Slices/filterReducer';
import {
  selectDishType,
  selectDietaryRecipes,
  selectKitchenType,
} from '../../Store/Slices/mainPageReducer';
import { fetchFilter } from '../../Store/Slices/filterReducer';
import CatalogContent from './CatalogContent';
import CatalogTags from './CatalogTags';
import { handleAddRecipeID } from '../../Helpers/handleAddRecipeID';
import CatalogFilter from './CatalogFilter';

const Catalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);

  const filter = {
    diets: urlSearchParams.get('diets')?.split(',') || [],
    dish: urlSearchParams.get('dish')?.split(',') || [],
    cuisine: urlSearchParams.get('cuisine')?.split(',') || [],
  };

  const dish = useSelector(selectDishType)[0];
  const diet = useSelector(selectDietaryRecipes)[0];
  const cuisine = useSelector(selectKitchenType)[0];

  const filtredRecipes = useSelector(selectFilter);

  function showRecipe(id) {
    handleAddRecipeID(dispatch, id);
    navigate(`/recipe/${id}`);
  }

  function removeTag(content) {
    removeFromQuery(content.key, content.value);
  }

  function addToQuery(key, value) {
    var currentValue = urlSearchParams.get(key);

    if (currentValue) {
      urlSearchParams.set(key, currentValue + ',' + value);
    } else {
      urlSearchParams.set(key, value);
    }

    navigate(`?${decodeURIComponent(urlSearchParams.toString())}`);
  }

  function removeFromQuery(key, value) {
    const currentValue = urlSearchParams.get(key);

    if (currentValue) {
      const valuesArray = currentValue.split(',');

      const indexToRemove = valuesArray.indexOf(value);
      if (indexToRemove !== -1) {
        valuesArray.splice(indexToRemove, 1);
      }

      if (valuesArray.length === 0) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, valuesArray.join(','));
      }
    }

    navigate(`?${decodeURIComponent(urlSearchParams.toString())}`);
  }

  useEffect(() => {
    dispatch(
      fetchFilter(
        'https://mercure-recipe-app-dev.azurewebsites.net/OData/Recipes'
      )
    );
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      <aside className={styles.filerContainer}>
        <CatalogFilter
          dish={dish}
          cuisine={cuisine}
          diet={diet}
          filter={filter}
          addToQuery={addToQuery}
          removeFromQuery={removeFromQuery}
        />
      </aside>
      <div className={styles.recipesContainer}>
        <div className={styles.activeTags}>
          <CatalogTags content={filter} removeTag={removeTag} />
        </div>
        <CatalogContent content={filtredRecipes} showRecipe={showRecipe} />
      </div>
    </div>
  );
};

export default Catalog;
