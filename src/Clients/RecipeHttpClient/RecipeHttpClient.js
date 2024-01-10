import axios from 'axios';

const baseUrl = 'https://mercure-recipe-app-dev.azurewebsites.net/';

async function getRecipesODataAsync(filter) {
  let filterParam = '';
  let expandParam = '';

  if(filter.diets.length > 0)
  {
    expandParam = expandParam + 'DietRecipes';

    filter.diets.forEach((element, index) => {
      filterParam = filterParam+ `DietRecipes/any(i: i/DietId eq ${element.id})`

      if(index < filter.diets.length -1){
        filterParam = filterParam + ' and ';
      } 
    });
  }

  let url = '';
  if(filterParam && expandParam){
    url = `${baseUrl}OData/Recipes?$filter=${filterParam}&$expand=${expandParam}`;
  }
  else {
    url = `${baseUrl}OData/Recipes`;
  }

  const response = await axios.get(url);

  return response.data

}



//ODataUrl.addFilter('DishTypeRecipes', DishTypeId, values)


async function generateRecipeAsync(requestData) {
  try {
    const url = `${baseUrl}Recipes/generate?withImage=true`;
    const response = await axios.post(url, requestData);

    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке POST-запроса:', error);
  }
}

export { generateRecipeAsync, getRecipesODataAsync };
