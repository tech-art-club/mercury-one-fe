import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../../Components/Cards/RecipeCard';
import { selectAuth } from '../../Store/Slices/authReducer';
import styles from './ViewedRecipesPage.module.scss';

const ViewedRecipesPage = () => {
  const navigate = useNavigate();
  const recipes = useSelector(selectAuth);

  function showRecipe(recipeId) {
    navigate(`/recipe/${recipeId}`);
  }

  return (
    <div className={styles.viewed}>
      {recipes.viewedRecipes.map((el) => (
        <div key={el.id} className={styles.viewed__card}>
          <RecipeCard content={el} showRecipe={showRecipe} />
        </div>
      ))}
    </div>
  );
};

export default ViewedRecipesPage;
