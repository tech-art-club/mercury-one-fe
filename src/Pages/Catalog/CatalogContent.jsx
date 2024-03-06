import RecipeCard from '../../Components/Cards/RecipeCard';

const CatalogContent = ({ content, showRecipe }) => {
  return content?.map((el) => (
    <RecipeCard key={el.Id} content={el} showRecipe={showRecipe} />
  ));
};

export default CatalogContent;
