import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsBasket3 } from 'react-icons/bs';
import HeaderSearch from './HeaderSearch/HeaderSearch';
import PrimaryButton from '../Buttons/PrimaryButton';
import { selectAuth } from '../../Store/Slices/authReducer';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';

const Header = () => {
  const isAuth = useSelector(selectAuth).isAuth;
  const navigate = useNavigate();
  console.log(isAuth);

  function toHome() {
    navigate('/');
  }

  return (
    <div className={styles.header}>
      <div className={styles.header__logo} onClick={toHome}>
        <img src="/logo.png" alt="logo" className={styles.header__logo_img} />
        <img
          src="/logoText.png"
          alt="logoText"
          className={styles.header__logo_text}
        />
      </div>
      <HeaderSearch />
      <div className={styles.nav}>
        <div className={styles.nav__list}>
          <NavLink to="recipes" className={styles.nav__list_link}>
            Recipes
          </NavLink>
          <NavLink to="generator" className={styles.nav__list_link}>
            Generator
          </NavLink>
          <NavLink to="diet" className={styles.nav__list_link}>
            Make a diet
          </NavLink>
          <NavLink to="random_recipe" className={styles.nav__list_link}>
            Random recipe
          </NavLink>
          <NavLink to="basket" className={styles.nav__list_basket}>
            <BsBasket3 />
          </NavLink>
          <NavLink to="account" className={styles.nav__list_account}>
            {isAuth ? (
              <img src="../UserPlaceholder.png" alt="UserPhoto" />
            ) : (
              <PrimaryButton fontSize={'24px'}>Login</PrimaryButton>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
