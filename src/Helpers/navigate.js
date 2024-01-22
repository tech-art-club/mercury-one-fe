export const navigateFromMainToCatalog = (type, title) => {
  return `/recipes?${type}=${title}`;
};

export const navigateFromAuthToMain = () => {
  return '/';
};
