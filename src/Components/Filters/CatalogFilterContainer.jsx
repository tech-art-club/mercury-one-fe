import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './CatalogFilterContainer.module.scss';
import InputFilter from '../Inputs/InputFilter';

const CatalogFilterContainer = ({
  content,
  onCheck,
  onUncheck,
  checked,
  title,
}) => {
  const [showDropdown, setShowDropdown] = useState(true);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function isChechBoxChecked(title) {
    return checked.includes(title);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter__titleContainer}>
        <h2 className={styles.filter__titleContainer_title}>{title}</h2>
        <div>
          {!showDropdown && (
            <IoIosArrowDown
              className={styles.filter__titleContainer_arrow}
              onClick={toggleDropdown}
            />
          )}
          {showDropdown && (
            <IoIosArrowUp
              className={styles.filter__titleContainer_arrow}
              onClick={toggleDropdown}
            />
          )}
        </div>
      </div>
      {showDropdown && (
        <div className={styles.filter__checkboxesContainer}>
          {content?.map((el) => (
            <InputFilter
              onUncheck={onUncheck}
              onCheck={onCheck}
              key={el.id}
              content={el}
              isChecked={isChechBoxChecked(el.title)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogFilterContainer;
