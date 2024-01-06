import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (url) => {
    const res = await axios.get(url);
    return res.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
