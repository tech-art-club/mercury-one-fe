import React, { useCallback, useEffect, useState } from 'react';
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

  console.log(location);
  const urlSearchParams = new URLSearchParams(location.search);


  const allDishTypes = useSelector(selectDishType);
  const allDietTypes = useSelector(selectDietaryRecipes);
  const allCuisineTypes = useSelector(selectKitchenType);


  const getSelectedFilterTitles = useCallback(() => {
    return {
      diets: urlSearchParams.get('diets')?.split(',') || [],
      dish: urlSearchParams.get('dish')?.split(',') || [],
      cuisine: urlSearchParams.get('cuisine')?.split(',') || [],
    }
  }, [location.key])

  const getSelectedFilterIds = useCallback(() => {
    return {
      diets: allDietTypes.filter((el) => selectedFilterTitles.diets.includes(el.title)),
      dish: allDishTypes.filter((el) => selectedFilterTitles.dish.includes(el.title)),
      cuisine: allCuisineTypes.filter((el) => selectedFilterTitles.cuisine.includes(el.title)),
    }
  }, [location.key])

  const [selectedFilterTitles, setSelectedFilterTitles] = useState(getSelectedFilterTitles());
  const [selectedFilterIds, setSelectedFilterIds] = useState(getSelectedFilterIds());

  useEffect(()=> {
    setSelectedFilterTitles({
      diets: urlSearchParams.get('diets')?.split(',') || [],
      dish: urlSearchParams.get('dish')?.split(',') || [],
      cuisine: urlSearchParams.get('cuisine')?.split(',') || [],
    });

    setSelectedFilterIds({
      diets: allDietTypes.filter((el) => selectedFilterTitles.diets.includes(el.title)),
      dish: allDishTypes.filter((el) => selectedFilterTitles.dish.includes(el.title)),
      cuisine: allCuisineTypes.filter((el) => selectedFilterTitles.cuisine.includes(el.title)),
    });
  }, [location.key, dispatch])

  useEffect(() => {
    dispatch(
      fetchFilter(selectedFilterIds)
    );

  }, [selectedFilterIds])

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

  return (
    <div className={styles.mainContainer}>
      <aside className={styles.filerContainer}>
        <CatalogFilter
          dish={allDishTypes}
          cuisine={allCuisineTypes}
          diet={allDietTypes}
          filter={selectedFilterTitles}
          addToQuery={addToQuery}
          removeFromQuery={removeFromQuery}
        />
      </aside>
      <div className={styles.recipesContainer}>
        <div className={styles.activeTags}>
          <CatalogTags content={selectedFilterTitles} removeTag={removeTag} />
        </div>
        <CatalogContent content={filtredRecipes} showRecipe={showRecipe} />
      </div>
    </div>
  );
};

export default Catalog;
