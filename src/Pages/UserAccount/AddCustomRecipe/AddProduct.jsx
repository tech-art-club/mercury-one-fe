import { RiDeleteBin2Line } from 'react-icons/ri';
import SelectInput from '../../../Components/Inputs/SelectInput';
import NumInput from '../../../Components/Inputs/NumInput';
import styles from './AddProduct.module.css';

const AddProduct = ({
  allPropducts,
  allMeasurements,
  index,
  handleProductChange,
  handleRemoveProduct,
  formData,
}) => {
  return (
    <div className={styles.productContainer}>
      <SelectInput
        styles={{ width: '330px', marginRight: '20px' }}
        content={allPropducts}
        handleChange={handleProductChange}
        index={index}
        property={'productId'}
        placeholder={'start adding the ingredient'}
      />
      <NumInput
        name={`products.${index}.quantity`}
        placeholder="num"
        onChange={handleProductChange}
        property={'quantity'}
        index={index}
      />
      <SelectInput
        styles={{ width: '150px', marginRight: '20px' }}
        content={allMeasurements}
        handleChange={handleProductChange}
        index={index}
        property={'measurementId'}
        placeholder={'measure'}
      />
      <button
        className={styles.iconCloseWrapper}
        disabled={formData.products.length > 1 ? false : true}
        onClick={(e) => handleRemoveProduct(index)}
      >
        <RiDeleteBin2Line className={styles.iconClose} />
      </button>
    </div>
  );
};

export default AddProduct;
