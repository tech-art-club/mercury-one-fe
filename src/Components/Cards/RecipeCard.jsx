import convertKeysToLowerCase from '../../Helpers/convertKeysToLowerCase';
import RecipeLike from '../Likes/RecipeLike';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ content, showRecipe }) => {
  const convertedContent = convertKeysToLowerCase(content);
  /* console.log(convertedContent); */

  return (
    <div
      className={styles.card}
      onClick={(e) => showRecipe(convertedContent.id)}
    >
      <img
        className={styles.card__img}
        src={convertedContent.smallImageUrl}
        alt="small"
      />
      <div className={styles.card__titleContainer}>
        <div className={styles.card__titleContainer_title}>
          {convertedContent.title}
        </div>
        <div className={styles.card__likes}>
          <RecipeLike />
          <span>{convertedContent.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
