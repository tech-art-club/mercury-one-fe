import { useState, useRef } from 'react';
import SelectedTag from '../SelectedTag/SelectedTag';
import styles from './InputTags.module.css';
import InputTagsDropdown from './InputTagsDropdown';
import OutsideClickHandler from '../../Hocs/OutsideClickHandler';

const InputTags = ({
  addTag,
  removeTag,
  allContent,
  activeTags,
  title,
  maxQuantity,
  titleFieldPath,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef(null);

  const onOutsideClick = () => {
    setShowDropdown(false);
  };

  const onInsideClick = () => {
    setShowDropdown(true);
    inputRef.current.focus();
  };

  return (
    <div className={styles.inputContainer}>
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <div className={styles.activeTagsContainer} onClick={onInsideClick}>
          <div className={styles.activeTagsTitle}>{title}</div>
          {activeTags &&
            activeTags?.map((el) => (
              <SelectedTag
                key={el.id}
                content={{ key: el.id, value: el[titleFieldPath] }}
                removeTag={removeTag}
              />
            ))}
          <input
            ref={inputRef}
            type="text"
            placeholder="enter your tag"
            className={styles.generatorInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {showDropdown && (
          <InputTagsDropdown
            itemsDropdownStyle={styles.dropdownSearch}
            tagsDropdownStyle={styles.dropdown}
            content={allContent.filter(
              (el) => !activeTags.some((activeEl) => activeEl.id === el.id)
            )}
            addTag={(tag) => {
              addTag(tag);
              setInputValue('');
            }}
            inputValue={inputValue}
            titleFieldPath={titleFieldPath}
            maxQuantity={maxQuantity}
          />
        )}
      </OutsideClickHandler>
    </div>
  );
};

InputTags.defaultProps = {
  maxQuantity: 9,
  titleFieldPath: 'title',
};

export default InputTags;
