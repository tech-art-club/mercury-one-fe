import { useRef } from 'react';
import ImageUploader from '../Uploader/ImageUploader';
import styles from './CookingStep.module.css';

const CookingStep = ({
  content,
  index,
  handleCookingStepChange,
  handleAddCookingStepImage,
}) => {
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
        value={content.description}
        onChange={(e) =>
          handleCookingStepChange(index, 'description', e.target.value)
        }
        onInput={handleTextareaResize}
      />
      <div className={styles.uploaderWrapper}>
        <ImageUploader
          handleAddImage={handleAddCookingStepImage}
          index={index}
          style={{ width: '250px', height: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default CookingStep;
