import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setAddRecipesID: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setAddRecipesID } = recipesSlice.actions;

export const selectRecipe = (state) => state.recipes[state.recipes.length - 1];

export default recipesSlice.reducer;
