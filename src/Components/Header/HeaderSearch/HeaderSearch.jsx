import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SlMagnifier } from 'react-icons/sl';
import { IoIosClose } from 'react-icons/io';
import { navigateToRecipe } from '../../../Helpers/navigate';
import styles from './HeaderSearch.module.scss';

const SearchItem = ({ content, titleFieldPath, addTag }) => {
  return (
    <div className={styles.searchItem} onClick={(e) => addTag(content)}>
      {content[titleFieldPath]}
    </div>
  );
};

const HeaderSearch = () => {
  const [inputHistory, setInputHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [fetchedValue, setFetchedValue] = useState([]);
  const navigate = useNavigate();
  const dropdown = useRef(null);
  const search = useRef(null);

  useEffect(() => {
    const fetchSearch = async (value) => {
      const res = await axios.get(
        `https://mercure-recipe-app-dev.azurewebsites.net/OData/Recipes?$filter=contains(title,'${value}')`
      );
      return setFetchedValue(res.data.value);
    };

    if (inputValue.length > 2) {
      fetchSearch(
        inputValue.charAt(0).toLocaleUpperCase() + inputValue.slice(1)
      );
    }
    if (inputValue.length < 3) {
      setFetchedValue([]);
    }
  }, [inputValue]);

  function handleInputSubmit(e) {
    e.preventDefault();
    dropdown.current.classList.remove(`${styles.showDropdown}`);
    search.current.classList.remove(`${styles.search__input_active}`);
  }

  function showDropdown() {
    dropdown.current.classList.toggle(`${styles.showDropdown}`);
    search.current.classList.toggle(`${styles.search__input_active}`);
  }

  function clearSearchHistory() {
    setInputHistory([]);
  }

  function handleFetchedContent(el) {
    setInputHistory([...inputHistory, { Title: el.Title, Id: el.Id }]);
    navigateToRecipe(el.Id, navigate);
    setInputValue('');
  }

  function showFetchedContent() {
    return fetchedValue.map((el, i) => (
      <div className={styles.pastSearch} key={i}>
        <SearchItem
          content={el}
          titleFieldPath={'Title'}
          addTag={handleFetchedContent}
        />
      </div>
    ));
  }

  const getKey = (obj) => Object.values(obj).join('|');

  function showSearchHistory() {
    if (inputHistory.length > 0) {
      return Array.from(
        new Map(inputHistory.map((obj) => [getKey(obj), obj])).values()
      )
        .filter((el) => el !== '')
        .slice(0, 3)
        .map((el, i) => (
          <div className={styles.pastSearch} key={i}>
            <SlMagnifier style={{ marginRight: '24px' }} />
            <div
              role="button"
              className={styles.pastElement}
              onClick={() => handleFetchedContent(el)}
            >
              {el.Title}
            </div>
            <IoIosClose
              style={{ cursor: 'pointer' }}
              onClick={() =>
                setInputHistory(inputHistory.filter((obj) => obj !== el))
              }
            />
          </div>
        ));
    }
    return null;
  }

  function toGenerator() {
    navigate('/generator');
  }

  window.onclick = function (e) {
    if (e.target !== search.current && e.target !== dropdown.current) {
      dropdown.current.classList.remove(`${styles.showDropdown}`);
      search.current.classList.remove(`${styles.search__input_active}`);
    }
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleInputSubmit}>
        <div className={styles.search__input_container}>
          <input
            className={styles.search__input}
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={showDropdown}
            ref={search}
          />
          <SlMagnifier className={styles.search__icon} />
          <div className={styles.dropdown} ref={dropdown}>
            <div className={styles.dropdownUi}>
              {inputValue.length === 0 && (
                <div className={styles.searchHistory}>Search history</div>
              )}
              {inputValue.length > 0 && (
                <div className={styles.searchHistory}>Search</div>
              )}
              <button
                type="button"
                className={styles.clearHistory}
                onClick={clearSearchHistory}
              >
                Clear the list
              </button>
            </div>
            {fetchedValue.length > 0 && (
              <div className={styles.fetchedSearchContainer}>
                {showFetchedContent()}
              </div>
            )}
            {inputValue.length === 0 && (
              <div className={styles.pastSearchContainer}>
                {showSearchHistory()}
              </div>
            )}
            <button
              type="button"
              onClick={toGenerator}
              className={styles.dropdownBtn}
            >
              Generate recipe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeaderSearch;
