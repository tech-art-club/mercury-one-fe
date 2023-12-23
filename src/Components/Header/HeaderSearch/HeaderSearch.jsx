import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { SlMagnifier } from 'react-icons/sl';
import { IoIosClose } from 'react-icons/io';
import styles from './HeaderSearch.module.css';

const HeaderSearch = () => {
  const [inputHistory, setInputHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [fetchedValue, setFetchedValue] = useState([]);
  const navigate = useNavigate();
  const dropdown = useRef(null);
  const search = useRef(null);
  const deleteSingleSearch = useRef(null);

  const fetchSearch = async () => {
    const res = await axios.get(
      `https://mercure-recipe-app-dev.azurewebsites.net/OData/Recipes?$filter=contains(title,'${inputValue}')`
    );
    return setFetchedValue(res.data.value);
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      fetchSearch();
    }
    if (inputValue.length < 3) {
      setFetchedValue([]);
    }
  }, [inputValue]);

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

  function handleFetchedContent(e, el) {
    setInputHistory([...inputHistory, el.Title]);
    setInputValue('');
  }

  function showFetchedContent() {
    return fetchedValue.map((el, i) => (
      <div className={styles.pastSearch} key={i}>
        <div
          className={styles.pastElement}
          onClick={(e) => handleFetchedContent(e, el)}
        >
          {el.Title}
        </div>
      </div>
    ));
  }

  function showSearechHistory() {
    if (inputHistory.length > 0) {
      return inputHistory
        .filter((el) => el !== '')
        .toReversed()
        .map((el, i) => {
          if (i < 3) {
            return (
              <div className={styles.pastSearch} key={i}>
                <SlMagnifier style={{ marginRight: '24px' }} />
                <div
                  role="button"
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
    return;
  }

  function toGenerator() {
    navigate('/generator');
  }

  window.onclick = function (e) {
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
                {showSearechHistory()}
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