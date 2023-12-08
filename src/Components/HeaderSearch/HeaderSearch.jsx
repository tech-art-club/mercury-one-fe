import React, { useState } from 'react';
import { SlMagnifier } from 'react-icons/sl';
import styles from './HeaderSearch.module.css';
import { useActionData } from 'react-router-dom';

const HeaderSearch = () => {
  const [inputHistory, setInputHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInputSubmit(e) {
    e.preventDefault();
    setInputHistory([...inputHistory, inputValue]);
    setInputValue('');
  }

  console.log(inputHistory);

  return (
    <div className={styles.headerSearchWrapper}>
      <form onSubmit={handleInputSubmit}>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <SlMagnifier className={styles.icon} />
        </div>
      </form>
    </div>
  );
};

export default HeaderSearch;
