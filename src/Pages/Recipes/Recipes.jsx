import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Recipes.module.css';
import { selectFilter } from '../../Store/Slices/filterReducer';
import {
  selectDishType,
  selectDietaryRecipes,
  selectKitchenType,
} from '../../Store/Slices/mainPageReducer';
import { fetchFilter } from '../../Store/Slices/filterReducer';
import SingleFiltredRecipe from '../../Components/RecipesComponents/SingleFiltredRecipe/SingleFiltredRecipe';
import FilterContainer from '../../Components/RecipesComponents/FilterContainer/FilterContainer';
import SelectedTag from '../../Components/GeneratorComponents/SelectedTag/SelectedTag';
import { handleAddRecipeID } from '../../Helpers/handleAddRecipeID';

const Recipes = () => {
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
  const [dishTypeTitles, setDishTypeTitles] = useState();
  const [kitchenTypeTitles, setKitchenTypeTitles] = useState();
  const [dietTypeTitles, setDietTypeTitles] = useState();

  function isCheckedDishType(obj) {
    setDishTypeTitles((dishTypeTitles) =>
      dishTypeTitles.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: !el.checked };
        }
        return el;
      })
    );

    urlSearchParams.set('dish', obj.title);
    navigate({ search: urlSearchParams.toString() });
  }

  function isCheckedKitchenType(obj) {
    setKitchenTypeTitles((kitchenTypeTitles) =>
      kitchenTypeTitles.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: !el.checked };
        }
        return el;
      })
    );
  }

  function isCheckedDietType(obj) {
    setDietTypeTitles((dietTypeTitles) =>
      dietTypeTitles.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: !el.checked };
        }
        return el;
      })
    );
  }

  function removeTagDishType(obj) {
    setDishTypeTitles((dishTypeTitles) =>
      dishTypeTitles.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: false };
        }
        return el;
      })
    );
  }

  function removeTagKitchenType(obj) {
    setKitchenTypeTitles((kitchenTypeTitles) =>
      kitchenTypeTitles.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: false };
        }
        return el;
      })
    );
  }

  function removeTagDietType(obj) {
    setDietTypeTitles((dietTypeTitles) =>
      dietTypeTitles.map((el) => {
        if (el.id === obj.id) {
          return { ...el, checked: false };
        }
        return el;
      })
    );
  }

  function showRecipe(id) {
    handleAddRecipeID(dispatch, id);
    navigate(`/recipe/${id}`);
  }

  useEffect(() => {
    if (Array.isArray(dish)) {
      setDishTypeTitles(dish.map((el) => ({ ...el, checked: false })));
    }

    if (Array.isArray(cuisine)) {
      setKitchenTypeTitles(cuisine.map((el) => ({ ...el, checked: false })));
    }

    if (Array.isArray(diet)) {
      setDietTypeTitles(diet.map((el) => ({ ...el, checked: false })));
    }
  }, [dish, cuisine, diet]);

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
        <FilterContainer
          content={dishTypeTitles}
          title={'Type of dish'}
          isChecked={isCheckedDishType}
        />
        <FilterContainer
          content={kitchenTypeTitles}
          title={'World cuisine'}
          isChecked={isCheckedKitchenType}
        />
        <FilterContainer
          content={dietTypeTitles}
          title={'Food type'}
          isChecked={isCheckedDietType}
        />
      </aside>
      <div className={styles.recipesContainer}>
        <div className={styles.activeTags}>
          {dishTypeTitles?.map((el) =>
            el.checked === true ? (
              <SelectedTag
                key={el.id}
                content={el}
                titleFieldPath={'title'}
                removeTag={removeTagDishType}
              />
            ) : (
              ''
            )
          )}
          {kitchenTypeTitles?.map((el) =>
            el.checked === true ? (
              <SelectedTag
                key={el.id}
                content={el}
                titleFieldPath={'title'}
                removeTag={removeTagKitchenType}
              />
            ) : (
              ''
            )
          )}
          {dietTypeTitles?.map((el) =>
            el.checked === true ? (
              <SelectedTag
                key={el.id}
                content={el}
                titleFieldPath={'title'}
                removeTag={removeTagDietType}
              />
            ) : (
              ''
            )
          )}
        </div>
        {filtredRecipes?.map((el) => (
          <SingleFiltredRecipe
            key={el.Id}
            content={el}
            showRecipe={showRecipe}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
