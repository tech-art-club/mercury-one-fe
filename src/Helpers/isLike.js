import axios from 'axios';
import { requestWithTokenValidation } from '../Helpers/requestWithTokenValidation.js';

export const isLike = async (recipeId) => {
  const url = `https://mercury-uc-app-dev.azurewebsites.net/Recipes/like?recipeId=${recipeId}`;
  /* const url =
    'https://mercure-recipe-app-dev.azurewebsites.net/TestToken/public'; */

  const res = await requestWithTokenValidation((headers) => {
    return axios.patch(url, {
      headers: {
        MyCustomHeader1: '1',
        MyCustomHeader2: '2',
      },
    });
  });
  console.log(res);
  return res;
};
