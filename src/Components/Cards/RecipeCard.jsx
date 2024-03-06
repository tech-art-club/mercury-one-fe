import convertKeysToLowerCase from '../../Helpers/convertKeysToLowerCase';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ content, showRecipe }) => {
  const convertedContent = convertKeysToLowerCase(content);

  return (
    <div
      className={styles.content}
      onClick={(e) => showRecipe(convertedContent.id)}
    >
      {convertedContent.title}
    </div>
  );
};

export default RecipeCard;
