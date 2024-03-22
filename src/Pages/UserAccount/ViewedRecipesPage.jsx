import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../../Components/Cards/RecipeCard';
import { selectAuth } from '../../Store/Slices/authReducer';
import styles from './ViewedRecipesPage.module.css';

const ViewedRecipesPage = () => {
  const navigate = useNavigate();
  const recipes = useSelector(selectAuth);

  function showRecipe(recipeId) {
    navigate(`/recipe/${recipeId}`);
  }

  return (
    <div className={styles.wrapper}>
      {recipes.viewedRecipes.map((el) => (
        <RecipeCard content={el} showRecipe={showRecipe} key={el.id} />
      ))}
    </div>
  );
};

export default ViewedRecipesPage;
