import SingleFiltredRecipe from '../../Components/CatalogComponents/SingleFiltredRecipe/SingleFiltredRecipe';

const CatalogContent = ({ content, showRecipe }) => {
  return content?.map((el) => (
    <SingleFiltredRecipe key={el.Id} content={el} showRecipe={showRecipe} />
  ));
};

export default CatalogContent;
