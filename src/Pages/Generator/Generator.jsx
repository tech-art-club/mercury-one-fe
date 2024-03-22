import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../Store/Slices/productsReducer';
import {
  selectDietaryRecipes,
  selectKitchenType,
  selectDishType,
} from '../../Store/Slices/mainPageReducer';
import SelectInput from '../../Components/Inputs/SelectInput';
import styles from './Generator.module.css';
import Connector from '../../Clients/SignalR/RecipeGenerationHub';
import RecipeAsStream from '../../Components/AsStream/RecipeAsStream';
import { generateRecipeWithStreamAsync } from '../../Clients/Http/RecipeHttpClient';

const Generator = () => {
  const isUnmountedRef = useRef(false);
  const connector = Connector();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestBody, setRequestBody] = useState({
    dietIds: [],
    cuisineIds: [],
    dishTypeIds: [],
    availableProductIds: [],
    desiredProductIds: [],
    unacceptableProductIds: [],
    additionalRequirements: '',
  });

  const allDiets = useSelector(selectDietaryRecipes);
  const allKitchenTypes = useSelector(selectKitchenType);
  const allDishTypes = useSelector(selectDishType);
  const allProducts = useSelector(selectProducts);

  async function sendPostRequest() {
    setLoading(true);

    const recipeId = await generateRecipeWithStreamAsync(
      requestBody,
      connector.connection.connectionId
    );

    setLoading(false);

    if (isUnmountedRef.current === false) {
      return navigate(`/recipe/${recipeId}`);
    }

    if (isUnmountedRef.current === true) {
      return alert('Your recipe is ready');
    }
  }

  function handleChange(_, property, value) {
    setRequestBody((prev) => ({
      ...prev,
      [property]: value,
    }));
  }

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      {!loading && (
        <div className={styles.inputsContainer}>
          <SelectInput
            content={allDiets}
            isMulty={true}
            property={'dietIds'}
            handleChange={handleChange}
            placeholder={'enter diet tags'}
            styles={{ width: '330px', marginTop: '20px' }}
          />
          <SelectInput
            content={allKitchenTypes}
            isMulty={true}
            property={'cuisineIds'}
            handleChange={handleChange}
            placeholder={'enter cuisine tags'}
            styles={{ width: '330px', marginTop: '20px' }}
          />
          <SelectInput
            content={allDishTypes}
            isMulty={true}
            property={'dishTypeIds'}
            handleChange={handleChange}
            placeholder={'enter dishtype tags'}
            styles={{ width: '330px', marginTop: '20px' }}
          />
          <SelectInput
            content={allProducts}
            isMulty={true}
            property={'availableProductIds'}
            handleChange={handleChange}
            placeholder={'enter available product tags'}
            styles={{ width: '330px', marginTop: '20px' }}
          />
          <SelectInput
            content={allProducts}
            isMulty={true}
            property={'desiredProductIds'}
            handleChange={handleChange}
            placeholder={'enter desired product tags'}
            styles={{ width: '330px', marginTop: '20px' }}
          />
          <SelectInput
            content={allProducts}
            isMulty={true}
            property={'unacceptableProductIds'}
            handleChange={handleChange}
            placeholder={'enter unacceptable product tags'}
            styles={{ width: '330px', marginTop: '20px' }}
          />
          <input
            type="text"
            placeholder="additional requirements"
            className={styles.additionalInput}
            value={requestBody.additionalRequirements}
            onChange={(e) =>
              handleChange(undefined, 'additionalRequirements', e.target.value)
            }
          />
          <button
            className={styles.generateRecipeBtn}
            onClick={(e) => sendPostRequest()}
          >
            Generate recipe
          </button>
        </div>
      )}
      {loading && (
        <RecipeAsStream methods={connector.methods} events={connector.events} />
      )}
    </div>
  );
};

export default Generator;
