import RecipeCard from '../../Components/Cards/RecipeCard';
import styles from './CatalogContent.module.scss';

const CatalogContent = ({ content, showRecipe }) => {
  return content?.map((el) => (
    <div className={styles.cardContainer} key={el.Id}>
      <RecipeCard content={el} showRecipe={showRecipe} />
    </div>
  ));
};

export default CatalogContent;
