import React from 'react';
import styles from './InputFilter.module.css';

const InputFilter = React.memo(({ content, isChecked }) => {
  function handleCheckbox() {
    isChecked(content);
  }

  return (
    <div className={styles.checkboxInput}>
      <input
        type="checkbox"
        id={content.id}
        name={content.title}
        checked={content.checked}
        onChange={(e) => handleCheckbox()}
      />
      <label htmlFor={content.id}>{content.title}</label>
    </div>
  );
});

export default InputFilter;
