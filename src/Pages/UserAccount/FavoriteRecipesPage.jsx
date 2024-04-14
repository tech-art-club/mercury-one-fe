import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipeCard from '../../Components/Cards/RecipeCard';
import axios from 'axios';
import { requestWithTokenValidation } from '../../Helpers/requestWithTokenValidation';
import styles from './FavoriteRecipesPage.module.scss';

const FavoriteRecipesPage = () => {
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const url =
    'https://mercury-uc-app-dev.azurewebsites.net/Recipes/liked-by-user';

  function showRecipe(recipeId) {
    navigate(`/recipe/${recipeId}`);
  }

  useEffect(() => {
    const isFavorite = async () => {
      try {
        const res = await requestWithTokenValidation((headers) => {
          return axios.get(url, { headers });
        });
        setFavoriteRecipes(res.data);
        return await res;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    isFavorite();
  }, []);

  console.log(favoriteRecipes);

  return (
    <div className={styles.favorite}>
      {favoriteRecipes.map((el) => (
        <div key={el.id} className={styles.favorite__card}>
          <RecipeCard content={el} showRecipe={showRecipe} />
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipesPage;
