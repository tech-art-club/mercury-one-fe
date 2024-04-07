import axios from 'axios';
import { requestWithTokenValidation } from '../Helpers/requestWithTokenValidation.js';

export const isLike = async (recipeId) => {
  const url = `https://mercury-uc-app-dev.azurewebsites.net/Recipes/like?recipeId=${recipeId}`;
  /* const url = 'https://mercury-uc-app-dev.azurewebsites.net/Recipes/all'; */

  try {
    const res = await requestWithTokenValidation((headers) => {
      return axios.patch(url, { headers });
    });
    console.log(res);

    return res;
  } catch (error) {
    console.error('Error occurred while sending like request:', error);
    throw error;
  }
};
