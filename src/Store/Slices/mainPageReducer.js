import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [
  {
    activePlaylist: [],
  },
  {
    dietaryRecipes: [],
  },
  {
    kitchenType: [],
  },
  {
    dishType: [],
  },
];

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
      state[0].activePlaylist = [action.payload];
    });
    builder.addCase(fetchDietaryRecipes.fulfilled, (state, action) => {
      state[1].dietaryRecipes = [action.payload];
    });
    builder.addCase(fetchKitchenType.fulfilled, (state, action) => {
      state[2].kitchenType = [action.payload];
    });
    builder.addCase(fetchDishType.fulfilled, (state, action) => {
      state[3].dishType = [action.payload];
    });
  },
});

export const selectActivePlaylist = (state) =>
  state.mainPage[0]?.activePlaylist;
export const selectDietaryRecipes = (state) =>
  state.mainPage[1]?.dietaryRecipes;
export const selectKitchenType = (state) => state.mainPage[2]?.kitchenType;
export const selectDishType = (state) => state.mainPage[3]?.dishType;

export default mainPageSlice.reducer;
