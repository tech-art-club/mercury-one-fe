import { setAddRecipesID } from '../Store/Slices/recipesReducer';

export const handleAddRecipeID = (dispatch, id) => {
  dispatch(setAddRecipesID(id));
};
