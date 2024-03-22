export const navigateFromMainToCatalog = (type, title) => {
  return `/recipes?${type}=${title}`;
};

export const navigateFromAuthToMain = () => {
  return '/';
};

export const navigateToRecipe = (id, navigate) => {
  return navigate(`/recipe/${id}`);
};
