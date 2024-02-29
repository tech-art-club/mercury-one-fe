import { RiDeleteBin2Line } from 'react-icons/ri';
import CookingStep from '../../../Components/Inputs/CookingStep';
import styles from './AddCookingStep.module.css';

const AddCookingStep = ({
  step,
  index,
  handleCookingStepChange,
  handleRemoveCookingStep,
  formData,
}) => {
  return (
    <div className={styles.cookingStepContainer}>
      <CookingStep
        step={step}
        index={index}
        handleCookingStepChange={handleCookingStepChange}
      />
      <button
        className={styles.iconCloseWrapper}
        disabled={formData.cookingSteps.length > 1 ? false : true}
        onClick={(e) => handleRemoveCookingStep(index)}
      >
        <RiDeleteBin2Line
          style={{ marginTop: '20px' }}
          className={styles.iconClose}
        />
      </button>
    </div>
  );
};

export default AddCookingStep;
