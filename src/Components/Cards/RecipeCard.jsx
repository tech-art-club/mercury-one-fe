import convertKeysToLowerCase from '../../Helpers/convertKeysToLowerCase';
import RecipeLike from '../Likes/RecipeLike';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ content, showRecipe }) => {
  const convertedContent = convertKeysToLowerCase(content);
  /* console.log(convertedContent); */

  return (
    <div
      className={styles.content}
      onClick={(e) => showRecipe(convertedContent.id)}
    >
      <img
        className={styles.img}
        src={convertedContent.smallImageUrl}
        alt="small"
      />
      <div className={styles.titleWrapper}>
        <div>{convertedContent.title}</div>
        <div className={styles.likes}>
          <RecipeLike />
          <span>{convertedContent.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
