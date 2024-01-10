import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getRecipesODataAsync} from '../../Clients/RecipeHttpClient/RecipeHttpClient'

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

export const selectFilter = (state) => state.filter.value;

export default filterSlice.reducer;
