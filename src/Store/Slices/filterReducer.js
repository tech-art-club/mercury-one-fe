import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getRecipesODataAsync} from '../../Clients/Http/RecipeHttpClient'

const initialState = [];

export const fetchFilter = createAsyncThunk(
  'filter/fetchFilter',
  getRecipesODataAsync
);

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilter.fulfilled, (state, action) => {

      return action.payload;
    });
  },
});

export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
