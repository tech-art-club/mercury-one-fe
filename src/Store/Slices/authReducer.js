import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  name: '',
  login: '',
  sub: '',
  viewedRecipes: [],
};

function loadViewedRecipesFromLocalStorage(userId) {
  const storedViewedRecipes = localStorage.getItem(`viewedRecipes_${userId}`);
  return storedViewedRecipes ? JSON.parse(storedViewedRecipes) : [];
}

function saveViewedRecipesToLocalStorage(userId, recipes) {
  localStorage.setItem(`viewedRecipes_${userId.sub}`, JSON.stringify(recipes));
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAddUserInfo: (state, action) => {
      return {
        ...action.payload,
        viewedRecipes: loadViewedRecipesFromLocalStorage(action.payload.sub),
      };
    },
    addViewedRecipe: (state, action) => {
      const { userId, recipe } = action.payload;

      const existingRecipe = state.viewedRecipes.find(
        (existingRecipe) => existingRecipe && existingRecipe.id === recipe.id
      );
      if (!existingRecipe) {
        state.viewedRecipes.push(recipe);
        saveViewedRecipesToLocalStorage(userId, state.viewedRecipes);
      }
    },
  },
});

export const { setAddUserInfo, addViewedRecipe } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
