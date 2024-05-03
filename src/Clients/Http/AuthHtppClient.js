import axios from 'axios';
import { handleAddUser } from '../../Helpers/handleAddUser';
import { setLocalStorage } from '../../LocalStorageRepository/LocalStorageRepo';

const baseUrl = 'https://mercure-auth-app-dev.azurewebsites.net/';

async function signUp(userData, dispatch) {
  try {
    const response = await axios.post(
      `${baseUrl}api/identities/sign-up`,
      userData
    );

    if (
      response.status === 200 &&
      response.data.access &&
      response.data.refresh
    ) {
      console.log('Пользователь успешно зарегистрирован', '----', response);
      setLocalStorage('access', response.data.access);
      setLocalStorage('refresh', response.data.refresh);
      handleAddUser(response.data.access, dispatch);
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
  }
}

async function signIn(userData, dispatch) {
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

    if (
      response.status === 200 &&
      response.data.access &&
      response.data.refresh
    ) {
      console.log('Пользователь успешно вошел в систему', '----', response);
      setLocalStorage('access', response.data.access);
      setLocalStorage('refresh', response.data.refresh);
      handleAddUser(response.data.access, dispatch);
    }

    if (response.status === 204) {
      return response.status;
    }
  } catch (error) {
    console.error('Ошибка при входе в систему:', error);
  }
}

export { signUp, signIn };
