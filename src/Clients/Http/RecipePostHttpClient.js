import axios from 'axios';

const baseUrl = 'https://mercure-recipe-app-dev.azurewebsites.net/Recipes';

async function postCustomRecipe(recipe) {
  try {
    const response = await axios.post(baseUrl, recipe, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log('Ошибка POST', error);
  }
}

export { postCustomRecipe };
