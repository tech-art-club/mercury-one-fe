import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../Clients/Http/AuthHtppClient';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
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

  function handleRegistration() {
    return (e) => {
      e.preventDefault();
      register();
    };
  }

  return (
    <form className={styles.sign} onSubmit={handleRegistration()}>
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
      <p className={styles.sign__separation}>Or</p>

      <div className={styles.sign__alternativeSign}>
        <img
          src="../Icon_google.png"
          alt="Icon google"
          className={styles.sign__alternativeSign_icon}
        />
        <img
          src="../Icon_apple.png"
          alt="Icon apple"
          className={styles.sign__alternativeSign_icon}
        />
        <img
          src="../Icon_facebook.png"
          alt="Icon facebook"
          className={styles.sign__alternativeSign_icon}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <PrimaryButton fontSize={'24px'} type="submit">
          Sign up
        </PrimaryButton>
      </div>
      <p className={styles.sign__text}>
        Already have an account{' '}
        <span
          className={styles.sign__text_span}
          onClick={(e) => toRegister(false)}
        >
          To Log In
        </span>
      </p>
    </form>
  );
};

export default SignUp;
