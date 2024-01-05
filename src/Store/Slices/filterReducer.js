import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

export const fetchFilter = createAsyncThunk(
  'filter/fetchFilter',
  async (url) => {
    const res = await axios.get(url);
    return res.data;
  }
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
