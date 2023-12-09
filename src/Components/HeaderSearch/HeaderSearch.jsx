import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlMagnifier } from 'react-icons/sl';
import { IoIosClose } from 'react-icons/io';
import styles from './HeaderSearch.module.css';

const HeaderSearch = () => {
  const [inputHistory, setInputHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dropdown = useRef(null);
  const search = useRef(null);
  const deleteSingleSearch = useRef(null);

  function handleInputSubmit(e) {
    e.preventDefault();
    setInputHistory([...inputHistory, inputValue]);
    setInputValue('');
    dropdown.current.classList.remove(`${styles.showDropdown}`);
  }

  function showDropdown() {
    dropdown.current.classList.toggle(`${styles.showDropdown}`);
  }

  function clearSearchHistory() {
    setInputHistory([]);
  }

  function showSearechHistory() {
    return inputHistory
      .filter((el) => el !== '')
      .toReversed()
      .map((el, i) => {
        if (i < 3) {
          return (
            <div className={styles.pastSearch} key={i}>
              <SlMagnifier style={{ marginRight: '24px' }} />
              <div
                className={styles.pastElement}
                onClick={(e) => {
                  setInputValue(el);
                }}
              >
                {el}
              </div>
              <IoIosClose
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  setInputHistory(inputHistory.filter((obj) => obj !== el));
                }}
              />
            </div>
          );
        }
        return '';
      });
  }

  function toGenerator() {
    navigate('/generator');
  }

  window.onclick = function (e) {
    console.log(e.target);
    console.log(deleteSingleSearch);
    if (e.target !== search.current && e.target !== dropdown.current) {
      dropdown.current.classList.remove(`${styles.showDropdown}`);
    }
  };

  return (
    <div className={styles.headerSearchWrapper}>
      <form onSubmit={handleInputSubmit}>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={showDropdown}
            ref={search}
          />
          <SlMagnifier className={styles.icon} />
          <div className={styles.dropdown} ref={dropdown}>
            <div className={styles.dropdownUi}>
              <div className={styles.searchHistory}>Search history</div>
              <button
                type="button"
                className={styles.clearHistory}
                onClick={clearSearchHistory}
              >
                Clear the list
              </button>
            </div>
            <div className={styles.pastSearchContainer}>
              {showSearechHistory()}
            </div>
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
