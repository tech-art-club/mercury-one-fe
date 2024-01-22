import axios from 'axios';
import { setLocalStorage } from '../../LocalStorageRepository/LocalStorageRepo';

const baseUrl = 'https://mercure-auth-app-dev.azurewebsites.net/';

async function signUp(userData) {
  try {
    const response = await axios.post(
      `${baseUrl}api/identities/sign-up`,
      userData
    );

    if (response.status === 200) {
      console.log('Пользователь успешно зарегистрирован', '----', response);
      setLocalStorage('access', response.data.access);
      setLocalStorage('refresh', response.data.refresh);
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
  }
}

async function signIn(userData) {
  try {
    const response = await axios.put(
      `${baseUrl}api/identities/sign-in`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      }
    );

    if (response.status === 200) {
      console.log('Пользователь успешно вошел в систему', '----', response);
      setLocalStorage('access', response.data.access);
      setLocalStorage('refresh', response.data.refresh);
    }
  } catch (error) {
    console.error('Ошибка при входе в систему:', error);
  }
}

export { signUp, signIn };
