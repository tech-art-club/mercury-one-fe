import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './FilterContainer.module.css';
import InputFilter from '../InputFilter/InputFilter';

const FilterContainer = ({ content, title, isChecked }) => {
  const [showDropdown, setShowDropdown] = useState(true);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
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
            <InputFilter key={el.id} content={el} isChecked={isChecked} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterContainer;
