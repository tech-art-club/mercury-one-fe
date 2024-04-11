import axios from 'axios';
import { requestWithTokenValidation } from '../Helpers/requestWithTokenValidation.js';

export const isLike = async (recipeId, isLikedByUser) => {
  const url = `https://mercury-uc-app-dev.azurewebsites.net/Recipes/${
    isLikedByUser ? 'unlike' : 'like'
  }?recipeId=${recipeId}`;

  const res = await requestWithTokenValidation((headers) => {
    return axios.patch(url, null, { headers });
  });

  return res;
};
