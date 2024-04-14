import convertKeysToLowerCase from '../../Helpers/convertKeysToLowerCase';
import { LuRocket } from 'react-icons/lu';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ content, showRecipe, showLikes = false }) => {
  const convertedContent = convertKeysToLowerCase(content);
  console.log(convertedContent);

  return (
    <div
      className={styles.card}
      onClick={(e) => showRecipe(convertedContent.id)}
    >
      <img
        className={styles.card__img}
        src={convertedContent.smallImageUrl || convertedContent.imageURL}
        alt="small"
      />
      <div className={styles.card__titleContainer}>
        <div className={styles.card__titleContainer_title}>
          {convertedContent.title}
        </div>
        {showLikes && (
          <div className={styles.card__likes}>
            <LuRocket className={styles.card__likes_icon} />
            <span className={styles.card__likes_count}>
              {convertedContent.likes}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
