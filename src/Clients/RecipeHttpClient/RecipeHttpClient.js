import axios from 'axios';

const baseUrl = 'https://mercure-recipe-app-dev.azurewebsites.net/';

async function generateRecipeAsync(requestData) {
    try {
      const url = `${baseUrl}Recipes/generate?withImage=true`;
      const response = await axios.post(url, requestData);

      return response.data;
    } catch (error) {
      console.error('Ошибка при отправке POST-запроса:', error);
    } 
}

export { generateRecipeAsync };