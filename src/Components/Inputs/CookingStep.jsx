import { useRef } from 'react';
import styles from './CookingStep.module.css';

const CookingStep = ({ step, index, handleCookingStepChange }) => {
  const textareaRef = useRef();

  const handleTextareaResize = () => {
    textareaRef.current.style.height = '47px';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.stepNum}>Cooking Step {index + 1}:</p>
      <textarea
        ref={textareaRef}
        placeholder="Enter recipe description"
        className={styles.textarea}
        name={`cookingSteps[${index}].description`}
        value={step.description}
        onChange={(e) => handleCookingStepChange(index, e)}
        onInput={handleTextareaResize}
      />
    </div>
  );
};

export default CookingStep;
