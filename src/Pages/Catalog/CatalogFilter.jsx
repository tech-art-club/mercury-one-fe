import FilterContainer from '../../Components/CatalogComponents/FilterContainer/FilterContainer';

const CatalogFilter = ({
  dish,
  cuisine,
  diet,
  filter,
  addToQuery,
  removeFromQuery,
}) => {
  return (
    <>
      <FilterContainer
        content={dish}
        title={'Type of dish'}
        onCheck={(title) => {
          addToQuery('dish', title);
        }}
        onUncheck={(title) => {
          removeFromQuery('dish', title);
        }}
        checked={filter.dish}
      />
      <FilterContainer
        content={cuisine}
        title={'World cuisine'}
        onCheck={(title) => {
          addToQuery('cuisine', title);
        }}
        onUncheck={(title) => {
          removeFromQuery('cuisine', title);
        }}
        checked={filter.cuisine}
      />
      <FilterContainer
        content={diet}
        title={'Food type'}
        onCheck={(title) => {
          addToQuery('diets', title);
        }}
        onUncheck={(title) => {
          removeFromQuery('diets', title);
        }}
        checked={filter.diets}
      />
    </>
  );
};

export default CatalogFilter;
