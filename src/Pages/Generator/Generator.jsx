import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import { handleAddRecipeID } from '../../Helpers/handleAddRecipeID';
import { selectProducts } from '../../Store/Slices/productsReducer';
import {
  selectDietaryRecipes,
  selectKitchenType,
  selectDishType,
} from '../../Store/Slices/mainPageReducer';
import InputTags from '../../Components/GeneratorComponents/InputTags/InputTags';
import styles from './Generator.module.css';
import { generateRecipeAsync } from '../../Clients/RecipeHttpClient/RecipeHttpClient';

const Generator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dietIds, setDietIds] = useState([]);
  const [cuisineIds, setCuisineIds] = useState([]);
  const [dishTypeIds, setDishTypeIds] = useState([]);
  const [availableProductIds, setAvailableProductIds] = useState([]);
  const [desiredProductIds, setDesiredProductIds] = useState([]);
  const [unacceptableProductIds, setUnacceptableProductIds] = useState([]);
  const [
    additionalRequirementsInputValue,
    setAdditionalRequirementsInputValue,
  ] = useState('');

  const allDiets = useSelector(selectDietaryRecipes);
  const allKitchenTypes = useSelector(selectKitchenType);
  const allDishTypes = useSelector(selectDishType);
  const allProducts = useSelector(selectProducts);

  function prepareRequestData() {
    var result = {
      dietIds: dietIds?.map((el) => el.id),
      cuisineIds: cuisineIds?.map((el) => el.id),
      dishTypeIds: dishTypeIds?.map((el) => el.id),
      availableProductIds: availableProductIds?.map((el) => el.id),
      desiredProductIds: desiredProductIds?.map((el) => el.id),
      unacceptableProductIds: unacceptableProductIds?.map((el) => el.id),
      additionalRequirements: additionalRequirementsInputValue,
    };

    return result;
  }

  async function sendPostRequest() {
    setLoading(true);
    const requestData = prepareRequestData();
    const recipeId = await generateRecipeAsync(requestData);

    handleAddRecipeID(dispatch, recipeId);

    setLoading(false);

    navigate(`/recipe/${recipeId}`);
  }

  function addAvailableProductIds(obj) {
    setAvailableProductIds([...availableProductIds, obj]);
  }
  function removeAvailableProductIds(obj) {
    setAvailableProductIds(
      availableProductIds.filter((el) => el.id !== obj.key)
    );
  }

  function addDesiredProductIds(obj) {
    setDesiredProductIds([...desiredProductIds, obj]);
  }
  function removeDesiredProductIds(obj) {
    setDesiredProductIds(desiredProductIds.filter((el) => el.id !== obj.key));
  }

  function addUnacceptableProductIds(obj) {
    setUnacceptableProductIds([...unacceptableProductIds, obj]);
  }
  function removeUnacceptableProductIds(obj) {
    setUnacceptableProductIds(
      unacceptableProductIds.filter((el) => el.id !== obj.key)
    );
  }

  function addDietIds(obj) {
    setDietIds([...dietIds, obj]);
  }
  function removeDietIds(obj) {
    setDietIds(dietIds.filter((el) => el.id !== obj.key));
  }

  function addCuisineIds(obj) {
    setCuisineIds([...cuisineIds, obj]);
  }
  function removeCuisineIds(obj) {
    setCuisineIds(cuisineIds.filter((el) => el.id !== obj.key));
  }

  function addDishTypeIds(obj) {
    setDishTypeIds([...dishTypeIds, obj]);
  }
  function removeDishTypeIds(obj) {
    setDishTypeIds(dishTypeIds.filter((el) => el.id !== obj.key));
  }

  return (
    <div className={styles.mainContainer}>
      {!loading && (
        <>
          <InputTags
            addTag={addDietIds}
            removeTag={removeDietIds}
            allContent={allDiets}
            activeTags={dietIds}
            title={'Diets:'}
          />
          <InputTags
            addTag={addCuisineIds}
            removeTag={removeCuisineIds}
            allContent={allKitchenTypes}
            activeTags={cuisineIds}
            title={'Cuisines:'}
          />
          <InputTags
            addTag={addDishTypeIds}
            removeTag={removeDishTypeIds}
            allContent={allDishTypes}
            activeTags={dishTypeIds}
            title={'Dish types:'}
          />
          <InputTags
            addTag={addAvailableProductIds}
            removeTag={removeAvailableProductIds}
            allContent={allProducts}
            activeTags={availableProductIds}
            title={'Available products:'}
            titleFieldPath={'name'}
          />
          <InputTags
            addTag={addDesiredProductIds}
            removeTag={removeDesiredProductIds}
            allContent={allProducts}
            activeTags={desiredProductIds}
            title={'Desired products:'}
            titleFieldPath={'name'}
          />
          <InputTags
            addTag={addUnacceptableProductIds}
            removeTag={removeUnacceptableProductIds}
            allContent={allProducts}
            activeTags={unacceptableProductIds}
            title={'Unacceptable products:'}
            titleFieldPath={'name'}
          />
          <input
            type="text"
            placeholder="Additional Requirements"
            value={additionalRequirementsInputValue}
            onChange={(e) =>
              setAdditionalRequirementsInputValue(e.target.value)
            }
          />
          <button
            className={styles.generateRecipeBtn}
            onClick={(e) => sendPostRequest()}
          >
            Generate recipe
          </button>
        </>
      )}
      {loading && (
        <div className={styles.loadingContainer}>
          <MoonLoader
            size={150}
            color={'#26bc12'}
            loading={loading}
            speedMultiplier={0.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default Generator;
