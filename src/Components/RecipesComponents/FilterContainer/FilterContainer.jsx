import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './FilterContainer.module.css';
import InputFilter from '../InputFilter/InputFilter';

const FilterContainer = ({ content, onCheck, onUncheck, checked, title }) => {
  const [showDropdown, setShowDropdown] = useState(true);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  console.log('---', title, '---', content, '---');

  function isChechBoxChecked(title) {
    return checked.includes(title);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <h2>{title}</h2>
        <div>
          {!showDropdown && (
            <IoIosArrowDown className={styles.arrow} onClick={toggleDropdown} />
          )}
          {showDropdown && (
            <IoIosArrowUp className={styles.arrow} onClick={toggleDropdown} />
          )}
        </div>
      </div>
      {showDropdown && (
        <div className={styles.checkboxesContainer}>
          {content?.map((el) => (
            <InputFilter
              onUncheck={onUncheck}
              onCheck={onCheck}
              key={el.id}
              content={el}
              isChecked={isChechBoxChecked(el.title)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterContainer;
