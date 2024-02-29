/* import { useEffect, useState } from 'react'; */
import SelectInput from '../../../Components/Inputs/SelectInput';
/* import InputTags from '../../../Components/GeneratorComponents/InputTags/InputTags'; */

const AddCategory = ({
  allDiets,
  allKitchenTypes,
  allDishTypes,
  handleCategoryChange,
}) => {
  return (
    <>
      <SelectInput
        content={allDiets}
        property={'dietIds'}
        handleChange={handleCategoryChange}
        isMulty={true}
        styles={{ width: '330px', marginTop: '20px' }}
        placeholder={'Diet type'}
      />
      <SelectInput
        content={allKitchenTypes}
        property={'cuisineIds'}
        handleChange={handleCategoryChange}
        isMulty={true}
        styles={{ width: '330px', marginTop: '20px' }}
        placeholder={'Cuisine type'}
      />
      <SelectInput
        content={allDishTypes}
        property={'dishTypeIds'}
        handleChange={handleCategoryChange}
        isMulty={true}
        styles={{ width: '330px', marginTop: '20px' }}
        placeholder={'Dish type'}
      />
    </>
  );
};

/* {
  const [dietIds, setDietIds] = useState([]);
  const [cuisineIds, setCuisineIds] = useState([]);
  const [dishTypeIds, setDishTypeIds] = useState([]);

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

  useEffect(() => {
    handleCategoryChange(
      'dietIds',
      dietIds.map((el) => el.id)
    );
    handleCategoryChange(
      'dishTypeIds',
      dishTypeIds.map((el) => el.id)
    );
    handleCategoryChange(
      'cuisineIds',
      cuisineIds.map((el) => el.id)
    );
  }, [dietIds, dishTypeIds, cuisineIds]);

  return (
    <div>
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
    </div>
  );
}; */

export default AddCategory;
