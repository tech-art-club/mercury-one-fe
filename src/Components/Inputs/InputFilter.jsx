import React from 'react';

const InputFilter = React.memo(({ onCheck, onUncheck, content, isChecked }) => {
  function handleCheckbox(e) {
    if (isChecked) {
      onUncheck(content.title);
    } else {
      onCheck(content.title);
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        id={content.id}
        name={content.title}
        checked={isChecked}
        onChange={handleCheckbox}
      />
      <label htmlFor={content.id}>{content.title}</label>
    </div>
  );
});

export default InputFilter;