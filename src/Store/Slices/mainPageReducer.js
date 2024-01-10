import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    activePlaylist: [],
    dietaryRecipes: [],
    kitchenType: [],
    dishType: [],
};

export const fetchActivePlaylist = createAsyncThunk(
  'mainPage/fetchActivePlaylist',
  async (url) => {
    const res = await axios.get(url);

    return res.data;
  }
);

export const fetchDietaryRecipes = createAsyncThunk(
  'mainPage/fetchDietaryRecipes',
  async (url) => {
    const res = await axios.get(url);

    return res.data;
  }
);

export const fetchKitchenType = createAsyncThunk(
  'mainPage/fetchKitchenType',
  async (url) => {
    const res = await axios.get(url);

    return res.data;
  }
);

export const fetchDishType = createAsyncThunk(
  'mainPage/fetchDishType',
  async (url) => {
    const res = await axios.get(url);
    
    return res.data;
  }
);

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActivePlaylist.fulfilled, (state, action) => {
      state.activePlaylist = [...action.payload];
    });
    builder.addCase(fetchDietaryRecipes.fulfilled, (state, action) => {
      state.dietaryRecipes = [...action.payload];
    });
    builder.addCase(fetchKitchenType.fulfilled, (state, action) => {
      state.kitchenType = [...action.payload];
    });
    builder.addCase(fetchDishType.fulfilled, (state, action) => {
      state.dishType = [...action.payload];
    });
  },
});

export const selectActivePlaylist = (state) =>
  state.mainPage?.activePlaylist;
export const selectDietaryRecipes = (state) =>
  state.mainPage?.dietaryRecipes;
export const selectKitchenType = (state) => state.mainPage?.kitchenType;
export const selectDishType = (state) => state.mainPage?.dishType;

export default mainPageSlice.reducer;
