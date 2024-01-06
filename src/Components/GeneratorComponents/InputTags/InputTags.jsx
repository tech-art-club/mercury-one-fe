import { useRef, useState, useEffect } from 'react';
import SelectedTag from '../SelectedTag/SelectedTag';
import SearchTag from '../SearchTag/SearchTag';
import SearchItem from '../SearchItem/SearchItem';
import styles from './InputTags.module.css';

const InputTags = ({
  addTag,
  removeTag,
  allContent,
  activeTags,
  title,
  maxQuantity,
  titleFieldPath,
}) => {
  InputTags.defaultProps = {
    maxQuantity: 9,
    titleFieldPath: 'title',
  };

  const [localContent, setLocalContent] = useState(allContent);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef(null);
  const search = useRef(null);

  const filteredContent = localContent?.filter((el) =>
    el.name ? el.name.includes(inputValue) : el.title.includes(inputValue)
  );

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
    setLocalContent(localContent?.filter((el) => !activeTags.includes(el)));
  }

  function handleDocumentClick(event) {
    if (search.current && !search.current.contains(event.target)) {
      setShowDropdown(false);
      setInputValue('');
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.activeTagsContainer}>
        <div className={styles.activeTagsTitle}>{title}</div>
        {activeTags &&
          activeTags?.map((el) => (
            <SelectedTag
              key={el.id}
              content={el}
              titleFieldPath={titleFieldPath}
              removeTag={removeTag}
            />
          ))}
        <input
          type="text"
          placeholder="enter your tag"
          className={styles.generatorInput}
          value={inputValue}
          ref={search}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={toggleDropdown}
        />
      </div>

      {showDropdown && !inputValue && (
        <div className={styles.dropdown} ref={dropdown}>
          {localContent?.map((el, i) =>
            i < maxQuantity ? (
              <SearchTag
                key={el.id}
                content={el}
                titleFieldPath={titleFieldPath}
                addTag={addTag}
              />
            ) : (
              ''
            )
          )}
        </div>
      )}
      {showDropdown && inputValue && (
        <div className={styles.dropdownSearch} ref={dropdown}>
          {filteredContent?.map((el, i) => (
            <SearchItem
              key={i}
              content={el}
              titleFieldPath={titleFieldPath}
              addTag={addTag}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputTags;
