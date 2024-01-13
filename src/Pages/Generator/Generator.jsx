import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleAddRecipeID } from '../../Helpers/handleAddRecipeID';
import { selectProducts } from '../../Store/Slices/productsReducer';
import {
  selectDietaryRecipes,
  selectKitchenType,
  selectDishType,
} from '../../Store/Slices/mainPageReducer';
import InputTags from '../../Components/GeneratorComponents/InputTags/InputTags';
import styles from './Generator.module.css';
import Connector from '../../Clients/SignalR/RecipeGenerationHub'
import RecipeAsStream from '../../Components/AsStream/RecipeAsStream';
import { generateRecipeWithStreamAsync } from '../../Clients/Http/RecipeHttpClient'

const Generator = () => {
  const connector = Connector();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dietIds, setDietIds] = useState([]);
  const [cuisineIds, setCuisineIds] = useState([]);
  const [dishTypeIds, setDishTypeIds] = useState([]);
  const [availableProductIds, setAvailableProductIds] = useState([]);
  const [desiredProductIds, setDesiredProductIds] = useState([]);
  const [unacceptableProductIds, setUnacceptableProductIds] = useState([]);
  const [additionalRequirementsInputValue, setAdditionalRequirementsInputValue] = useState('');

  const allDiets = useSelector(selectDietaryRecipes)[0];
  const allKitchenTypes = useSelector(selectKitchenType)[0];
  const allDishTypes = useSelector(selectDishType)[0];
  const allProducts = useSelector(selectProducts);

  function prepareRequestData () {
    var result = {
      dietIds: dietIds?.map((el) => el.id),
      cuisineIds: cuisineIds?.map((el) => el.id),
      dishTypeIds: dishTypeIds?.map((el) => el.id),
      availableProductIds: availableProductIds?.map((el) => el.id),
      desiredProductIds: desiredProductIds?.map((el) => el.id),
      unacceptableProductIds: unacceptableProductIds?.map((el) => el.id),
      additionalRequirements: additionalRequirementsInputValue
    };

    return result;
  };

  async function sendPostRequest() {
      setLoading(true);
      const requestData = prepareRequestData();

      const recipeId = await generateRecipeWithStreamAsync(requestData, connector.connection.connectionId);

      handleAddRecipeID(dispatch, recipeId);

      navigate(`/recipe/${recipeId}`);
  }

  function addAvailableProductIds(obj) {
    setAvailableProductIds([...availableProductIds, obj]);
  }
  function removeAvailableProductIds(obj) {
    setAvailableProductIds(
      availableProductIds.filter((el) => el.id !== obj.id)
    );
  }

  function addDesiredProductIds(obj) {
    setDesiredProductIds([...desiredProductIds, obj]);
  }
  function removeDesiredProductIds(obj) {
    setDesiredProductIds(desiredProductIds.filter((el) => el.id !== obj.id));
  }

  function addUnacceptableProductIds(obj) {
    setUnacceptableProductIds([...unacceptableProductIds, obj]);
  }
  function removeUnacceptableProductIds(obj) {
    setUnacceptableProductIds(
      unacceptableProductIds.filter((el) => el.id !== obj.id)
    );
  }

  function addDietIds(obj) {
    setDietIds([...dietIds, obj]);
  }
  function removeDietIds(obj) {
    setDietIds(dietIds.filter((el) => el.id !== obj.id));
  }

  function addCuisineIds(obj) {
    setCuisineIds([...cuisineIds, obj]);
  }
  function removeCuisineIds(obj) {
    setCuisineIds(cuisineIds.filter((el) => el.id !== obj.id));
  }

  function addDishTypeIds(obj) {
    setDishTypeIds([...dishTypeIds, obj]);
  }
  function removeDishTypeIds(obj) {
    setDishTypeIds(dishTypeIds.filter((el) => el.id !== obj.id));
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
            onChange={(e) => setAdditionalRequirementsInputValue(e.target.value)}
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
        <RecipeAsStream methods={connector.methods} events={connector.events}/>
      )}
    </div>
  );
};

export default Generator;
