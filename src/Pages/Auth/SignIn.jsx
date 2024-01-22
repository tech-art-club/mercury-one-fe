import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateFromAuthToMain } from '../../Helpers/navigate';
import { signIn } from '../../Clients/Http/AuthHtppClient';
import SignInput from '../../Components/Inputs/SignInput';
import styles from './Sign.module.css';

const SignIn = ({ toRegister }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function LogIn() {
    signIn({ login: login, password: password });
    navigate(navigateFromAuthToMain()); //past path
  }

  return (
    <div className={styles.mainContainer}>
      <h2>Please, sign in</h2>
      <SignInput
        value={login}
        placeholder={'Login'}
        className={styles.input}
        onChange={(obj) => {
          setLogin(obj);
        }}
      />
      <SignInput
        type="password"
        value={password}
        placeholder={'Password'}
        className={styles.input}
        onChange={(obj) => {
          setPassword(obj);
        }}
      />
      <button type="submit" className={styles.signBtn} onClick={(e) => LogIn()}>
        Sign in
      </button>
      <p>I'd like to register</p>
      <button
        type="button"
        className={styles.signBtn}
        onClick={(e) => toRegister(true)}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignIn;
