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

  function LogIn() {
    signIn({ login: login, password: password }, dispatch);
  }

  return (
    <div className={styles.sign}>
      <h2 className={styles.sign__title}>Please, sign in</h2>
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

      <p className={styles.sign__separation}>Or</p>

      <div style={{ marginTop: '100px' }}>
        <PrimaryButton fontSize={'24px'} onClick={LogIn}>
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
    </div>
  );
};

export default SignIn;
