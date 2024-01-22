import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../Store/Slices/authReducer';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { useSelector } from 'react-redux';
import styles from './Auth.module.css';

const Auth = () => {
  const navigate = useNavigate();
  const userName = useSelector(selectAuth).name;
  const userLogin = useSelector(selectAuth).login;
  const isAuthenticated = useSelector(selectAuth).isAuth;
  const [toRegister, setToRegister] = useState(false);

  function logout() {
    localStorage.clear();
    navigate('/auth');
  }

  return (
    <div>
      {!isAuthenticated && toRegister && (
        <SignUp toRegister={(boolean) => setToRegister(boolean)} />
      )}
      {!isAuthenticated && !toRegister && (
        <SignIn toRegister={(boolean) => setToRegister(boolean)} />
      )}
      {isAuthenticated && (
        <div className={styles.mainContainer}>
          <div className={styles.userInfo}>
            <div className={styles.userContent}>{userName}</div>
            <div className={styles.userContent}>{userLogin}</div>
            <button onClick={(e) => logout()} className={styles.logoutBtn}>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
