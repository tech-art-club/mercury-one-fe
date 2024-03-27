import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TfiTimer } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import {
  selectDietaryRecipes,
  selectKitchenType,
  selectDishType,
} from '../../../Store/Slices/mainPageReducer';
import { selectMeasurements } from '../../../Store/Slices/measurementsReducer';
import { selectProducts } from '../../../Store/Slices/productsReducer';
import ImageUploader from '../../../Components/Uploader/ImageUploader';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import NumInput from '../../../Components/Inputs/NumInput';
import FormAddButton from '../../../Components/Buttons/FormAddButton';
import { postCustomRecipe } from '../../../Clients/Http/RecipePostHttpClient';
import { imageUrlToBase64 } from '../../../Helpers/imageUrlToBase64';
import styles from './AddCustomRecipe.module.css';
import AddCookingStep from './AddCookingStep';

const TimeInputWrapper = ({ handleTimeChange }) => {
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  function handleHoursChange(_, property, hours) {
    setTotalHours(hours * 60);
  }

  function handleMinutesChange(_, property, minutes) {
    setTotalMinutes(minutes);
  }

  useEffect(() => {
    handleTimeChange(totalHours + totalMinutes);
  }, [totalHours, totalMinutes, handleTimeChange]);

  return (
    <div className={styles.inputTimeContainer}>
      <TfiTimer className={styles.timeIcon} />
      <NumInput
        onChange={handleHoursChange}
        name={'hours'}
        property={'cookingTimeMinutes'}
        placeholder={'h'}
      />
      <p style={{ marginRight: '10px', marginLeft: '-10px' }}>hours</p>
      <NumInput
        onChange={handleMinutesChange}
        name={'minutes'}
        property={'cookingTimeMinutes'}
        placeholder={'m'}
      />
      <p style={{ marginLeft: '-10px' }}>minutes</p>
    </div>
  );
};

const AddCustomRecipe = () => {
  const navigate = useNavigate();
  const allPropducts = useSelector(selectProducts);
  const allMeasurements = useSelector(selectMeasurements);
  const allDiets = useSelector(selectDietaryRecipes);
  const allKitchenTypes = useSelector(selectKitchenType);
  const allDishTypes = useSelector(selectDishType);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    calorieContent: 0,
    cookingTimeMinutes: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    cookingSteps: [
      {
        stepNumber: 0,
        description: '',
        image: '',
      },
    ],
    dietIds: [],
    cuisineIds: [],
    dishTypeIds: [],
    hours: 0,
    minutes: 0,
    products: [
      {
        productId: '',
        measurementId: '',
        quantity: 0,
      },
    ],
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (_, property, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [property]: value,
    }));
  };

  const handleTimeChange = useCallback(
    (time) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cookingTimeMinutes: time,
      }));
    },
    [setFormData]
  );

  const handleCookingStepChange = (index, property, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      const updatedCookingSteps = [...updatedFormData.cookingSteps];
      updatedCookingSteps[index] = {
        ...updatedCookingSteps[index],
        [property]: value,
      };
      updatedFormData.cookingSteps = updatedCookingSteps;
      return updatedFormData;
    });
  };

  const handleProductChange = (index, property, value) => {
    setFormData((prevFormData) => {
      const updatedProducts = [...prevFormData.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [property]: value,
      };
      return {
        ...prevFormData,
        products: updatedProducts,
      };
    });
  };

  const handleAddCookingStep = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      cookingSteps: [
        ...prevFormData.cookingSteps,
        {
          stepNumber: prevFormData.cookingSteps.length,
          description: '',
          stepImage: '',
        },
      ],
    }));
  };

  const handleRemoveCookingStep = (index) => {
    setFormData({
      ...formData,
      cookingSteps: formData.cookingSteps.filter((_, i) => i !== index),
    });
  };

  const handleAddProduct = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: [
        ...prevFormData.products,
        {
          productId: '',
          measurementId: '',
          quantity: 0,
        },
      ],
    }));
  };

  const handleRemoveProduct = (index) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index),
    });
  };

  const handleAddCookingStepImage = useCallback(
    async (index, imgUrl) => {
      try {
        if (imgUrl) {
          const base64Image = await imageUrlToBase64(imgUrl);
          const base64WithoutPrefix = base64Image.split(',')[1];
          setFormData((prevData) => {
            const updatedCookingSteps = [...prevData.cookingSteps];
            updatedCookingSteps[index] = {
              ...updatedCookingSteps[index],
              image: base64WithoutPrefix,
            };
            return {
              ...prevData,
              cookingSteps: updatedCookingSteps,
            };
          });
        }
      } catch (error) {
        console.error('Ошибка при обработке изображения:', error);
      }
    },
    [setFormData]
  );

  const handleAddImage = useCallback(
    async (_, imgUrl) => {
      try {
        if (imgUrl) {
          const base64Image = await imageUrlToBase64(imgUrl);
          const base64WithoutPrefix = base64Image.split(',')[1];
          setFormData((prevData) => ({
            ...prevData,
            image: base64WithoutPrefix,
          }));
        }
      } catch (error) {
        console.error('Ошибка при обработке изображения:', error);
      }
    },
    [setFormData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customRecipe = await postCustomRecipe(formData);
      navigate(`/recipe/${customRecipe.data}`);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.titleInput}
          placeholder="Enter the title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <div className={styles.uploaderAndProductsWrapper}>
          <ImageUploader
            handleAddImage={handleAddImage}
            style={{ width: '400px', height: 'max-content' }}
          />
          <div className={styles.productsWrapper}>
            {formData.products.map((_, index) => (
              <AddProduct
                key={index}
                allPropducts={allPropducts}
                allMeasurements={allMeasurements}
                index={index}
                handleProductChange={handleProductChange}
                handleRemoveProduct={handleRemoveProduct}
                formData={formData}
              />
            ))}
            <FormAddButton onClick={handleAddProduct}>
              Add Product
            </FormAddButton>
          </div>
        </div>
        <textarea
          className={styles.descriptionTextarea}
          name="description"
          placeholder="Enter recipe description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <div className={styles.timeContainer}>
          <h2 style={{ marginBottom: '20px' }}>Cooking time</h2>
          <TimeInputWrapper handleTimeChange={handleTimeChange} />
        </div>
        <div>
          <h2>Add category</h2>
          <AddCategory
            allDiets={allDiets}
            allKitchenTypes={allKitchenTypes}
            allDishTypes={allDishTypes}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        {formData.cookingSteps.map((content, index) => (
          <AddCookingStep
            key={index}
            content={content}
            index={index}
            handleAddCookingStepImage={handleAddCookingStepImage}
            handleCookingStepChange={handleCookingStepChange}
            handleRemoveCookingStep={handleRemoveCookingStep}
            formData={formData}
          />
        ))}
        <FormAddButton onClick={handleAddCookingStep}>
          Add Cooking Step
        </FormAddButton>
        <button type="submit" className={styles.btnSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCustomRecipe;
