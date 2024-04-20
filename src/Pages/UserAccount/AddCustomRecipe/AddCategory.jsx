import SelectInput from '../../../Components/Inputs/SelectInput';
import styles from './AddCategory.module.scss';

const AddCategory = ({
  allDiets,
  allKitchenTypes,
  allDishTypes,
  handleCategoryChange,
}) => {
  return (
    <>
      <div className={styles.category}>
        <SelectInput
          content={allDiets}
          property={'dietIds'}
          handleChange={handleCategoryChange}
          isMulty={true}
          styles={{ width: '330px', marginTop: '20px' }}
          placeholder={'Diet type'}
        />
      </div>

      <div className={styles.category}>
        <SelectInput
          content={allKitchenTypes}
          property={'cuisineIds'}
          handleChange={handleCategoryChange}
          isMulty={true}
          styles={{ width: '330px', marginTop: '20px' }}
          placeholder={'Cuisine type'}
        />
      </div>
      <div className={styles.category}>
        <SelectInput
          content={allDishTypes}
          property={'dishTypeIds'}
          handleChange={handleCategoryChange}
          isMulty={true}
          styles={{ width: '330px', marginTop: '20px' }}
          placeholder={'Dish type'}
        />
      </div>
    </>
  );
};

export default AddCategory;
