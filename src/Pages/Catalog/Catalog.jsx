import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Catalog.module.scss';
import { selectFilter } from '../../Store/Slices/filterReducer';
import {
  selectDishType,
  selectDietaryRecipes,
  selectKitchenType,
} from '../../Store/Slices/mainPageReducer';
import { fetchFilter } from '../../Store/Slices/filterReducer';
import CatalogContent from './CatalogContent';
import CatalogTags from './CatalogTags';
import { navigateToRecipe } from '../../Helpers/navigate';
import CatalogFilter from './CatalogFilter';

const Catalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const allDishTypes = useSelector(selectDishType);
  const allDietTypes = useSelector(selectDietaryRecipes);
  const allCuisineTypes = useSelector(selectKitchenType);

  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    if (
      allDishTypes.length > 0 &&
      allDietTypes.length > 0 &&
      allCuisineTypes.length > 0
    ) {
      setAllDataLoaded(true);
    }
  }, [allDishTypes, allDietTypes, allCuisineTypes]);

  const getSelectedFilter = useCallback(() => {
    const urlSearchParams = new URLSearchParams(location.search);

    const titles = {
      diets: urlSearchParams.get('diets')?.split(',') || [],
      dish: urlSearchParams.get('dish')?.split(',') || [],
      cuisine: urlSearchParams.get('cuisine')?.split(',') || [],
    };

    const ids = {
      diets: allDietTypes.filter((el) => titles.diets.includes(el.title)),
      dish: allDishTypes.filter((el) => titles.dish.includes(el.title)),
      cuisine: allCuisineTypes.filter((el) =>
        titles.cuisine.includes(el.title)
      ),
    };

    return { titles: titles, ids: ids };
  }, [location.search, allDietTypes, allDishTypes, allCuisineTypes]);

  const [selectedFilter, setSelectedFilter] = useState(getSelectedFilter());

  useEffect(() => {
    setSelectedFilter(getSelectedFilter());
  }, [location.key, getSelectedFilter]);

  useEffect(() => {
    if (allDataLoaded) dispatch(fetchFilter(selectedFilter.ids));
  }, [selectedFilter, allDataLoaded, dispatch]);

  const filtredRecipes = useSelector(selectFilter);

  function showRecipe(id) {
    navigateToRecipe(id, navigate);
  }

  function removeTag(content) {
    removeFromQuery(content.key, content.value);
  }

  function addToQuery(key, value) {
    const urlSearchParams = new URLSearchParams(location.search);
    var currentValue = urlSearchParams.get(key);

    if (currentValue) {
      urlSearchParams.set(key, currentValue + ',' + value);
    } else {
      urlSearchParams.set(key, value);
    }

    navigate(`?${decodeURIComponent(urlSearchParams.toString())}`);
  }

  function removeFromQuery(key, value) {
    const urlSearchParams = new URLSearchParams(location.search);
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

  function clearQuery() {
    navigate('');
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__tags}>
        <div className={styles.catalog__tags_amountSelected}>
          {filtredRecipes.length} recipes selected
        </div>
        <div className={styles.catalog__tags_remove} onClick={clearQuery}>
          Reset
        </div>
        <CatalogTags content={selectedFilter.titles} removeTag={removeTag} />
      </div>
      <div className={styles.catalog__filterContainer}>
        <aside className={styles.catalog__filterContainer_aside}>
          <CatalogFilter
            dish={allDishTypes}
            cuisine={allCuisineTypes}
            diet={allDietTypes}
            filter={selectedFilter.titles}
            addToQuery={addToQuery}
            removeFromQuery={removeFromQuery}
          />
        </aside>
        <div className={styles.catalog__filterContainer_recipes}>
          <CatalogContent content={filtredRecipes} showRecipe={showRecipe} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
