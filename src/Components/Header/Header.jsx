import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsBasket3 } from 'react-icons/bs';
import { GoPerson } from 'react-icons/go';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();

  function toHome() {
    navigate('/');
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logo} onClick={toHome}>
        CookiFy
      </div>
      <div className={styles.search}>
        <HeaderSearch />
      </div>
      <div className={styles.navigation}>
        <NavLink to="recipes" className={styles.navLink}>
          Recipes
        </NavLink>
        <NavLink to="generator" className={styles.navLink}>
          Generator
        </NavLink>
        <NavLink to="diet" className={styles.navLink}>
          Make a diet
        </NavLink>
        <NavLink to="random_recipe" className={styles.navLink}>
          Random recipe
        </NavLink>
      </div>
      <div className={styles.ui}>
        <NavLink to="basket" className={styles.uiLink}>
          <BsBasket3 />
        </NavLink>
        <NavLink to="auth" className={styles.uiLink}>
          <GoPerson />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
