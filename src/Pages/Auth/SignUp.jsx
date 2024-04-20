import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../Clients/Http/AuthHtppClient';
import SignInput from '../../Components/Inputs/SignInput';
import styles from './Sign.module.scss';

const SignUp = ({ toRegister }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  function register() {
    signUp(
      {
        login: login,
        password: password,
        email: email,
        name: userName,
      },
      dispatch
    );
  }

  return (
    <div className={styles.sign}>
      <h2 className={styles.sign__title}>Create an account</h2>
      <SignInput
        value={login}
        placeholder={'Login'}
        className={styles.sign__input}
        onChange={(obj) => {
          setLogin(obj);
        }}
      />
      <SignInput
        type="password"
        value={password}
        placeholder={'Password'}
        className={styles.sign__input}
        onChange={(obj) => {
          setPassword(obj);
        }}
      />
      <SignInput
        type="email"
        value={email}
        placeholder={'Email'}
        className={styles.sign__input}
        onChange={(obj) => {
          setEmail(obj);
        }}
      />
      <SignInput
        value={userName}
        placeholder={'Name'}
        className={styles.sign__input}
        onChange={(obj) => {
          setUserName(obj);
        }}
      />
      <button
        type="submit"
        className={styles.signBtn}
        onClick={(e) => register()}
      >
        Create an account
      </button>
      <p>Already have an account</p>
      <button
        type="button"
        className={styles.signBtn}
        onClick={(e) => toRegister(false)}
      >
        Log in
      </button>
    </div>
  );
};

export default SignUp;
