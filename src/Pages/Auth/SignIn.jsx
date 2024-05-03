import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../Clients/Http/AuthHtppClient';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import SignInput from '../../Components/Inputs/SignInput';
import styles from './Sign.module.scss';

const SignIn = ({ toRegister }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isCredentialsValid, setIsCredentialsValid] = useState(true);

  async function LogIn() {
    try {
      const res = await signIn({ login: login, password: password }, dispatch);
      if (res === 204) {
        setIsCredentialsValid(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleLogin() {
    return (e) => {
      e.preventDefault();
      LogIn();
    };
  }

  return (
    <form className={styles.sign} onSubmit={handleLogin()}>
      {' '}
      <h2 className={styles.sign__title}>Please, sign in</h2>
      <SignInput
        value={login}
        placeholder={'Login'}
        className={
          isCredentialsValid
            ? styles.sign__input
            : `${styles.sign__input} ${styles.sign__input_error}`
        }
        onChange={(obj) => {
          setLogin(obj);
        }}
      />
      <SignInput
        type="password"
        value={password}
        placeholder={'Password'}
        className={
          isCredentialsValid
            ? styles.sign__input
            : `${styles.sign__input} ${styles.sign__input_error}`
        }
        onChange={(obj) => {
          setPassword(obj);
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
      {!isCredentialsValid && (
        <p className={styles.sign__error}>Invalid login or password</p>
      )}
      <div
        style={
          !isCredentialsValid ? { marginTop: '59px' } : { marginTop: '100px' }
        }
      >
        <PrimaryButton fontSize={'24px'} type="submit">
          Sign in
        </PrimaryButton>
      </div>
      <p className={styles.sign__text}>
        I'd like{' '}
        <span
          className={styles.sign__text_span}
          onClick={(e) => toRegister(true)}
        >
          to register
        </span>
      </p>
    </form>
  );
};

export default SignIn;
