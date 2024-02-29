import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  getLocalStorage,
  setLocalStorage,
} from '../LocalStorageRepository/LocalStorageRepo';

const tokenIsValid = (token) => {
  if (!token) {
    return false;
  }
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp > currentTime ? true : false;
};

const requestWithValidAccessToken = async (request, headers, accessToken) => {
  headers = { Authorization: `Bearer ${accessToken}` };
  const response = await request({ headers });
  return response;
};

const requestWithoutTokens = async (request, headers) => {
  const response = await request({ headers });
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  return response;
};

const requestWithValidRefreshToken = async (request, headers, refreshToken) => {
  const refreshUrl =
    'https://mercure-auth-app-dev.azurewebsites.net/api/identities/refresh';

  const refreshResponse = await axios.post(refreshUrl, {
    refresh: refreshToken,
  });

  setLocalStorage('access', refreshResponse.data.access);
  setLocalStorage('refresh', refreshResponse.data.refresh);

  headers = { Authorization: `Bearer ${refreshResponse.data.access}` };

  const response = await request({ headers });
  return response;
};

export const requestWithTokenValidation = async (
  request,
  isChecked = false
) => {
  const accessToken = getLocalStorage('access');
  const refreshToken = getLocalStorage('refresh');

  let headers = {};

  try {
    if (!accessToken) {
      return await requestWithoutTokens(request, headers);
    }

    if (tokenIsValid(accessToken)) {
      return await requestWithValidAccessToken(request, headers, accessToken);
    }

    if (tokenIsValid(refreshToken)) {
      return await requestWithValidRefreshToken(request, headers, refreshToken);
    }

    return await requestWithoutTokens(request, headers);
  } catch (error) {
    if (isChecked === false && error.response.status === 401) {
      return await requestWithTokenValidation(request, true);
    }
  }
};
