export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  console.log('----', 'Я записываю в локальное хранилище', '----', key, value);
  return localStorage.setItem(key, value);
};
